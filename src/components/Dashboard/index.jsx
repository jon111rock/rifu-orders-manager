import React from "react";
import Header from "./Header";
import ListPanel from "./ListPanel";

export default function Dashboard() {
  return (
    <main className="dashboard">
      <Header />
      <ListPanel />
    </main>
  );
}
