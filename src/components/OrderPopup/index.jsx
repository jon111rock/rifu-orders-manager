import React, { useState, useEffect } from "react";
import "./style.scss";
import OrderItem from "./OrderItem";
import AddItem from "./AddItem";

let items_temp = [];

const OrderPopup = (props) => {
  const [itemList, setItemList] = useState([]);
  const [total, setTotal] = useState();

  const closeOrderPopup = () => {
    props.setOrderPopupTrigger(false);
    setItemList([]);
  };

  const addNewItem = (item) => {
    setItemList([...itemList, item]);
  };

  const saveChange = (id, changedItem, count, total) => {
    for (let i in itemList) {
      if (itemList[i].id === id) {
        const newList = [...itemList];
        if (changedItem) newList[i].item = changedItem;
        newList[i].count = count;
        newList[i].total = total;
        setItemList(newList);
      }
    }
  };

  const deleteItem = (id) => {
    const newItems = itemList.filter((item) => item.id !== id);
    setItemList(newItems);
  };

  const computeTotal = () => {
    let total = 0;
    for (let i in itemList) {
      total += itemList[i].total;
    }
    setTotal(total);
  };

  useEffect(() => {
    setItemList(items_temp);
    setTotal(0);
  }, []);

  useEffect(() => {
    computeTotal();
  });

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
              {itemList.map((item) => {
                return (
                  <OrderItem
                    key={item.id}
                    itemData={item}
                    deleteItem={deleteItem}
                    saveChange={saveChange}
                  />
                );
              })}
              <AddItem addNewItem={addNewItem} />
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="compute-group">
          <h3>Total</h3>
          <div className="right-box">
            <span>${total}</span>
            <div className="button-group">
              <button className="confirm">新增</button>
              <button className="cancel" onClick={closeOrderPopup}>
                取消
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default OrderPopup;
