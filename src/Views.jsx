import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Home";

const Views = () => {
  return (
    <Router>
      <Routes>
        <Route index element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default Views;
