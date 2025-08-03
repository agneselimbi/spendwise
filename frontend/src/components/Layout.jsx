import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import "../css/Layout.css";

export default function Layout() {
  return (
    <div className="main-container">
      <div className="sidebar">
        <SideBar />
      </div>

      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
