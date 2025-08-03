import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

export default function AutoComplete({
  dropDownOptions,
  labelName,
  value,
  setValue,
}) {
  return (
    <Autocomplete
      disablePortal
      options={dropDownOptions}
      value={value}
      onChange={(event, newValue) => setValue(newValue)}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={labelName} />}
    />
  );
}
