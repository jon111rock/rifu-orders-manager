import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.scss";

const Sidebar = (props) => {
  const [clickTarget, setClickTarget] = useState();

  const location = useLocation();
  const navigate = useNavigate();

  const { closeSideBar } = props;

  const getCurrentPathName = useCallback(() => {
    if (location.pathname === "/") {
      return "訂單";
    }

    if (location.pathname === "/product") {
      return "產品";
    }
  }, [location.pathname]);

  useEffect(() => {
    setClickTarget(getCurrentPathName());
  }, [getCurrentPathName]);

  return (
    <nav className="sidebar">
      <label htmlFor="sidebar-switch" className="close-sidebar">
        <i className="bx bx-x bx-md"></i>
      </label>
      <div className="header">
        <span className="content">日夫先生</span>
      </div>
      <div className="main">
        <ul>
          <li
            className={clickTarget === "訂單" ? "sidebar-active" : ""}
            onClick={() => {
              setClickTarget("訂單");
              navigate("/");
              closeSideBar();
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
              closeSideBar();
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
