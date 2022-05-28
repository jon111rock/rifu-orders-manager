import React from "react";
import "./style.scss";
import OrderItem from "./OrderItem";
import AddItem from "./AddItem";

const OrderPopup = (props) => {
  const closeOrderPopup = () => {
    props.setOrderPopupTrigger(false);
  };

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <div className="input-group">
          <ul className="input-field-list">
            <li className="input-field-item">
              <span>姓名</span>
              <input type="text" />
            </li>
            <li className="input-field-item">
              <span>地址</span>
              <input type="text" />
            </li>
            <li className="input-field-item">
              <span>聯絡電話</span>
              <input type="text" />
            </li>
          </ul>
          <div className="orders-area">
            <div className="orders-list">
              <OrderItem />
              <AddItem />
            </div>
          </div>
        </div>
        <div className="compute-group">
          <div className="compute-info">
            <h3>Total</h3>
            <span>$1000</span>
          </div>
          <div className="button-group">
            <button className="confirm">新增</button>
            <button className="cancel" onClick={closeOrderPopup}>
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default OrderPopup;
