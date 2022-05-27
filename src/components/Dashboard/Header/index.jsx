import React from "react";

export default function Header() {
  return (
    <div className="header">
      <label htmlFor="sidebar-switch">
        <i className="bx bx-menu bx-lg menu-logo"></i>
      </label>
      <h2>Order</h2>
      <div className="notification">
        <i className="bx bx-bell bx-md"></i>
        <div>Jack Wu</div>
      </div>
    </div>
  );
}
