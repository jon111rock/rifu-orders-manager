import React from "react";
import Header from "./Header";
import ListPanel from "./ListPanel";

const Dashboard = (props) => {
  return (
    <main className="dashboard">
      <Header {...props} />
      <ListPanel {...props} />
    </main>
  );
};

export default Dashboard;
