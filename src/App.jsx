import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Home";
import "./scss/App.scss";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Dashboard />} />
      </Routes>
    </Router>
  );
}
