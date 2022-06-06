import React, { useContext, useState, useEffect, useCallback } from "react";
import Pagination from "./Pagination";
import Searchbar from "./Searchbar";
import OrdersTable from "./OrdersTable";
import OrdersCard from "./OrdersCard";

import { AppContext } from "../../../pages/Order";

const ORDER_PER_PAGE = 8;

const ListPanel = (props) => {
  const orders = useContext(AppContext).orders;

  const [selectedPage, setSelectedPage] = useState("所有訂單");
  const [displayList, setDisplayList] = useState();

  const [searchPattern, setSearchPattern] = useState();
  const [searchValue, setSearchValue] = useState();

  const [maxPage, setMaxPage] = useState();
  const [currentPageNum, setCurrentPageNum] = useState(1);

  const computeMaxPage = (list, orderPerPage) => {
    if (!list || list.length <= 0) return 1;
    return Math.ceil(list.length / orderPerPage);
  };

  const fillEmptyToList = (list, orderPerPage) => {
    if (!list || list.length >= orderPerPage) return list;
    let tempList = JSON.parse(JSON.stringify(list));
    while (tempList.length < orderPerPage) {
      tempList.push({});
    }
    return tempList;
  };

  const searchFilter = useCallback(
    (orders) => {
      const filteredOrders = orders.reduce((filtered, order) => {
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

      return filteredOrders;
    },
    [searchPattern, searchValue]
  );

  const pageFilter = useCallback((list, selectedPage) => {
    if (selectedPage === "所有訂單") return list;

    const filteredList = list.filter((order) => order.state === selectedPage);
    return filteredList;
  }, []);

  const pageNumFilter = useCallback((list, currentPageNumber) => {
    if (!list) return;

    return list.slice(
      (currentPageNumber - 1) * ORDER_PER_PAGE,
      currentPageNumber * ORDER_PER_PAGE
    );
  }, []);

  const filterList = useCallback(() => {
    if (!orders || !searchPattern) return;

    for (let i in orders) {
      orders[i].displayUser = { ...orders[i].user };
    }

    //filter by search
    let newOrders = searchFilter(orders);

    //filter by Page
    newOrders = pageFilter(newOrders, selectedPage);

    setMaxPage(computeMaxPage(newOrders, ORDER_PER_PAGE));

    //filter by pageNum
    newOrders = pageNumFilter(newOrders, currentPageNum);

    newOrders = fillEmptyToList(newOrders, ORDER_PER_PAGE);

    setDisplayList(newOrders);
  }, [
    selectedPage,
    orders,
    searchPattern,
    searchFilter,
    pageFilter,
    currentPageNum,
    pageNumFilter,
  ]);

  //filter list
  useEffect(() => {
    filterList();
  }, [filterList]);

  // init page number
  useEffect(() => {
    setCurrentPageNum(1);
  }, [selectedPage]);

  return (
    <div className="main">
      <Pagination
        orders={orders}
        getCurrentPageName={(name) => {
          setSelectedPage(name);
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
        selectedPage={selectedPage}
        maxPage={maxPage}
        currentPageNumber={currentPageNum}
        onSelectPageNum={(pageNum) => {
          setCurrentPageNum(pageNum);
        }}
        onClick={(selectedIndex) => {
          props.getSelectedOrderIndex(selectedIndex);
        }}
      />

      {/* <!-- Mobile Card --> */}
      <OrdersCard
        displayList={displayList}
        onClick={(selectedIndex) => {
          props.getSelectedOrderIndex(selectedIndex);
        }}
      />
    </div>
  );
};

export default ListPanel;
