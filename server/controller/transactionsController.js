import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import {
  saveCursor,
  getAccessToken,
  getplaidItemByAccessToken,
  getLatestCursorOrNull,
} from "../queries/plaidItems.js";
import { plaid } from "../plaid.js";
import {
  upsertTransaction,
  removeTransactions,
  listTransactionsByUserId,
  listTransactionsByMonthAndType,
} from "../queries/transactions.js";
import {
  fetchAccountById,
  getAccountFromPlaid,
  saveAccount,
} from "../queries/accounts.js";

export async function syncTransactionsByUserId(userId) {
  try {
    const { data: access_tokens } = await getAccessToken(userId);
    let summary = { added: 0, modified: 0, removed: 0 };
    let plaidItemIds = [];
    let cursors = [];
    // Used to store transaction updates since last cursor
    const batch = { added: [], modified: [], removed: [], accounts: [] };
    for (const access_token of access_tokens) {
      const { data: plaidItemId, error: plaid_item_error } =
        await getplaidItemByAccessToken(access_token.access_token);
      plaidItemIds.push(plaidItemId);
      if (plaid_item_error) {
        throw new Error(plaid_item_error.message);
      }
      let { data: currCursor, error } = await getLatestCursorOrNull(
        plaidItemId
      );
      if (error) {
        throw new Error(error.message);
      }

      let hasMore = true;
      //Iterate through each page of new transactiosn update
      while (hasMore) {
        const request = {
          access_token: access_token.access_token,
          cursor: currCursor,
        };
        const response = await plaid.transactionsSync(request);
        const data = response.data;
        //Add page of results
        batch.added.push(...data.added);
        batch.modified.push(...data.modified);
        batch.removed.push(...data.removed);
        batch.accounts.push(...data.accounts);
        hasMore = data.has_more;
        currCursor = data.next_cursor;

        // check if the account id exists in Account Table
        for (const acct of data.accounts) {
          const accountId = acct.account_id;
          const existing = await fetchAccountById(accountId);
          if (!existing.length) {
            const account = await getAccountFromPlaid(
              access_token.access_token,
              accountId
            );
            const acctPayload = {
              user_id: userId,
              plaid_account_id: accountId,
              plaid_item_id: plaidItemId[0].plaid_item_id,
              name: account.name,
              type: account.type,
              subtype: account.subtype,
              mask: account.mask,
            };
            const savedAccount = await saveAccount(acctPayload);
            console.log(savedAccount);
          }
        }
      }
      //Save cursor data
      cursors.push(currCursor);

      await saveCursor(access_token, currCursor);
    }
    // Persist cursor and updated data
    await applyUpdates(batch.added, batch.modified, batch.removed, userId);

    //Update summary object
    summary.added += batch.added.length;
    summary.modified += batch.modified.length;
    summary.removed += batch.removed.length;
    return {
      message: "Synch complete",
      syncedItem: plaidItemIds,
      ...summary,
      newCursor: cursors,
    };
  } catch (error) {
    console.error("Unable to get transaction data from plaid: ", error.message);
    throw error;
  }
}

async function applyUpdates(
  added = [],
  modified = [],
  removed = [],
  userId,
  access_token
) {
  try {
    //update or add data to transactions data
    if (added.length > 0) {
      const data = await addOrUpdateTransaction(added, userId);
      console.log(`Added ${data} rows to transactions`);
    }
    if (modified.length > 0) {
      const data = await addOrUpdateTransaction(modified, userId);
      console.log(`Updated ${data} rows from transactions`);
    }
    // Remove transactions
    if (removed.length > 0) {
      const data = removeTransactions(removed);
      console.log(`Deleted ${data} rows from transactions`);
    }
  } catch (error) {
    console.error(`Unable to update Transactions table`, error.message);
    throw error;
  }
}

async function addOrUpdateTransaction(transactions, userId) {
  try {
    const payload = transactions.map((tx) => ({
      user_id: userId,
      account_id: tx.account_id,
      plaid_tx_id: tx.transaction_id,
      date: tx.date,
      amount: tx.amount,
      description: tx.name,
      category: tx.personal_finance_category.primary,
      is_pending: tx.pending,
      channel: tx.payment_channel,
      currency: tx.iso_currency_code,
    }));
    const response = await upsertTransaction(payload);
    return response;
  } catch (error) {
    console.error("addOrUpdateTransaction failed:", error.message);
    throw error;
  }
}

/** Get Transactions By User Id  */
export async function getTransactionsByUserId(userId) {
  return await listTransactionsByUserId(userId);
}

export async function getTransactionsByUserIdAndAccountName(
  userId,
  accountName
) {
  try {
    const transactions = await listTransactionsByUserId(userId);
    const accountId = await listAccountByUserAndName(userId, accountName);
    const transactionsByAccount = transactions.filter((tx) => {
      tx.account_id === accountId;
    });
    return transactionsByAccount;
  } catch (error) {
    console.error(
      `Unable to get transactions from ${userId} and ${account}`,
      error.message
    );
    throw error;
  }
}

export async function getTransactionsByMonth(userId) {
  try {
    const expense = await listTransactionsByMonthAndType(userId, "expense");
    console.log("expense", expense);
    const income = await listTransactionsByMonthAndType(userId, "income");
    console.log("income", income);
    const now = new Date();
    const startDate = new Date(now.getFullYear(), now.getMonth() - 6 + 1, 1);
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const filteredExpense = expense?.map(
      (tx) => tx.date >= startDate && tx.date <= endDate
    );
    const filteredIncome = income.map(
      (tx) => tx.date >= startDate && tx.date <= endDate
    );
    return { income: filteredIncome, expense: filteredExpense };
  } catch (err) {
    console.error("Unable to get monthly transactions", err.message);
    throw err;
  }
}
