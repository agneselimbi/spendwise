import { useState, useEffect } from "react";
import ToolBar from "../components/ToolBar";
import BudgetCard from "../components/BudgetCard";
import useGetBudgets from "../hooks/useGetBudgets";
import useDeleteBudget from "../hooks/useDeleteBudget";
import UpdateBudget from "../components/UpdateBudget";
import useGetBudgetById from "../hooks/useGetBudgetById";

export default function Budget() {
  const page = { title: "Budget" };
  const { data: budgets, isLoading, isError, error } = useGetBudgets();
  const { mutate } = useDeleteBudget();

  const [showForm, setShowForm] = useState(false);
  const [selectedBudgetId, setSelectedBudgetId] = useState(null);
  const { data: selectedBudget } = useGetBudgetById(selectedBudgetId, {
    enabled: selectedBudgetId !== null,
  });
  // useEffect(() => {
  //   console.log("selectedBudgetId changed:", selectedBudget);
  // }, [selectedBudget]);

  function handleIconClick() {
    alert("Btn clicked");
  }

  function handleClick(value, id) {
    if (value === "edit") {
      setSelectedBudgetId(id);
      setShowForm(true);
    }
    if (value === "delete") {
      mutate(id), { onSucess: () => console.log("Deleted Budget Category") };
    }
  }

  function closeForm() {
    setShowForm(false);
    setSelectedBudgetId(null);
  }
  return (
    <>
      <div className="page-content" id="page-content">
        <ToolBar page={page} handleClick={handleIconClick} key={page.title} />

        {isError && (
          <div className="error-message">
            Unable to Load Budgets : {error.message}
          </div>
        )}
        {isLoading && <div className="loading-message">Loading...</div>}
        {!isLoading && !isError && Array.isArray(budgets) && !showForm && (
          <div className="main-content">
            {budgets.map((budget) => (
              <BudgetCard
                key={budget.budget_id}
                budget={budget}
                handleClick={handleClick}
              />
            ))}
          </div>
        )}

        {showForm && selectedBudget && (
          <UpdateBudget updatedBudget={selectedBudget} closeForm={closeForm} />
        )}
      </div>
    </>
  );
}
