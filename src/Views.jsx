import React, { useRef, useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Order";
import Sidebar from "./components/Sidebar";
import Product from "./pages/Product";

const Views = () => {
  const sideBarTrigger = useRef();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [isOrderPopOpen, setIsOrderPopOpen] = useState(false);

  const closeSideBar = () => {
    sideBarTrigger.current.checked = false;
    setIsSideBarOpen(false);
  };

  const getIsOrderPopOpen = (state) => {
    setIsOrderPopOpen(state);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div
              className={`container ${
                isSideBarOpen || isOrderPopOpen ? "overflow-hidden" : ""
              }`}
            >
              <input
                ref={sideBarTrigger}
                id="sidebar-switch"
                type="checkbox"
                onChange={(e) => {
                  setIsSideBarOpen(e.target.checked);
                }}
              />
              <Sidebar closeSideBar={closeSideBar} />

              <Outlet />
              <div className="sidebar-switch-panel"></div>
            </div>
          }
        >
          <Route
            path=""
            element={<Dashboard getIsOrderPopOpen={getIsOrderPopOpen} />}
          />
          <Route path="product" element={<Product />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} replace />
      </Routes>
    </Router>
  );
};

export default Views;
