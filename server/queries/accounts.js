import { supabase } from "../supabaseClient.js";
import { plaid } from "../plaid.js";

export async function listAccountByUserAndName(userId, accountName) {
  const { data, error } = await supabase
    .from(accounts)
    .select("plaid_account_id")
    .eq("name", accountName)
    .eq("user_id", userId);
  if (error) {
    console.error("Unable to fetch account Name");
    throw error;
  }
  return data;
}

export async function saveAccountsFromPlaid(plaidItemId) {
  const { data, error } = await supabase
    .from(accounts)
    .upsert(account)
    .eq("name", accountName)
    .eq("user_id", userId);
  if (error) {
    console.error("Unable to store new accounts");
    throw error;
  }
  return data;
}

export async function fetchAccountById(accountId) {
  const { data: existing, error: fetchErr } = await supabase
    .from("accounts")
    .select()
    .eq("plaid_account_id", accountId);
  if (fetchErr) throw fetchErr;
  return existing;
}

export async function getAccountFromPlaid(access_token, accountIds) {
  const ids = Array.isArray(accountIds) ? accountIds : [accountIds];
  const request = {
    access_token: access_token,
    options: { account_ids: ids },
  };
  console.log(accountId);
  try {
    const plaidResponse = await plaid.accountsGet(request);
    const account = plaidResponse.data.accounts;
    return account;
  } catch (error) {
    console.error("Unable to fetch Plaid Account details", error.message);
    throw error;
  }
}

export async function saveAccount(account) {
  const { data: savedAccount, error: saveErr } = await supabase
    .from("accounts")
    .upsert(account);
  if (saveErr) throw saveErr;
  return savedAccount;
}
