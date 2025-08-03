import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import DeleteIcon from "@mui/icons-material/Delete";

export default function BudgetCard({ budget = [], handleClick }) {
  return (
    <Card
      sx={{
        margin: "1rem",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: "800px",
      }}
      className="budget-card"
    >
      <CardContent>
        <Typography
          sx={{
            color: "black",
            fontSize: 16,
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          {budget.category}
        </Typography>
      </CardContent>

      <CardContent>
        <Typography
          sx={{
            color: "black",
            fontSize: 16,
            textTransform: "uppercase",
            fontWeight: "bold",
          }}
        >
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(budget.budget)}
        </Typography>
      </CardContent>

      <Stack
        direction="row"
        spacing={1}
        sx={{
          display: "flex",
          justifyContent: "right",
        }}
      >
        <Tooltip title="Edit Budget">
          <IconButton
            aria-label="edit"
            value="edit"
            size="large"
            onClick={() => {
              handleClick("edit", budget.budget_id);
            }}
          >
            <ModeEditRoundedIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete Budget">
          <IconButton
            aria-label="delete"
            value="delete"
            size="large"
            onClick={() => handleClick("delete", budget.budget_id)}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Card>
  );
}
