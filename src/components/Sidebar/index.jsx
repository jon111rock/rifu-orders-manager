import React from "react";

export default function Sidebar() {
  return (
    <nav className="sidebar">
      <label htmlFor="sidebar-switch" className="close-sidebar">
        <i className="bx bx-x bx-md"></i>
      </label>
      <div className="header">
        <img src="https://picsum.photos/seed/1/100/100" alt="" />
        <span className="content">SideBar</span>
      </div>
      <div className="main">
        <ul>
          <li>
            <i className="bx bx-home-alt-2"></i>
            <span>Dashboard</span>
          </li>
          <li>
            <i className="bx bxs-book-content"></i>
            <span>Product</span>
          </li>
          <li>
            <i className="bx bx-book-reader"></i>
            <span>Order</span>
          </li>
        </ul>
      </div>
      <div className="footer">
        <ul>
          <li>
            <i className="bx bx-cog"></i>
            <span>Setting</span>
          </li>
          <li>
            <i className="bx bx-log-out"></i>
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </nav>
  );
}
