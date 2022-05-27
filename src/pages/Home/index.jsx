import React from "react";
import Sidebar from "../../components/Sidebar";
import Dashboard from "../../components/Dashboard";

export default function Home() {
  return (
    <div className="container">
      {/* <!-- control sidebar --> */}
      <input id="sidebar-switch" type="checkbox" />
      <Sidebar />
      {/* <!-- when menu open --> */}
      <div className="sidebar-switch-panel"></div>
      <Dashboard />
    </div>
  );
}
