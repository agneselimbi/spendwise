import { useState } from "react";
import "../css/Dashboard.css";
import useGetTransactionsByCategory from "../hooks/useGetTransactionsByCat";
import useGetTransactionsbyMonth from "../hooks/useGetTransactionsByMonth";
import useGetBudgetProgress from "../hooks/useGetBudgetProgress";
import useGetAccountName from "../hooks/useGetAccountName";
import AutoComplete from "../components/AutoComplete";
import MonthlyTransactionsBar from "../components/MonthlyTransactionsChart";
import TransactionPieChart from "../components/PieChart";
import BudgetProgressBar from "../components/BudgetChart";

export default function Dashboard() {
  const {
    data: TxByCat,
    isError,
    isLoading,
    error,
  } = useGetTransactionsByCategory();

  const { data: accountName } = useGetAccountName();
  const [selectedAccount, setSelectedAccount] = useState("Checking-USBANK");
  const usedTx = TxByCat ? TxByCat[selectedAccount] : {};

  const chartData = usedTx
    ? Object.entries(usedTx).map(([cat, value]) => ({
        category: cat,
        amount: value,
      }))
    : {};

  const {
    data: monthlyTransactions,
    isError: ismonthlyTransactionsError,
    isLoading: ismonthlyTransactionsLoading,
    error: monthlyTransactionsError,
  } = useGetTransactionsbyMonth();

  const {
    data: budgetProgress,
    isError: isbudgetProgressError,
    isLoading: isbudgetProgressLoading,
    error: budgetProgressError,
  } = useGetBudgetProgress();
  // console.log("budgetProgress", budgetProgress);
  return (
    <>
      <h1 className="dashboard">Dashboard</h1>
      <div className="charts">
        <div className="chart 1">
          <h2>Transactions by Category</h2>
          <AutoComplete
            dropDownOptions={accountName}
            labelName="Account Name"
            value={selectedAccount}
            setValue={setSelectedAccount}
          />

          {isError && (
            <div className="error-message">Unable to load data : {error}</div>
          )}
          {Array.isArray(chartData) && chartData.length > 0 ? (
            <TransactionPieChart
              dt={chartData}
              dtKey="amount"
              nKey="category"
            />
          ) : (
            <div className="acct-info"> No data for :{selectedAccount} </div>
          )}
        </div>
        <div className=" chart 2 ">
          {ismonthlyTransactionsError && (
            <div className="error-message">
              Unable to load monthly transactions data :{" "}
              {monthlyTransactionsError}
            </div>
          )}
          {ismonthlyTransactionsLoading && (
            <div className="loading-message">Loading monthly transactions </div>
          )}
          {Array.isArray(monthlyTransactions) && (
            <MonthlyTransactionsBar dt={monthlyTransactions} />
          )}
        </div>
        <div className="chart 3">
          {isbudgetProgressLoading && (
            <div className="loading-message">Loading monthly transactions </div>
          )}
          {isbudgetProgressError && (
            <div className="error-message">
              Unable to load budget Progres : {budgetProgressError}
            </div>
          )}
          {budgetProgress && <BudgetProgressBar data={budgetProgress} />}
        </div>
      </div>
    </>
  );
}
