import express from "express";
import { supabase } from "../supabaseClient.js";
import { requireAuth } from "../middleware/requireAuth.js";
import dotenv from "dotenv";

import { fetchAccountById, saveAccount } from "../queries/accounts.js";
dotenv.config();

const router = express.Router();

router.get("/get", requireAuth, async (req, res) => {
  const accountId = req.query.accountId;

  try {
    const filteredAccount = await fetchAccountById(accountId);
    return res.status(200).json(filteredAccount);
    // return res.status(200).json(filteredAccount || {});
  } catch (error) {
    console.error("/account/get error :", error.message);
    return res.status(error.status || 500).json({ error: error.message });
  }
});

router.post("/save", requireAuth, async (req, res) => {
  const acct = req.body;
  try {
    const savedAcct = await saveAccount(acct);
    return res.status(200).json(savedAcct);
  } catch (error) {
    console.error("/accout/save error: ", error.message);
    return res.status(500).json({ error: error.message });
  }
});

export default router;
