import React, { useState } from "react";
import "./style.scss";

const Pagination = (props) => {
  const [currentPage, setCurrentPage] = useState();
  const { getCurrentPageName } = props;

  const setPage = (name) => {
    setCurrentPage(name);
    getCurrentPageName(name);
  };

  return (
    <div className="pagination">
      <div className="state">
        <ul>
          <li
            className={`${currentPage === "所有訂單" ? "active" : ""}`}
            onClick={() => setPage("所有訂單")}
          >
            所有訂單 <span>80</span>
          </li>
          <li
            className={`${currentPage === "準備中" ? "active" : ""}`}
            onClick={() => setPage("準備中")}
          >
            準備中 <span>10</span>
          </li>
          <li
            className={`${currentPage === "已出貨" ? "active" : ""}`}
            onClick={() => setPage("已出貨")}
          >
            已出貨 <span>20</span>
          </li>
          <li
            className={`${currentPage === "已完成" ? "active" : ""}`}
            onClick={() => setPage("已完成")}
          >
            已完成 <span>50</span>
          </li>
        </ul>
      </div>
      {/* <div className="showing">Showing 8 - 10 of 84 results</div> */}
    </div>
  );
};

export default Pagination;
