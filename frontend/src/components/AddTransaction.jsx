import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import useAddTransaction from "../hooks/useAddTransaction";

export default function AddTransaction({
  catOptions = [],
  accountOptions = [],
  closeTransaction,
}) {
  const [catName, setCat] = useState(catOptions[0]);
  const [account, setAccount] = useState(accountOptions[0]);
  const [txType, setTxType] = useState("Expense");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const { mutate } = useAddTransaction();
  const handleSubmit = (e) => {
    e.preventDefault();

    //build tx object
    const tx = {
      description: description,
      amount: Number(amount),
      account: account,
      type: txType,
      category: catName,
    };

    mutate(tx, {
      onSuccess: () => {
        setDescription("");
        setAmount("");
        setTxType("Expense");
        setCat(catOptions[0]);
        setAccount("");
        console.log("succes");
      },
    });
  };

  function clearForm() {
    setDescription("");
    setAmount("");
    setTxType("Expense");
    setCat(catOptions[0]);
    setAccount("");
  }
  return (
    <Box
      component="form"
      noValidate
      className="add-tx-form"
      id="add-tx-form"
      onSubmit={handleSubmit}
    >
      <Typography variant="h3">Add New Transaction</Typography>
      <TextField
        fullWidth
        margin="normal"
        id="description"
        label="Description"
        helperText="Describe the transaction"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      >
        Transaction
      </TextField>

      <TextField
        fullWidth
        margin="normal"
        id="amount"
        label="Amount"
        helperText="Transaction Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      >
        Amount
      </TextField>
      <TextField
        select
        fullWidth
        margin="normal"
        id="category"
        label="Category"
        value={catName}
        onChange={(e) => setCat(e.target.value)}
      >
        {catOptions.map((cat) => (
          <MenuItem value={cat} key={cat}>
            {cat}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        margin="normal"
        id="account"
        label="Bank Account"
        helperText="Bank Account"
        value={account}
        onChange={(e) => setAccount(e.target.value)}
      >
        Bank Account
      </TextField>

      <TextField
        select
        fullWidth
        margin="normal"
        id="type"
        label="Transaction Type"
        helperText="Input or Expense"
        value={txType}
        onChange={(e) => setTxType(e.target.value)}
      >
        <MenuItem value="Expense">Expense</MenuItem>
        <MenuItem value="Income">Income</MenuItem>
      </TextField>

      <Box display="flex" justifyContent="center" alignItems="center">
        <ButtonGroup variant="contained" aria-label="Save Or Cancel Group">
          <Button type="submit" sx={{ bgcolor: "#50c691", border: "none" }}>
            Save Transaction
          </Button>
          <Button
            type="reset"
            sx={{ bgcolor: "#50c691", border: "none" }}
            onClick={clearForm}
          >
            Reset
          </Button>
          <Button sx={{ bgcolor: "#50c691" }} onClick={closeTransaction}>
            Cancel
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}
