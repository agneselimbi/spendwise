import { NavLink } from "react-router-dom";
import "../css/SideBar.css";
export default function SideBar() {
  return (
    <>
      <div className="sidebar-menu">
        <header>
          <img src="./assets/menu-svgrepo-com.svg" alt="menu" /> SpendWise
        </header>
        <nav>
          <NavLink to="/login" className="nav-link">
            <img src="./assets/activity-svgrepo-com.svg" alt="Dashboard Logo" />
            Login
          </NavLink>
          <NavLink to="/" className="nav-link">
            <img src="./assets/activity-svgrepo-com.svg" alt="Dashboard Logo" />
            Dashboard
          </NavLink>
          <NavLink to="/accounts" className="nav-link">
            <img
              src="./assets/bank-account-svgrepo-com.svg"
              alt="Account Logo"
            />
            Accounts
          </NavLink>
          <NavLink to="/transactions" className="nav-link">
            <img
              src="./assets/transactions-svgrepo-com.svg"
              alt="Transactions Logo"
            />
            Transactions
          </NavLink>
          <NavLink to="/budget" className="nav-link">
            <img src="./assets/budget-cost-svgrepo-com.svg" alt="Budget Logo" />
            Budget
          </NavLink>
          <NavLink to="/notifications" className="nav-link">
            <img
              src="./assets/notifications-svgrepo-com.svg"
              alt="Notification Logo"
            />
            Notification
          </NavLink>
        </nav>

        <div>
          <button
            type="button"
            className="logout-btn"
            onClick={() => {
              alert("todo: logout");
            }}
          >
            Logout
            <img src="./assets/logout-svgrepo-com.svg" alt="Logout Logo" />
          </button>
        </div>
      </div>
    </>
  );
}
