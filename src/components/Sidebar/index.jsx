import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const Sidebar = () => {
  const [clickTarget, setClickTarget] = useState("訂單");
  const navigate = useNavigate();

  return (
    <nav className="sidebar">
      <label htmlFor="sidebar-switch" className="close-sidebar">
        <i className="bx bx-x bx-md"></i>
      </label>
      <div className="header">
        {/* <img src="https://picsum.photos/seed/1/100/100" alt="" /> */}
        <span className="content">日夫先生</span>
      </div>
      <div className="main">
        <ul>
          <li
            className={clickTarget === "訂單" ? "sidebar-active" : ""}
            onClick={() => {
              setClickTarget("訂單");
              navigate("/order");
            }}
          >
            <i className="bx bx-home-alt-2 "></i>
            <span>訂單</span>
          </li>
          <li
            className={clickTarget === "產品" ? "sidebar-active" : ""}
            onClick={() => {
              setClickTarget("產品");
              navigate("/product");
            }}
          >
            <i className="bx bxs-book-content"></i>
            <span>產品</span>
          </li>
        </ul>
      </div>
      <div className="footer">
        <ul>
          {/* <li>
            <i className="bx bx-cog"></i>
            <span>Setting</span>
          </li> */}
          <li>
            <i className="bx bx-log-out"></i>
            <span>登出</span>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
