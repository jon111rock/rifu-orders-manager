import React, { useState, useEffect, useCallback, useRef } from "react";
import "./style.scss";
import OrderItem from "./OrderItem";
import AddItem from "./AddItem";

const OrderPopup = (props) => {
  const clickInner = useRef();

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

  const computeTotal = useCallback(() => {
    let total = 0;
    for (let i in itemList) {
      total += itemList[i].total;
    }
    setTotal(total);
  }, [itemList]);

  useEffect(() => {
    setTotal(0);
  }, []);

  useEffect(() => {
    computeTotal();
  }, [computeTotal]);

  return props.trigger ? (
    <div
      className="popup"
      onClick={(e) => {
        if (clickInner.current && !clickInner.current.contains(e.target)) {
          closeOrderPopup();
        }
      }}
    >
      <div ref={clickInner} className="popup-inner">
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
