import { supabase } from "../supabaseClient.js";

export async function getAccessToken(userId) {
  return await supabase
    .from("plaid_items")
    .select("access_token")
    .eq("user_id", userId);
}

export async function getplaidItemByAccessToken(access_token) {
  return await supabase
    .from("plaid_items")
    .select("plaid_item_id")
    .eq("access_token", access_token);
}

export async function saveCursor(access_token, currCursor) {
  return await supabase
    .from("plaid_items")
    .update({ cursor: currCursor })
    .eq("access_token", access_token);
}

/** Get latest cursor for a given Plaid Item */
export async function getLatestCursorOrNull(itemId) {
  return await supabase
    .from("plaid_items")
    .select("cursor")
    .eq("plaid_item_id", itemId)
    .maybeSingle();
}
