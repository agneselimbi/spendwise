import { supabase } from "../supabaseClient.js";

export async function upsertTransaction(payload) {
  const { data, error } = await supabase
    .from("transactions")
    .upsert(payload, { onConflict: ["plaid_tx_id"] });
  if (error) {
    console.error("Unable to add or update transactions", error.message);
    throw error;
  }
  return data;
}

export async function removeTransactions(removed) {
  // iterate over the transaction_id of the database then remove
  const removedTransactionIds = removed.map(
    (removedItem) => removedItem.transaction_id
  );
  const { data, error } = await supabase
    .from("transactions")
    .delete()
    .in("transaction_id", removedTransactionIds);

  if (error) {
    console.error(`Unable to delete transactions`, error.message);
    throw error;
  }
  return data;
}

/** Get all the transactions from a given user
 * @param userId : userId
 * returns array of transactions row
 */
export async function listTransactionsByUserId(userId) {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("user_id", userId);
  if (error) {
    //Catch supabase errors
    console.error(
      `Error fetching transactions for user ${userId}:`,
      error.message
    );
    throw error;
  }
  return data;
}

/** Returns the monthly spent and earned by user from the last six months
 * @params userId
 * returns array of amount spent and earned by user
 */

export async function listTransactionsByMonthAndType(userId, type) {
  if (type === "expense") {
    console.log("In Expense");
    const { data: expense, error: expenseErr } = await supabase.rpc(
      "monthly_expense_summary",
      { uid: userId }
    );
    if (expenseErr) {
      console.error(
        "Unable to retrieve Expenses from Transactions",
        expenseErr.mesasge
      );
      return expense;
    }
  }
  if (type === "income") {
    console.log("In Income");
    const { data: income, error: incomeErr } = await supabase.rpc(
      "monthly_income_summary",
      { uid: userId }
    );
    if (incomeErr) {
      console.error("Unable to retrieve Income from Transactions");
      throw incomeErr;
    }
    return income;
  }
}

export async function getTransactionsByUserIdAndAccountName(
  userId,
  accountName
) {
  const { data, error } = await supabase.rpc(
    transactions_user_account(userId, accountName)
  );
  if (error) {
    console.error(
      `Error fetching transactions from ${userId} and ${accountName}`
    );
    throw error;
  }
  return data;
}

async function getTransactionById(txId) {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("transaction_id", txId);
  if (error) {
    console.error(`Unable to get transaction with id ${txId} `, error.message);
    throw error;
  }
}

export async function getSpendByCategory(userId) {
  const now = new Date();
  const startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  const endDate = now;
  const { data: spendByCategory, error } = await supabase.rpc(
    spend_by_category(userId, startDate, endDate)
  );
  if (error) {
    console.error("Failure to get transactions by Category");
    throw error;
  }
  return spendByCategory;
}

// export async function getTransactionsByUserIdAndAccountName(
//   userId,
//   accountName
// ) {
//   try {
//     const { data, error } = await supabase.rpc(
//       transactions_user_account(userId, accountName)
//     );
//     if (error) {
//       console.error(
//         `Error fetching transactions from ${userId} and ${accountName}`
//       );
//       throw error;
//     }
//     return data;
//   } catch (err) {
//     console.error(`Unable to fetch transactions`, err.message);
//     throw err;
//   }
// }
// async function getTransactionById(txId) {
//   const { data, error } = await supabase
//     .from("transactions")
//     .select("*")
//     .eq("transaction_id", txId);
//   if (error) {
//     console.error(`Unable to get transaction with id ${txId} `, error.message);
//     throw error;
//   }
// }
