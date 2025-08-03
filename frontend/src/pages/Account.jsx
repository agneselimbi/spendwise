import { useState } from "react";
import "../css/Account.css";
import useAccounts from "../hooks/useAccounts";
import usedeleteAccount from "../hooks/useDeleteAccount";
import AddAccount from "../components/AddAccount";
import UpdateAccount from "../components/UpdateAccount";
import BankCard from "../components/BankCard";
import useAccountById from "../hooks/useAccountById";

export default function Account() {
  const { data: accounts, isLoading, isError, error } = useAccounts();
  const [showForm, setShowForm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const { data: selectedAccount } = useAccountById(selectedId, {
    enabled: selectedId !== null,
  });
  const { mutate } = usedeleteAccount();

  function handleClick(value, id) {
    if (value === "edit") {
      setSelectedId(id);
      setShowForm(true); //display the form to update acount
    }
    if (value === "delete") {
      mutate(id), { onSuccess: () => console.log("Deleted Item") };
    }
  }
  function closeForm() {
    setShowForm(false);
    setSelectedId(null);
  }
  return (
    <>
      <h1 className="page-title">Account</h1>
      {isError && <div> Error loading user account : {error} </div>}
      {isLoading && <div className="loading-message">Loading…</div>}
      {!isError && !isLoading && Array.isArray(accounts) && !showForm && (
        <div className="page-content">
          {accounts.map((acct) => (
            <BankCard
              acct_id={acct.acct_id}
              acct={acct}
              handleClick={handleClick}
              key={acct.acct_id}
            />
          ))}
        </div>
      )}
      {showForm && selectedAccount && (
        <UpdateAccount acct={selectedAccount} closeForm={closeForm} />
      )}
    </>
  );
}
