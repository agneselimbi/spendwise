import { getAccessToken } from "../queries/plaidItems.js";
import { fetchAccountById, getAccountFromPlaid } from "../queries/accounts.js";
import { plaid } from "../plaid.js";

export async function saveUserAccount(userId) {
  const { data: access_tokens } = await getAccessToken(userId);
  console.log(access_tokens);
  allAccounts = [];
  for (const { access_token } of access_tokens) {
    try {
      const response = await plaidClient.accountsGet({ access_token });
      allAccounts.push(...response.data.accounts);
    } catch (plaidErr) {
      console.error("Plaid accountsGet failed:", plaidErr);
      throw plaidErr;
    }
  }
}

export async function listAccountsById(accountId) {
  try {
    const existing = fetchAccountById(accountId);
  } catch (error) {
    console.error(
      "Unable to fetch accounts from Accounts Table : ",
      error.message
    );
    throw error;
  }
}

export async function listPlaidAccounts(access_token, accountId) {
  try {
    const account = await getAccountFromPlaid(access_token, accountId);
    return account;
  } catch (error) {
    throw error;
  }
}
