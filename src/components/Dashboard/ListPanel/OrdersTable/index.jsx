import React, { useState, useEffect } from "react";
import tableHeads from "./tableHeads";

// const ORDER_PER_PAGE = 8;

const OrdersTable = (props) => {
  const orders = props.displayList;
  const onSelectPageNum = props.onSelectPageNum;
  const maxPage = props.maxPage;
  const currentPageNumber = props.currentPageNumber;

  const [pageArray, setPageArray] = useState([1]);

  useEffect(() => {
    let pageAry = [];
    for (let i = 0; i < maxPage; i++) {
      pageAry.push(i + 1);
    }
    setPageArray(pageAry);
  }, [maxPage]);

  return (
    <div className="orders-container">
      <table className="orders-table">
        <thead>
          <tr>
            {tableHeads.map((item, key) => {
              return <th key={key}>{item}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {orders ? (
            orders.map((item, key) => {
              if (!item._id)
                return (
                  <tr key={key}>
                    <td>&nbsp;</td>
                  </tr>
                );
              let state = "state-prepared";

              switch (item.state) {
                case "準備中":
                  state = "state-prepared";
                  break;
                case "已出貨":
                  state = "state-shipping";
                  break;
                case "已完成":
                  state = "state-completed";
                  break;
                default:
                  state = "";
                  break;
              }
              return (
                <tr
                  className="orders-row"
                  key={item._id}
                  onClick={() => {
                    props.onClick(item._id);
                  }}
                >
                  <td>{item._id}</td>
                  <td
                    dangerouslySetInnerHTML={{ __html: item.displayUser.name }}
                  ></td>
                  <td
                    dangerouslySetInnerHTML={{
                      __html: item.displayUser.address,
                    }}
                  ></td>
                  <td
                    dangerouslySetInnerHTML={{
                      __html: item.displayUser.phone_number,
                    }}
                  ></td>

                  <td>{item.date}</td>
                  <td>
                    <div className={state}>{item.state}</div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr className="loading">
              <td>
                <i className="bx bx-loader-alt bx-spin bx-lg"></i>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="orders-page">
        <i className="bx bx-chevron-left bx-md page-arrow"></i>
        {pageArray.map((num, key) => (
          <span
            className={`page ${currentPageNumber === num ? "selected" : ""}`}
            onClick={() => {
              onSelectPageNum(num);
            }}
            key={key}
          >
            {num}
          </span>
        ))}
        <i className="bx bx-chevron-right bx-md page-arrow"></i>
      </div>
    </div>
  );
};

export default OrdersTable;
