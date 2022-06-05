import React, { useContext, useState, useEffect, useCallback } from "react";
import Pagination from "./Pagination";
import Searchbar from "./Searchbar";
import OrdersTable from "./OrdersTable";
import OrdersCard from "./OrdersCard";

import { AppContext } from "../../../pages/Order";

const ListPanel = (props) => {
  const orders = useContext(AppContext).orders;

  const [selectedPage, setSelectedPage] = useState();
  const [displayList, setDisplayList] = useState();

  const [searchPattern, setSearchPattern] = useState();
  const [searchValue, setSearchValue] = useState();

  const filterList = useCallback(() => {
    if (!orders || !searchPattern) return;
    for (let i in orders) {
      orders[i].displayUser = { ...orders[i].user };
    }
    // filter by search
    // const newOrders = orders.filter((order) =>
    //   order.user[searchPattern].includes(searchValue)
    // );
    const newOrders = orders.reduce((filtered, order) => {
      if (order.user[searchPattern].includes(searchValue)) {
        if (searchValue === "") {
          filtered.push(order);
        } else {
          const joinHtml = `<span style="background-color:yellow;">${searchValue}</span>`;
          const newStr = order.user[searchPattern]
            .split(searchValue)
            .join(joinHtml);

          order.displayUser[searchPattern] = newStr;
          filtered.push(order);
        }
      }
      return filtered;
    }, []);

    //filter by Page
    if (selectedPage && selectedPage !== "所有訂單") {
      const result = newOrders.filter((order) => order.state === selectedPage);
      setDisplayList(result);
    } else {
      setDisplayList(newOrders);
    }
  }, [selectedPage, orders, searchPattern, searchValue]);

  useEffect(() => {
    filterList();
  }, [filterList, selectedPage, searchPattern, searchValue]);

  return (
    <div className="main">
      <Pagination
        orders={orders}
        getCurrentPageName={(name) => {
          setSelectedPage(name);
          // filterList();
        }}
      />

      <Searchbar
        onChange={(pattern, value) => {
          setSearchPattern(pattern);
          setSearchValue(value);
        }}
      />

      <OrdersTable
        displayList={displayList}
        onClick={(selectedIndex) => {
          props.getSelectedOrderIndex(selectedIndex);
        }}
      />

      {/* <!-- Mobile Card --> */}
      <OrdersCard displayList={displayList} />
    </div>
  );
};

export default ListPanel;
