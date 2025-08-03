import FilterButtons from "../components/FilterButtons";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import ToolBar from "../components/ToolBar";
import { useState, useMemo } from "react";
import { useTransactionsByAccount } from "../hooks/useTransactions";
import { filterByDate } from "../utils/filterByDate.js";
import "../css/Transactions.css";
import AddTransaction from "../components/AddTransaction.jsx";

export default function Transactions() {
  const page = { title: "Transactions" };
  //Account Names
  const acctOptions = ["Checking-USBANK", "Savings-USBANK", "Credit-USBANK"];
  const [accountName, setAccount] = useState(acctOptions[0]);
  //Categories
  const catOptions = [
    "Education",
    "Rent",
    "Utilities",
    "Subscription Service",
    "Transportation",
    "Vacation",
    "Entertainment",
    "Shopping",
    "Household",
    "Food",
    "Restaurant + Take Outs",
  ];
  const [dateRange, setDateRange] = useState("thisday");

  //Load Transaction Data
  const {
    data: txByAcct,
    isLoading,
    isError,
    error,
  } = useTransactionsByAccount(accountName);

  //Filter by date
  const filteredTransactions = useMemo(
    () => filterByDate(txByAcct, dateRange),
    [txByAcct, dateRange]
  );

  // Handles add and search button
  const [showForm, setShowForm] = useState(false);

  function handleIconClick(value) {
    setShowForm(true);
    const page = document.getElementById("page-content");
    page.classList.add("page-invisible");
    const form = document.getElementById("add-tx-form");
    form.classList.remove("page-invisible");
  }

  function closeTransaction() {
    const form = document.getElementById("add-tx-form");
    form.classList.add("page-invisible");
    const page = document.getElementById("page-content");
    page.classList.remove("page-invisible");
  }

  return (
    <>
      <div className="page-content" id="page-content">
        <ToolBar page={page} handleClick={handleIconClick} key={page.title} />
        <div className="main-content">
          <div className="filter-content">
            <FilterButtons value={dateRange} onChange={setDateRange} />
            <Autocomplete
              disablePortal
              options={acctOptions}
              value={accountName}
              sx={{ width: 250 }}
              onChange={(_, newAccount) => {
                setAccount(newAccount);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Select Account" />
              )}
            />
          </div>
          {isLoading && <div className="loading-message">Loading…</div>}

          {isError && (
            <div className="error-message">
              Unable to fetch transactions: {error.message}
            </div>
          )}
          {!isLoading && !isError && (
            <table className="tx-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Account</th>
                  <th>Amount</th>
                  <th>Transaction Type</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx) => (
                  <tr key={tx.transaction_id}>
                    <td>{new Date(tx.date).toLocaleDateString("en-US")}</td>
                    <td>{tx.description}</td>
                    <td>{tx.category}</td>
                    <td>{tx.account}</td>
                    <td>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(tx.amount)}
                    </td>
                    <td>{tx.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      {showForm && (
        <AddTransaction
          catOptions={catOptions}
          accountOptions={acctOptions}
          closeTransaction={closeTransaction}
        />
      )}
    </>
  );
}
