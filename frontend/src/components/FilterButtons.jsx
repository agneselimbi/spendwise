import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import "../css/FilterButtons.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    green: {
      main: "#50c691",
      light: "#a7f3d0",
      dark: "#065f46",
      contrastText: "#242105",
    },
    orange: {
      main: "#FD973F",
      light: "#fed7aa",
      dark: "#BC9574",
      contrastText: "#171717",
    },
  },
});
export default function FilterButtons({ value, onChange }) {
  return (
    <ThemeProvider theme={theme}>
      <ButtonGroup aria-label="Date Range Filter" sx={{ height: "60px" }}>
        <Button
          className="filter-btn"
          color="green"
          sx={{ border: "green", color: "white" }}
          variant="contained"
          onClick={() => onChange("thisday")}
        >
          This Day
        </Button>
        <Button
          color="green"
          sx={{ border: "green", color: "white" }}
          variant="contained"
          onClick={() => onChange("thisweek")}
        >
          This Week
        </Button>
        <Button
          color="green"
          sx={{ border: "none", color: "white" }}
          variant="contained"
          onClick={() => onChange("threemonths")}
        >
          3 months
        </Button>
        <Button
          color="green"
          sx={{ border: "none", color: "white" }}
          variant="contained"
          onClick={() => onChange("sixmonths")}
        >
          6 months
        </Button>
        <Button
          color="green"
          sx={{ border: "none", color: "white" }}
          variant={value === "oneyear" ? "contained" : "outlined"}
          onClick={() => onChange("oneyear")}
        >
          1 year
        </Button>
      </ButtonGroup>
    </ThemeProvider>
  );
}
