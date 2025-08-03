import { plaid } from "../plaid.js";
import express from "express";
import { supabase } from "../supabaseClient.js";
import { requireAuth } from "../middleware/requireAuth.js";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();

// router.post("/create_link_token", requireAuth, async (req, res) => {
//   console.log("req.boody", req.body);
//   const response = await plaid.linkTokenCreate({
//     user: { client_user_id: "a168d5e3-9cf1-4dba-be90-3349dd9ebe78" },
//     client_name: "Personal Finance App",
//     products: ["transactions"],
//     language: "en",
//     redirect_uri: undefined,
//   });
//   res.json({ linkToken: response.data.link_token });
// });
router.post("/create_link_token", async (req, res) => {
  // 1️⃣ Log the incoming body so you know what your client actually sent
  // console.log("🛈 Request body:", req.body);

  try {
    // 2️⃣ Call Plaid’s sandbox endpoint with the correct JSON shape
    const plaidRes = await axios.post(
      "https://sandbox.plaid.com/link/token/create",
      {
        client_id: process.env.PLAID_CLIENT_ID,
        secret: process.env.PLAID_SECRET,
        user: { client_user_id: req.body.user_id }, // ensure this is defined!
        client_name: "Personal Finance App",
        products: ["auth", "transactions"],
        country_codes: ["US"],
        language: "en",
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    // 3️⃣ If Plaid is happy, forward the link_token back to your frontend
    res.json(plaidRes.data);
  } catch (err) {
    // 4️⃣ Log Plaid’s error response for inspection
    console.error("❌ Plaid returned 400:", err.response?.data || err.message);

    // 5️⃣ Send the error details back so you can inspect them in the browser/network tab
    res
      .status(err.response?.status || 500)
      .json({ error: err.response?.data || err.message });
  }
});

// Exchange public token for a private access token
router.post("/exchange", requireAuth, async (req, res) => {
  const { public_token } = req.body;
  const { data } = await plaid.itemPublicTokenExchange({ public_token });
  const { access_token, item_id, institution_name } = data;
  // Encrypt and store access token
  /** transform insert operations into a query */
  await supabase.from("plaid_items").insert([
    {
      user_id: req.user.id,
      plaid_item_id: item_id,
      access_token,
      institution_name: institution_name,
    },
  ]);

  // get accounts from plaid items
  const { data: accounts } = await plaid.accountsGet({ access_token });
  const payload = [];
  for (const account of accounts) {
    const newAccount = {
      user_id: req.body.user_id,
      plaid_account_id: account.account_id,
      plaid_item_id: item_id,
      name: account.name,
      type: account.type,
      subtype: account.subtype,
      mask: account.mask,
    };
    payload.add(newAccount);
  }
  // insert accounts into plaid table
  await supabase.from("accounts").upsert(payload).select();

  // Fetch accounts + initial transactions here
  res.status(201).json({ ok: true });
});

//Fetch account balance
router.post("/balance", requireAuth, async (req, res) => {
  try {
    // const resp = await axios.post(
    //   "https://sandbox.plaid.com/accounts/balance/get",
    //   {
    //     client_id: process.env.PLAID_CLIENT_ID,
    //     secret: process.env.PLAID_SECRET,
    //     access_token: "access-sandbox-c4c80b5b-00bb-4554-af0e-e915f973110d",
    //   },
    //   {
    //     headers: { "Content-Type": "application/json" },
    //   }
    // );
    // const accounts = resp.data.accounts;
    // const returnedAccounts = accounts.map((acct) => acct.balances);
    // console.log(returnedAccounts)
    // get accounts from plaid items
    const request = {
      access_token: "access-sandbox-f41dfccf-3010-423f-bcf7-28c7e9ff820a",
    };
    const response = await plaid.accountsGet(request);
    const accounts = response.data.accounts;
    const payload = [];
    for (const account of accounts) {
      const newAccount = {
        user_id: req.user.id,
        plaid_account_id: account.account_id,
        plaid_item_id: "8dGre8nk65uPBeNEA31lUNKb7v76nXfww7Gna",
        name: account.name,
        type: account.type,
        subtype: account.subtype,
        mask: account.mask,
      };
      console.log(newAccount);
      payload.push(newAccount);
    }
    console.log(payload);
    // insert accounts into plaid table
    await supabase.from("accounts").upsert(payload).select();
    console.log("New accounts added to accounts table");
    res.status(200).json(payload);
  } catch (err) {
    console.error("❌ Plaid returned 400:", err.response?.data || err.message);
    res
      .status(err.response?.status || 500)
      .json({ error: err.response?.data || err.message });
  }
});

export default router;
