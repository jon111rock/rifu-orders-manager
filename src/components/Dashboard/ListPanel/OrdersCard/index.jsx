import React, { useState } from "react";
import orderData from "../../../../data/orders";

const OrdersCard = () => {
  const [orders, setOrders] = useState(orderData);

  return (
    <div className="orders-card">
      <ul className="cards-list">
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
              break;
          }

          return (
            <li className="cards-item" key={item.index}>
              <div className="name">{item.name}</div>
              <div className="address">{item.address}</div>
              <div className="footer">
                <div className="date">{item.order.date}</div>
                <div className={state}>{item.order.state}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default OrdersCard;
