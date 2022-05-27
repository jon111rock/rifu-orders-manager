import React from "react";

export default function Header() {
  return (
    <div class="header">
      <label for="sidebar-switch">
        <i class="bx bx-menu bx-lg menu-logo"></i>
      </label>
      <h2>Order</h2>
      <div class="notification">
        <i class="bx bx-bell bx-md"></i>
        <div>Jack Wu</div>
      </div>
    </div>
  );
}
