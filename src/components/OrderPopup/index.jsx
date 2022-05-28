import React, { useState, useEffect } from "react";
import "./style.scss";
import OrderItem from "./OrderItem";
import AddItem from "./AddItem";

let items_temp = [
  {
    item: {
      name: "草莓三明治",
      price: "25",
    },
    count: 3,
  },
];

const OrderPopup = (props) => {
  const [itemList, setItemList] = useState();

  const closeOrderPopup = () => {
    props.setOrderPopupTrigger(false);
  };

  const addNewItem = (item) => {
    setItemList([...itemList, item]);
  };

  useEffect(() => {
    setItemList(items_temp);
  }, []);

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
              {itemList.map((item, key) => {
                return <OrderItem key={key} itemData={item} />;
              })}
              <AddItem addNewItem={addNewItem} />
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
