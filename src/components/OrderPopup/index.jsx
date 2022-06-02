import React, { useState, useEffect, useCallback, useRef } from "react";
import "./style.scss";
import OrderItem from "./OrderItem";
import AddItemButton from "./AddItemButton";
import InputDropDown from "./InputDropDown";
import DeletePopup from "./DeletePopup";

import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

const OrderPopup = (props) => {
  const clickInner = useRef();

  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [orderDate, setOrderDate] = useState();
  const [completedDate, setCompletedDate] = useState("");
  const [orderType, setOrderType] = useState("寄送");
  const [orderState, setOrderState] = useState("準備中");
  const [detailList, setDetailList] = useState([]);
  const [total, setTotal] = useState(0);

  const [isDeleteOrder, setIsDeleteOrder] = useState(false);

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
    setDetailList([]);
    setTotal();

    setOrderPopupTrigger(false);
    props.setCurrentSelectedOrder(undefined);
    props.setIsUpdateExistOrder(false);
  };

  const importExistOrder = useCallback(() => {
    if (!props.currentSelectedOrder) return;
    setName(props.currentSelectedOrder.user.name);
    setAddress(props.currentSelectedOrder.user.address);
    setPhoneNumber(props.currentSelectedOrder.user.phone_number);
    setOrderDate(props.currentSelectedOrder.date);
    setCompletedDate(props.currentSelectedOrder.completed_date);
    setOrderType(props.currentSelectedOrder.type);

    //filter if item equal null
    const filtedList = props.currentSelectedOrder.details.filter(
      (detail) => detail.item !== null
    );
    setDetailList(filtedList);
    setOrderState(props.currentSelectedOrder.state);
  }, [props.currentSelectedOrder]);

  //orderItem
  const addNewItem = (item) => {
    setDetailList([...detailList, item]);
  };

  const saveChangedItem = (_id, changedItem, count) => {
    for (let i in detailList) {
      if (detailList[i]._id === _id) {
        const newList = [...detailList];
        if (changedItem) newList[i].item = changedItem;
        newList[i].count = count;
        setDetailList(newList);
      }
    }
  };

  const deleteItem = (_id) => {
    const newItems = detailList.filter((item) => item._id !== _id);
    setDetailList(newItems);
  };

  const computeTotal = useCallback(() => {
    let total = 0;

    for (let i in detailList) {
      const count = detailList[i].count;
      const price = detailList[i].item.price;
      total += count * price;
    }

    setTotal(total);
  }, [detailList]);

  const handleSaveOrder = async () => {
    if (!name || !address || !phoneNumber || !orderDate || !orderType) return;

    const tempDetailList = [...detailList].map((detail) => ({
      count: detail.count,
      item: detail.item.name,
    }));

    if (props.isUpdateExistOrder) {
      //update data
      const currentOrder = props.currentSelectedOrder;
      try {
        //update user
        await axios.patch(`${baseUrl}/api/user/${currentOrder.user._id}`, {
          name: name,
          address: address,
          phone_number: phoneNumber,
        });
        // update order
        await axios.patch(`${baseUrl}/api/order/${currentOrder._id}`, {
          date: orderDate,
          completed_date: completedDate,
          type: orderType,
          state: orderState,
          details: tempDetailList,
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      //create data
      try {
        let userId;

        const existUser = await axios.get(`${baseUrl}/api/user/name/${name}`);
        if (existUser.data.message === "success") {
          userId = existUser.data.result._id;
        } else {
          const user = await axios.post(`${baseUrl}/api/user`, {
            name: name,
            address: address,
            phone_number: phoneNumber,
          });
          userId = user.data.result._id;
        }

        await axios.post(`${baseUrl}/api/order/${userId}`, {
          date: orderDate,
          completed_date: completedDate,
          type: orderType,
          state: orderState,
          details: tempDetailList,
        });
      } catch (error) {
        console.error(error.message);
      }
    }
    props.fetechOrdersData();
    clearFormAndClose();
  };

  const handleDeleteOrder = async () => {
    try {
      const currentOrder = props.currentSelectedOrder;
      await axios.delete(`${baseUrl}/api/order/${currentOrder._id}`);
    } catch (error) {
      console.error(error);
    }
    setIsDeleteOrder(false);
    clearFormAndClose();
    props.fetechOrdersData();
  };

  // update exist order
  useEffect(() => {
    importExistOrder();
  }, [importExistOrder]);

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
                  type="date"
                  onChange={(e) => {
                    setOrderDate(e.target.value);
                  }}
                  defaultValue={orderDate}
                />
              </div>
              <div>
                <span>預計到貨時間</span>
                <input
                  type="date"
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
              {detailList.map((detail) => {
                if (!detail.item) {
                  detail.item = { name: "找不到", price: 999 };
                }
                return (
                  <OrderItem
                    key={detail.item._id}
                    itemData={detail}
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
          <div className="left-box">
            <h3>總金額</h3>
            <h3>${total}</h3>
          </div>
          <div className="right-box">
            <div className="button-group">
              <button
                className={`delete popup-btn ${
                  props.isUpdateExistOrder ? "active" : ""
                }`}
                onClick={() => {
                  setIsDeleteOrder(true);
                }}
              >
                刪除
              </button>
              <button className="confirm popup-btn" onClick={handleSaveOrder}>
                儲存
              </button>
              <button className="cancel popup-btn" onClick={clearFormAndClose}>
                取消
              </button>
            </div>
          </div>
        </div>
        {/* Delete popup */}
        {isDeleteOrder ? (
          <DeletePopup
            onClick={(state) => {
              if (state === "delete") {
                handleDeleteOrder();
              } else {
                setIsDeleteOrder(false);
              }
            }}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  ) : (
    ""
  );
};

export default OrderPopup;
