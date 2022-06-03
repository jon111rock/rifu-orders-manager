import React, { useState } from "react";
import "./style.scss";

const Pagination = (props) => {
  const [currentPage, setCurrentPage] = useState("所有訂單");

  const { orders } = props;

  const getOrdersCountByState = (orders, state) => {
    if (!orders) return undefined;
    const list = orders.filter((order) => order.state === state);
    return list.length;
  };

  const setPage = (name) => {
    setCurrentPage(name);
    props.getCurrentPageName(name);
  };

  return (
    <div className="pagination">
      <div className="state">
        <ul>
          <li
            className={`${currentPage === "所有訂單" ? "active" : ""}`}
            onClick={() => setPage("所有訂單")}
          >
            所有訂單 <span>{orders ? orders.length : "0"}</span>
          </li>
          <li
            className={`${currentPage === "準備中" ? "active" : ""}`}
            onClick={() => setPage("準備中")}
          >
            準備中{" "}
            <span>
              {orders ? getOrdersCountByState(orders, "準備中") : "0"}
            </span>
          </li>
          <li
            className={`${currentPage === "已出貨" ? "active" : ""}`}
            onClick={() => setPage("已出貨")}
          >
            已出貨{" "}
            <span>
              {orders ? getOrdersCountByState(orders, "已出貨") : "0"}
            </span>
          </li>
          <li
            className={`${currentPage === "已完成" ? "active" : ""}`}
            onClick={() => setPage("已完成")}
          >
            已完成
            <span>
              {orders ? getOrdersCountByState(orders, "已完成") : "0"}
            </span>
          </li>
        </ul>
      </div>
      {/* <div className="showing">Showing 8 - 10 of 84 results</div> */}
    </div>
  );
};

export default Pagination;
