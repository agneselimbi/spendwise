import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import useAddAccount from "../hooks/useAddAccount";

export default function AddAccount({ accountTypeOptions = [], closeForm }) {
  const [acctName, setAccountName] = useState("");
  const [acctType, setAcctType] = useState("Checking");
  const [balance, setBalance] = useState("Expense");
  const [institution, setInstitution] = useState("");
  const { mutate } = useAddAccount();

  const handleSubmit = (e) => {
    e.preventDefault();
    //build account object
    const newAccount = {
      acct_name: acctName,
      balance: Number(balance),
      institution: institution,
      type: acctType,
    };
    console.log(newAccount);
    mutate(newAccount, {
      onSuccess: () => {
        setInstitution("");
        setBalance("");
        setAcctType("Checking");
        console.log("succes");
      },
    });
  };

  function clearForm() {
    setInstitution("");
    setBalance("");
    setAccountName("Expense");
    setAcctType("Checking");
  }
  return (
    <Box
      component="form"
      noValidate
      className="add-acct-form"
      id="add-acct-form"
      sx={{ display: "flex", flexDirection: "column" }}
      onSubmit={handleSubmit}
    >
      <Typography variant="h3">Add New Account </Typography>
      <TextField
        fullWidth
        margin="normal"
        id="acct_name"
        label="Account Name"
        helperText="Alias for Account Name"
        value={acctName}
        onChange={(e) => setAccountName(e.target.value)}
      >
        Account Name
      </TextField>

      <TextField
        fullWidth
        margin="normal"
        id="balance"
        label="Balance"
        helperText="Account Balance"
        type="number"
        value={balance}
        onChange={(e) => setBalance(e.target.value)}
      >
        Balance
      </TextField>
      <TextField
        fullWidth
        margin="normal"
        id="institution"
        label="Institutions"
        value={institution}
        onChange={(e) => setInstitution(e.target.value)}
      >
        Banking Institution
      </TextField>

      <TextField
        select
        fullWidth
        margin="normal"
        id="type"
        label="Account Type"
        helperText="Bank Account Type"
        value={acctType}
        onChange={(e) => setAcctType(e.target.value)}
      >
        <MenuItem value="checking">Checking</MenuItem>
        <MenuItem value="savings">Savings</MenuItem>
        <MenuItem value="credit">Credit</MenuItem>
      </TextField>

      <Box display="flex" justifyContent="center" alignItems="center">
        <ButtonGroup variant="contained" aria-label="Save Or Cancel Group">
          <Button type="submit" sx={{ bgcolor: "#50c691", border: "none" }}>
            Add New Account
          </Button>
          <Button
            type="reset"
            sx={{ bgcolor: "#50c691", border: "none" }}
            onClick={clearForm}
          >
            Reset
          </Button>
          <Button sx={{ bgcolor: "#50c691" }} onClick={closeForm}>
            Cancel
          </Button>
        </ButtonGroup>
      </Box>
    </Box>
  );
}
