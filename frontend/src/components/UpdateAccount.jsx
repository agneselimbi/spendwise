import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import useUpdateAccount from "../hooks/useUpdateAccount";

export default function UpdateAccount({ closeForm, acct = [] }) {
  const account =
    acct.length > 0
      ? acct[0]
      : { acct_id: "", acct_name: "", institution: "", type: "", balance: "" };
  console.log(account);
  const [acctName, setAccountName] = useState(account.acct_name);
  const [acctType, setAcctType] = useState(account.type);
  const [balance, setBalance] = useState(account.balance);
  const [institution, setInstitution] = useState(account.institution);
  const { mutate } = useUpdateAccount();

  const handleSubmit = (e) => {
    e.preventDefault();
    //build account object
    const newAccount = {
      acct_id: account.acct_id,
      acct_name: acctName,
      balance: Number(balance),
      institution: institution,
      type: acctType,
    };

    mutate(newAccount, {
      onSuccess: () => {
        closeForm();
      },
    });
  };

  return (
    <Box
      component="form"
      noValidate
      className="add-acct-form"
      id="add-acct-form"
      onSubmit={handleSubmit}
    >
      <Typography variant="h3">Update Account </Typography>
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
        <MenuItem value="Checking">Checking</MenuItem>
        <MenuItem value="Savings">Savings</MenuItem>
        <MenuItem value="Credit">Credit</MenuItem>
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
