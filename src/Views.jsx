import React, { useRef } from "react";
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

  const closeSideBar = () => {
    sideBarTrigger.current.checked = false;
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="container">
              <input ref={sideBarTrigger} id="sidebar-switch" type="checkbox" />
              <Sidebar closeSideBar={closeSideBar} />

              <Outlet />
              <div className="sidebar-switch-panel"></div>
            </div>
          }
        >
          <Route path="" element={<Dashboard />} />
          <Route path="product" element={<Product />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} replace />
      </Routes>
    </Router>
  );
};

export default Views;
