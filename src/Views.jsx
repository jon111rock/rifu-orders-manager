import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import Dashboard from "./pages/Home";
import Sidebar from "./components/Sidebar";

const Views = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div className="container">
              <input id="sidebar-switch" type="checkbox" />
              <Sidebar />

              <Outlet />
              <div className="sidebar-switch-panel"></div>
            </div>
          }
        >
          <Route path="order" element={<Dashboard />} />
          <Route
            path="product"
            element={<div className="dashboard">test</div>}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default Views;
