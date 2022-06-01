import React, { useState, useEffect, useCallback, useRef } from "react";
import "./style.scss";
import OrderItem from "./OrderItem";
import AddItemButton from "./AddItemButton";
import InputDropDown from "./InputDropDown";

//fake data
// import fakeData from "../../data/orders";
import axios from "axios";

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

  const saveChangedItem = (_id, changedItem, count, total) => {
    for (let i in itemList) {
      if (itemList[i]._id === _id) {
        const newList = [...itemList];
        if (changedItem) newList[i].item = changedItem;
        newList[i].count = count;
        newList[i].total = total;
        setItemList(newList);
      }
    }
  };

  const deleteItem = (_id) => {
    const newItems = itemList.filter((item) => item._id !== _id);
    setItemList(newItems);
  };

  const computeTotal = useCallback(() => {
    let total = 0;
    for (let i in itemList) {
      total += itemList[i].total;
    }
    setTotal(total);
  }, [itemList]);

  const handleSaveOrder = async () => {
    //http request
    //...
    //fake data
    if (!name || !address || !phoneNumber || !orderDate || !orderType) return;

    if (props.isUpdateExistOrder) {
      //update data
      // const { _id } = props.currentSelectedOrder;
      // for (let i in fakeData) {
      //   if (fakeData[i]._id === _id) {
      //     fakeData[i].user.name = name;
      //     fakeData[i].user.address = address;
      //     fakeData[i].user.phone_number = phoneNumber;
      //     fakeData[i].date = orderDate;
      //     fakeData[i].completed_date = completedDate;
      //     fakeData[i].detail = itemList;
      //     fakeData[i].state = orderState;
      //     fakeData[i].type = orderType;
      //   }
      // }

      const currentOrder = props.currentSelectedOrder;

      // console.log(currentOrder);
      // update user
      try {
        const res = await axios.patch(
          `http://localhost:3500/api/user/${currentOrder.user._id}`,
          {
            name: name,
            address: address,
            phone_number: phoneNumber,
          }
        );
        props.fetechOrdersData();
        console.log("update user ...", res.data.message);
      } catch (error) {
        console.log(error.message);
      }

      // update order
      try {
        const res = await axios.patch(
          `http://localhost:3500/api/order/${currentOrder._id}`,
          {
            date: orderDate,
            completed_date: completedDate,
            type: orderType,
            state: orderState,
          }
        );
        props.fetechOrdersData();
        console.log("update order ...", res.data.message);
      } catch (error) {
        console.log(error.message);
      }

      //update detail
      try {
        itemList.forEach(async (detail) => {
          const res = await axios.get(
            `http://localhost:3500/api/detail/${detail._id}`
          );
          if (res.data.message !== "success") {
            const res = await axios.post(
              `http://localhost:3500/api/detail/${currentOrder.user._id}`,
              {
                item: detail.item.name,
                count: detail.count,
              }
            );
            console.log("Add detail ...", res.data.message);
          } else {
            const res = await axios.patch(
              `http://localhost:3500/api/detail/${detail._id}`,
              {
                item: detail.item.name,
                count: detail.count,
              }
            );
            console.log("update detail ...", res.data.message);
          }
          // update details to order
          await axios.get(
            `http://localhost:3500/api/order/${currentOrder.user._id}`
          );
        });
        props.fetechOrdersData();
      } catch (error) {
        console.log(error.message, error.detailId);
      }
    } else {
      //create data

      const newOrder = {
        user: {
          name: name,
          address: address,
          phone_number: phoneNumber,
        },

        oid: `H${
          Math.floor(Date.now() / 10000000) + Math.floor(Date.now() % 100000000)
        }`,
        date: orderDate,
        completedDate: completedDate,
        type: orderType,
        details: itemList, //
        state: orderState,
      };

      //create user
      //todo: 1.改成 async await形式 2.新增的order，details會是空的，沒有被加入到order object裡面
      axios
        .post("http://localhost:3500/api/user", newOrder.user)
        .then((res) => {
          console.log("create user ...", res.data.message);
          return res.data.object._id;
        })
        .then((userId) => {
          itemList.forEach((item) => {
            axios
              .post(`http://localhost:3500/api/detail/${userId}`, {
                item: item.item.name,
                count: item.count,
              })
              .then((res) => {
                console.log("create details ...", res.data.message);
              });
          });

          return userId;
        })
        .then((userId) => {
          axios
            .post(`http://localhost:3500/api/order/${userId}`, {
              date: newOrder.date,
              completed_date: newOrder.completedDate,
              type: newOrder.type,
              state: newOrder.state,
            })
            .then((res) => {
              console.log("create order ...", res.data.message);

              props.fetechOrdersData();
            });
        });

      // fakeData.push(newOrder);
      // console.log("create new order");
    }

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
    setOrderDate(props.currentSelectedOrder.date);
    setCompletedDate(props.currentSelectedOrder.completed_date);
    setOrderType(props.currentSelectedOrder.type);
    setItemList(props.currentSelectedOrder.details);
    setOrderState(props.currentSelectedOrder.state);
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
                    key={item._id}
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
