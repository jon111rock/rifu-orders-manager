import React, { useState, useEffect, useCallback, useRef } from "react";
import "./style.scss";
import OrderItem from "./OrderItem";
import AddItemButton from "./AddItemButton";
import InputDropDown from "./InputDropDown";

//fake data
import fakeData from "../../data/orders";

const OrderPopup = (props) => {
  const clickInner = useRef();

  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [orderDate, setOrderDate] = useState();
  const [completedDate, setCompletedDate] = useState("");
  const [orderType, setOrderType] = useState("寄送");
  const [orderState, setOrderState] = useState("準備中");

  const [itemList, setItemList] = useState([]);
  const [total, setTotal] = useState();

  const { setOrderPopupTrigger } = props;

  const clearFormAndClose = () => {
    //clearup state
    setName();
    setAddress();
    setPhoneNumber();
    setOrderDate();
    setCompletedDate();
    setOrderType("寄送");
    setOrderState("準備中");
    setItemList([]);
    setTotal();

    setOrderPopupTrigger(false);
    props.setCurrentSelectedOrder(undefined);
    props.setIsUpdateExistOrder(false);
  };

  //orderItem
  const addNewItem = (item) => {
    setItemList([...itemList, item]);
  };

  const saveChangedItem = (did, changedItem, count, total) => {
    for (let i in itemList) {
      if (itemList[i].did === did) {
        const newList = [...itemList];
        if (changedItem) newList[i].item = changedItem;
        newList[i].count = count;
        newList[i].total = total;
        setItemList(newList);
      }
    }
  };

  const deleteItem = (did) => {
    const newItems = itemList.filter((item) => item.did !== did);
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

    if (props.isUpdateExistOrder) {
      //update data
      const { id } = props.currentSelectedOrder;
      for (let i in fakeData) {
        if (fakeData[i].id === id) {
          fakeData[i].user.name = name;
          fakeData[i].user.address = address;
          fakeData[i].user.phone_number = phoneNumber;
          fakeData[i].order.date = orderDate;
          fakeData[i].order.completed_date = completedDate;
          fakeData[i].order.detail = itemList;
          fakeData[i].order.state = orderState;
          fakeData[i].order.type = orderType;
        }
      }
    } else {
      //create data

      const newOrder = {
        id: Math.floor(Date.now() / 100 + 87),
        user: {
          uid: Math.floor(Date.now() / 100),
          name: name,
          address: address,
          phone_number: phoneNumber,
        },
        order: {
          oid: `H${
            Math.floor(Date.now() / 10000000) +
            Math.floor(Date.now() % 100000000)
          }`,
          date: orderDate,
          completedDate: completedDate,
          type: orderType,
          detail: itemList,
          state: orderState,
        },
      };

      fakeData.push(newOrder);
    }

    console.log("success");
    clearFormAndClose();
  };

  useEffect(() => {
    setTotal(0);
  }, []);

  // update exist order
  useEffect(() => {
    if (!props.currentSelectedOrder) return;
    setName(props.currentSelectedOrder.user.name);
    setAddress(props.currentSelectedOrder.user.address);
    setPhoneNumber(props.currentSelectedOrder.user.phone_number);
    setOrderDate(props.currentSelectedOrder.order.date);
    setCompletedDate(props.currentSelectedOrder.order.completed_date);
    setOrderType(props.currentSelectedOrder.order.type);
    setItemList(props.currentSelectedOrder.order.detail);
    setOrderState(props.currentSelectedOrder.order.state);
  }, [props.currentSelectedOrder]);

  useEffect(() => {
    computeTotal();
  }, [computeTotal]);

  return props.trigger ? (
    <div
      className="popup"
      onClick={(e) => {
        if (clickInner.current && !clickInner.current.contains(e.target)) {
          clearFormAndClose();
        }
      }}
    >
      <div ref={clickInner} className="popup-inner">
        {/* main */}
        <div className="input-group">
          <ul className="input-field-list">
            <li className="input-field-item popup-input">
              <span>姓名</span>
              <input
                type="text"
                onChange={(e) => {
                  setName(e.target.value);
                }}
                defaultValue={name}
              />
            </li>
            <li className="input-field-item popup-input">
              <span>地址</span>
              <input
                type="text"
                onChange={(e) => {
                  setAddress(e.target.value);
                }}
                defaultValue={address}
              />
            </li>
            <li className="input-field-item popup-input">
              <span>聯絡電話</span>
              <input
                type="text"
                onChange={(e) => {
                  setPhoneNumber(e.target.value);
                }}
                defaultValue={phoneNumber}
              />
            </li>
            <li className="date-box popup-input">
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
            <li className="input-field-item popup-input">
              <span>訂單類型</span>
              <InputDropDown
                dropDownList={["寄送", "自取"]}
                defaultState={orderType}
                onChangeState={(state) => {
                  setOrderType(state);
                }}
              />
            </li>
            <li className="input-field-item popup-input">
              <span>訂單狀態</span>
              <InputDropDown
                dropDownList={["準備中", "已出貨", "已完成"]}
                defaultState={orderState}
                onChangeState={(state) => {
                  setOrderState(state);
                }}
              />
            </li>
          </ul>
          <div className="orders-area">
            <div className="orders-list">
              {itemList.map((item) => {
                return (
                  <OrderItem
                    key={item.did}
                    itemData={item}
                    deleteItem={deleteItem}
                    saveChangedItem={saveChangedItem}
                  />
                );
              })}
              <AddItemButton addNewItem={addNewItem} />
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
              <button className="cancel" onClick={clearFormAndClose}>
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
