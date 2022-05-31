import React, { useContext } from "react";
import tableHeads from "./tableHeads";

import { AppContext } from "../../../../pages/Home";

const OrdersTable = (props) => {
  const orders = props.displayList;

  return (
    <div className="orders-table">
      <table>
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

              switch (item.order.state) {
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
                  key={item.index}
                  onClick={() => {
                    props.onClick(item.index);
                  }}
                >
                  <td>{item.order.id}</td>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td>{item.phone_number}</td>
                  <td>{item.order.date}</td>
                  <td>
                    <div className={state}>{item.order.state}</div>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
