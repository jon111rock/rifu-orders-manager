import React, { useState, useEffect, useCallback } from "react";
import tableHeads from "./tableHeads";

const ORDER_PER_PAGE = 8;

const OrdersTable = (props) => {
  const orders = props.displayList;
  const [pageArray, setPageArray] = useState([1]);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [displayList, setDisplayList] = useState([]);

  const fillEmptyToList = (list) => {
    if (!list || list.length >= ORDER_PER_PAGE) return list;
    let tempList = JSON.parse(JSON.stringify(list));
    while (tempList.length < ORDER_PER_PAGE) {
      tempList.push({});
    }
    return tempList;
  };

  const filterListByPageNum = useCallback(
    (list) => {
      if (!list) return;

      return list.slice(
        (currentPageNumber - 1) * ORDER_PER_PAGE,
        currentPageNumber * ORDER_PER_PAGE
      );
    },
    [currentPageNumber]
  );

  //compute total page num
  useEffect(() => {
    if (!orders) return;
    let pageAry = [];
    const maxPage = Math.ceil(orders.length / ORDER_PER_PAGE);
    for (let i = 0; i < maxPage; i++) {
      pageAry.push(i + 1);
    }
    if (pageAry.length <= 0) {
      setPageArray([1]);
    } else {
      setPageArray(pageAry);
    }
  }, [orders]);

  //compute displayOrder by current page number
  useEffect(() => {
    setDisplayList(fillEmptyToList(filterListByPageNum(orders)));
  }, [filterListByPageNum, currentPageNumber, orders]);

  useEffect(() => {
    setCurrentPageNumber(1);
  }, [props.selectedPage]);

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
          {displayList ? (
            displayList.map((item, key) => {
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
              setCurrentPageNumber(num);
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
