import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useAuth } from "../AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // ← include httpOnly cookie
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const { error: msg } = await res.json();
      console.log(msg);
      return setError(msg);
    }
    const { user } = await res.json();
    setUser(user);
    console.log("user successfully logged in");
  };

  return (
    <Box
      component="form"
      noValidate
      className="login-form"
      id="login-form"
      onSubmit={handleSubmit}
    >
      <Typography variant="h3">Account Login</Typography>
      <TextField
        margin="normal"
        id="email"
        label="email"
        helperText="Email associated with account"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      >
        Email
      </TextField>
      <TextField
        margin="normal"
        id="password"
        label="password"
        helperText="Password associated with account"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      >
        Password
      </TextField>

      <Button type="submit" sx={{ bgcolor: "#50c691", border: "none" }}>
        Login
      </Button>
    </Box>
  );
}
