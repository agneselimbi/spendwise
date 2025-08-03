import * as React from "react";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import "../css/ToolBar.css";

export default function ToolBar({ page, handleClick }) {
  return (
    <header>
      <div className="page-title">
        <h1> {page.title}</h1>
      </div>
      <div className="header-btns">
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Tooltip title="Add Transaction">
            <IconButton
              aria-label="add"
              value="add"
              size="large"
              onClick={() => handleClick("add")}
            >
              <AddOutlinedIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Edit Transaction">
            <IconButton
              aria-label="edit"
              value="edit"
              size="large"
              onClick={(e) => handleClick(e.target.value)}
            >
              <ModeEditRoundedIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Search Items">
            <IconButton
              aria-label="search"
              value="search"
              size="large"
              onClick={() => handleClick("search")}
            >
              <SearchOutlinedIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Items">
            <IconButton
              aria-label="delete"
              value="delete"
              size="large"
              onClick={(e) => handleClick(e.target.value)}
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </Stack>
      </div>
    </header>
  );
}
