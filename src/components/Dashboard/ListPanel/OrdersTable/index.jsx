import React, { useState } from "react";
import tableHeads from "./tableHeads";
import ordersData from "../../../../data/orders";

export default function OrdersTable(props) {
  const [orders, setOrders] = useState(ordersData);

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
          {orders.map((item) => {
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
              <tr key={item.index}>
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
          })}
        </tbody>
      </table>
    </div>
  );
}
