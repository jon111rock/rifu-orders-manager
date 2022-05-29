import React from "react";
import Pagination from "./Pagination";
import Searchbar from "./Searchbar";
import OrdersTable from "./OrdersTable";
import OrdersCard from "./OrdersCard";

const ListPanel = () => {
  return (
    <div className="main">
      <Pagination />

      <Searchbar />

      <OrdersTable />

      {/* <!-- Mobile Card --> */}
      <OrdersCard />
    </div>
  );
};

export default ListPanel;
