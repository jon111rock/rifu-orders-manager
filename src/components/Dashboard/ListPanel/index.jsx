import React, { useContext, useState, useEffect, useCallback } from "react";
import Pagination from "./Pagination";
import Searchbar from "./Searchbar";
import OrdersTable from "./OrdersTable";
import OrdersCard from "./OrdersCard";

import { AppContext } from "../../../pages/Home";

const ListPanel = (props) => {
  const orders = useContext(AppContext).orders;

  const [selectedPage, setSelectedPage] = useState();
  const [displayList, setDisplayList] = useState();

  const filterList = useCallback(() => {
    if (selectedPage && selectedPage !== "所有訂單") {
      const result = orders.filter((order) => order.state === selectedPage);
      setDisplayList(result);
    } else {
      setDisplayList(orders);
    }
  }, [selectedPage, orders]);

  useEffect(() => {
    filterList();
  }, [filterList]);

  return (
    <div className="main">
      <Pagination
        getCurrentPageName={(name) => {
          setSelectedPage(name);
        }}
      />

      <Searchbar />

      <OrdersTable
        displayList={displayList}
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
