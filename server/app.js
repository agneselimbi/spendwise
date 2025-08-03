import { supabase } from "./supabaseClient.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import plaidRouter from "./routes/plaidRoutes.js";
import transactionRouter from "./routes/transactionRoute.js";
import accountRoutes from "./routes/accountRoutes.js";

const app = express();
const port = 3000;

//Middleware to parse json data and stores in req.body
app.use(express.json());
//Cookie Parser Middleware
app.use(cookieParser());
//Set up cors
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// Mount authentication routes to Supabase
app.use("/auth", authRoutes);

// Mount the plaid routes
app.use("/api", plaidRouter);

// Mount the account routes
app.use("/account", accountRoutes);

// Mount the transactions routes
app.use("/transactions", transactionRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
