import express from "express";
import { requireAuth } from "../middleware/requireAuth.js";
import {
  syncTransactionsByUserId,
  getTransactionsByUserId,
  getTransactionsByMonth,
} from "../controller/transactionsController.js";
import { getAccessToken } from "../queries/plaidItems.js";
import { plaid } from "../plaid.js";

const router = express.Router();

/** Route to synch transactions table with Plaid Tx Table */
router.post("/syncTransactions/user", requireAuth, async (req, res) => {
  try {
    const currUser = req.user;
    const transactionSummary = await syncTransactionsByUserId(currUser.id);
    return res.status(200).json(transactionSummary);
  } catch (err) {
    console.error(" /transactions/sync error:", err.message);
    return res.status(err.status || 500).json({ error: err.message });
  }
});

/** Get all the transactions from a given user
 */
router.get("/user", requireAuth, async (req, res) => {
  const userId = req.user.id;
  try {
    const data = await getTransactionsByUserId(userId);
    return res.status(200).json({
      transactions: data,
    });
  } catch (err) {
    console.error("/api/getTransactions error: ", err.message);
    return res.status(500).json({ error: err.message });
  }
});

/** Get Transactions by account and account Name */
router.get("/user/:accountName", requireAuth, async (req, res) => {
  const currUser = req.user;

  try {
    const account_id = req.params.accountId;
    const data = await getTransactionsByUserIdAndAccountName(
      currUser.userId,
      accountName
    );
    return res.status(200).json({
      transactions: data,
    });
  } catch (err) {
    console.error("/transactions/user/:accountId error: ", err.message);
    return res.status(500).json({ error: err.message });
  }
});

/** Get Monthly transaction details  */
router.get("/monthly", requireAuth, async (req, res) => {
  const currUser = req.user;
  try {
    const data = await getTransactionsByMonth(currUser.userId);
    return res.status(200).json({
      transactionsByMonth: data.expense,
    });
  } catch (err) {
    console.error("/transactions/user/monthly error: ", err.message);
    return res.status(500).json({ error: err.message });
  }
});

/** Get Spend by category  */
router.get("user/spend", requireAuth, async (req, res) => {
  const currUser = req.user;
  try {
    const data = await getSpendByCategory(currUser.userId);
    return res.status(200).json({
      spendByCategory: data,
    });
  } catch (err) {
    console.error("/transations/user/spend error", err.message);
    return res.status(500).json({ error: err.message });
  }
});

export default router;
