import React from "react";
import Pagination from "./Pagination";
import Searchbar from "./Searchbar";
import OrdersTable from "./OrdersTable";
import OrdersCard from "./OrdersCard";

const ListPanel = (props) => {
  return (
    <div className="main">
      <Pagination />

      <Searchbar />

      <OrdersTable
        onClick={(selectedIndex) => {
          props.getSelectedOrderIndex(selectedIndex);
        }}
      />

      {/* <!-- Mobile Card --> */}
      <OrdersCard />
    </div>
  );
};

export default ListPanel;
