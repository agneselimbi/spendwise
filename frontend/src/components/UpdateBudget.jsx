import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import useUpdateBudget from "../hooks/useUpdateBudget";

export default function UpdateBudget({ closeForm, updatedBudget = [] }) {
  const budgetToUpdate =
    updatedBudget.length > 0
      ? updatedBudget[0]
      : { budget_id: "", category: "", budget: "" };

  //Keep track of the different inputs
  const [category, setCategory] = useState(budgetToUpdate.category);
  const [budget, setBudget] = useState(budgetToUpdate.budget);
  const { mutate, isLoading, error } = useUpdateBudget();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBudget = {
      budget_id: budgetToUpdate.budget_id,
      category: category,
      budget: budget,
    };

    mutate(newBudget, {
      onSuccess: () => {
        closeForm();
      },
    });
  };
  return (
    <Box
      component="form"
      noValidate
      className="update-budget-cat"
      id="update-budget-cat"
      onSubmit={handleSubmit}
    >
      <Typography variant="h3">Update Budget Category </Typography>
      <TextField
        fullWidth
        margin="normal"
        id="budget-category"
        label="Budget Category"
        helperText="Budget category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        Budget Category
      </TextField>
      <TextField
        fullWidth
        margin="normal"
        id="budget"
        label="Budget"
        helperText="Budget"
        type="number"
        value={budget}
        onChange={(e) => setBudget(e.target.value)}
      >
        Budget
      </TextField>
      <Box display="flex" justifyContent="center" alignItems="center">
        <ButtonGroup variant="contained" aria-label="Save Or Cancel Group">
          <Button type="submit" sx={{ bgcolor: "#50c691", border: "none" }}>
            Update Account
          </Button>

          <Button sx={{ bgcolor: "#50c691" }} onClick={closeForm}>
            Cancel
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}
