import { supabase } from "../supabaseClient.js";
export async function requireAuth(req, res, next) {
  const token = req.cookies.sb_token;
  if (!token) return res.status(401).json({ error: "Not authenticated" });
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser(token);
  if (error || !user) return res.status(401).json({ error: error.message });
  req.user = user;
  next();
}
