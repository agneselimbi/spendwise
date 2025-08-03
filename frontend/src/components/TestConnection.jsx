import { usePlaidLink } from "react-plaid-link";
import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../AuthContext";

export default function PlaidLinkButton() {
  const { user } = useAuth();

  // Fetch the link token on mount
  const [linkToken, setLinkToken] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://localhost:3000/api/create_link_token", {
          method: "POST",
          body: JSON.stringify({
            userId: user.id,
          }),
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const data = await res.json();
        // return the public link token
        setLinkToken(data.link_token);
      } catch (err) {
        console.error("Failed to fetch link token", err.message);
      }
    })();
  }, [user]);

  // Call Plaid link only if you have the token
  const onSuccess = useCallback(async (public_token, metadata) => {
    try {
      await fetch("http://localhost:3000/api/exchange", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ public_token }),
        credentials: "include",
      });
    } catch {
      console.error("Token exchange failed:", err);
    }
  }, []);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess,
    onExit: (error) => console.log(error.mesage),
  });

  const getAccountBalance = async () => {
    try {
      const resp = await fetch("http://localhost:3000/api/balance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await resp.json();
      console.log(data);
    } catch (err) {
      console.log("Retrieving account balance failed", err.message);
    }
  };

  const updateTransactions = async () => {
    try {
      const resp = await fetch(`http://localhost:3000/syncTransactions/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await resp.json();
      console.log(data);
    } catch (error) {
      console.error("Unable to update transactions from Plaid", error.message);
    }
  };

  return (
    <>
      <h1>test this button</h1>
      <button disabled={!ready} onClick={open}>
        Connect bank
      </button>

      <button disabled={!ready} onClick={getAccountBalance}>
        Get Account Balance
      </button>
    </>
  );
}
