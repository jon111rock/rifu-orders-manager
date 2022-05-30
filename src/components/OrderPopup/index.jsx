import React, { useState, useEffect, useCallback, useRef } from "react";
import "./style.scss";
import OrderItem from "./OrderItem";
import AddItem from "./AddItem";

//fake data
import fakeData from "../../data/orders";

const OrderPopup = (props) => {
  const clickInner = useRef();

  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [orderDate, setOrderDate] = useState();
  const [completedDate, setCompletedDate] = useState("");
  const [orderType, setOrderType] = useState();

  const [itemList, setItemList] = useState([]);
  const [total, setTotal] = useState();

  const { setOrderPopupTrigger } = props;

  const closeOrderPopup = () => {
    //clearup state
    setName();
    setAddress();
    setPhoneNumber();
    setOrderDate();
    setCompletedDate();
    setOrderType();
    setItemList([]);
    setTotal();

    setOrderPopupTrigger(false);
    props.setCurrentSelectedOrder(undefined);
    props.setIsUpdateExistOrder(false);
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

  const handleSaveOrder = () => {
    //http request
    //...
    //fake data
    if (!name || !address || !phoneNumber || !orderDate || !orderType) return;

    const newOrder = {
      index: Math.floor(Date.now() / 100),
      name: name,
      address: address,
      phone_number: phoneNumber,
      order: {
        id: `H${
          Math.floor(Date.now() / 10000000) + Math.floor(Date.now() % 100000000)
        }`,
        date: orderDate,
        completedDate: completedDate,
        type: orderType,
        content: itemList,
        state: "準備中",
      },
      funds: total,
      deposit: 100,
      remaining_funds: total - 100,
    };

    console.log(props.isUpdateExistOrder);
    if (props.isUpdateExistOrder) {
      //update data
      const { index } = props.currentSelectedOrder;
      for (let i in fakeData) {
        console.log(fakeData[i]);
        if (fakeData[i].index === index) {
          fakeData[i].name = name;
          fakeData[i].address = address;
          fakeData[i].phone_number = phoneNumber;
          fakeData[i].order.date = orderDate;
          fakeData[i].order.completed_date = completedDate;
          fakeData[i].order.content = itemList;
        }
      }
    } else {
      //create data
      fakeData.push(newOrder);
    }

    console.log("success");
    closeOrderPopup();
  };

  useEffect(() => {
    setTotal(0);
  }, []);

  // update exist order
  useEffect(() => {
    if (!props.currentSelectedOrder) return;
    setName(props.currentSelectedOrder.name);
    setAddress(props.currentSelectedOrder.address);
    setPhoneNumber(props.currentSelectedOrder.phone_number);
    setOrderDate(props.currentSelectedOrder.order.date);
    setCompletedDate(props.currentSelectedOrder.order.completed_date);
    setOrderType(props.currentSelectedOrder.order.type);
    setItemList(props.currentSelectedOrder.order.content);
  }, [props.currentSelectedOrder]);

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
            <li className="input-field-item cst-input">
              <span>姓名</span>
              <input
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                defaultValue={name}
              />
            </li>
            <li className="input-field-item cst-input">
              <span>地址</span>
              <input
                type="text"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                defaultValue={address}
              />
            </li>
            <li className="input-field-item cst-input">
              <span>聯絡電話</span>
              <input
                type="text"
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
                defaultValue={phoneNumber}
              />
            </li>
            <li className="date-box cst-input">
              <div>
                <span>預計出貨時間</span>
                <input
                  type="text"
                  onChange={(e) => {
                    setOrderDate(e.target.value);
                  }}
                  defaultValue={orderDate}
                />
              </div>
              <div>
                <span>預計到貨時間</span>
                <input
                  type="text"
                  onChange={(e) => {
                    setCompletedDate(e.target.value);
                  }}
                  defaultValue={completedDate}
                />
              </div>
            </li>
            <li className="input-field-item cst-input">
              <span>訂單類型</span>
              <input
                type="text"
                onChange={(e) => {
                  setOrderType(e.target.value);
                }}
                defaultValue={orderType}
              />
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
              <button className="confirm" onClick={handleSaveOrder}>
                儲存
              </button>
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
