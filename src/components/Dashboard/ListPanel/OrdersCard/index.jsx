import React from "react";

const OrdersCard = (props) => {
  // const orders = props.displayList;
  const orders = [];

  return (
    <div className="orders-card">
      <ul className="cards-list">
        {orders.map((item) => {
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
              break;
          }

          return (
            <li className="cards-item" key={item._id}>
              <div className="name">{item.user.name}</div>
              <div className="address">{item.user.address}</div>
              <div className="footer">
                <div className="date">{item.date}</div>
                <div className={state}>{item.state}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default OrdersCard;
