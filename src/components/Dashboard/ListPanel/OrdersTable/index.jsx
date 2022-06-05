import React from "react";
import tableHeads from "./tableHeads";

const OrdersTable = (props) => {
  const orders = props.displayList;

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
            orders.map((item) => {
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
            <tr></tr>
          )}
        </tbody>
      </table>
      <div className="orders-page">
        <i class="bx bx-chevron-left bx-md"></i>
        <span className="page">1</span>
        <i class="bx bx-chevron-right bx-md"></i>
      </div>
    </div>
  );
};

export default OrdersTable;
