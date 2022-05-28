import React from "react";
import Sidebar from "../../components/Sidebar";
import Dashboard from "../../components/Dashboard";
import AddOrderPopup from "../../components/AddOrderPopup";

export default function Home() {
  return (
    <div className="container">
      <input id="sidebar-switch" type="checkbox" />
      {/* <!-- control sidebar --> */}
      <Sidebar />
      {/* <!-- when menu open --> */}
      <Dashboard />
      <div className="sidebar-switch-panel"></div>
      <AddOrderPopup trigger={false} />
    </div>
  );
}
