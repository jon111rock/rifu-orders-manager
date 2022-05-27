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
        <div className="add-order">
          <i className="bx bx-plus bx-sm"></i>
          <span>新增訂單</span>
        </div>
      </div>
    </div>
  );
}
