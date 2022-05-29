import React, { useState, useEffect } from "react";
import "./style.scss";
import OrderItem from "./OrderItem";
import AddItem from "./AddItem";

let items_temp = [];

const OrderPopup = (props) => {
  const [itemList, setItemList] = useState([]);

  const closeOrderPopup = () => {
    props.setOrderPopupTrigger(false);
    setItemList([]);
  };

  const addNewItem = (item) => {
    setItemList([...itemList, item]);
  };

  const deleteItem = (id) => {
    const newItems = itemList.filter((item) => item.id !== id);
    setItemList(newItems);
  };

  useEffect(() => {
    setItemList(items_temp);
  }, []);

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        {/* main */}
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
                return (
                  <OrderItem
                    key={item.id}
                    itemData={item}
                    deleteItem={deleteItem}
                  />
                );
              })}
              <AddItem addNewItem={addNewItem} />
            </div>
          </div>
        </div>

        {/* footer */}
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
