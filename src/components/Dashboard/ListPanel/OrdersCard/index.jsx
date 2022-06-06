import React from "react";

const OrdersCard = (props) => {
  const orders = props.displayList;

  return (
    <div className="orders-card">
      <ul className="cards-list">
        {orders ? (
          orders.map((item, key) => {
            if (!item._id) return <span key={key}></span>;
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
          })
        ) : (
          <i className="bx bx-loader-alt bx-spin bx-rotate-90 bx-lg"></i>
        )}
      </ul>
    </div>
  );
};

export default OrdersCard;
