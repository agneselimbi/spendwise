import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import "../css/BankCard.css";

export default function BankCard({ acct_id, acct, handleClick }) {
  return (
    <Card
      sx={{ maxWidth: "600px", padding: "0px", margin: "1rem" }}
      className="bank-card"
    >
      <div className="bank-title">
        <CardContent>
          <Typography
            sx={{
              color: "black",
              fontSize: 16,
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            {acct.type}
          </Typography>
        </CardContent>
      </div>
      <div className="bank-details">
        <CardContent sx={{ padding: "0px 1rem" }}>
          <Typography sx={{ color: "black", fontSize: 16 }}>
            {acct.acct_name}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography sx={{ color: "black", fontSize: 16 }}>
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
            }).format(acct.balance)}
          </Typography>
        </CardContent>
      </div>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          display: "flex",
          justifyContent: "right",
        }}
      >
        <Tooltip title="Edit Transaction">
          <IconButton
            aria-label="edit"
            value="edit"
            size="large"
            onClick={() => {
              handleClick("edit", acct_id);
            }}
          >
            <ModeEditRoundedIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete Items">
          <IconButton
            aria-label="delete"
            value="delete"
            size="large"
            onClick={() => handleClick("delete", acct_id)}
          >
            <DeleteIcon fontSize="inherit" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Card>
  );
}
