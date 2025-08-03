import express from "express";
import { supabase } from "../supabaseClient.js";
import { requireAuth } from "../middleware/requireAuth.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

/** Sign up with email and password */
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) return res.status(400).json({ error: error.message });
});

/** Sign in with email and password */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) return res.status(401).json({ error: error.message });
  //Set as HTTP-only cookie
  res
    .cookie("sb_token", data.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: data.session.expires_in * 1000,
    })
    .json({ user: data.user });
});

router.get("/profile", requireAuth, (req, res) => {
  // requireAuth pulled the user into req.user
  res.json({ user: req.user });
});

export default router;
