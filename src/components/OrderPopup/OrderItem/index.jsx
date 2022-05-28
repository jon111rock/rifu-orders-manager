import React, { useState, useEffect, useRef } from "react";
import "./style.scss";
import DropDown from "../DropDown";

let data = {
  item: {
    name: "草莓三明治",
    price: 25,
  },
  count: 1,
};

const OrderItem = (props) => {
  const fieldObj = useRef();

  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [count, setCount] = useState();
  const [total, setTotal] = useState();

  const [openCountField, setOpenCountField] = useState(false);

  const save = (e) => {
    let { value } = e.target;
    value = parseInt(value);
    if (value === "" || value <= 1) {
      setCount(1);
      setOpenCountField(false);
    } else {
      setCount(value);
      setOpenCountField(false);
    }
  };

  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      save(e);
    }
  };

  //updated data
  const getItemData = (data) => {
    setName(data.name);
    setPrice(data.price);
  };

  //init state (run once)
  useEffect(() => {
    if (props.itemData) setName(props.itemData.item.name);
    if (props.itemData) setPrice(props.itemData.item.price);
    if (props.itemData) setCount(props.itemData.count);
  }, []);

  //compute total
  useEffect(() => {
    setTotal(price * count);
  }, [count, price]);

  //focus input field when edit
  useEffect(() => {
    if (fieldObj.current) fieldObj.current.focus();
  });

  return (
    <div className="orders-item">
      <div className="header">
        <DropDown getItemData={getItemData}>{name}</DropDown>
        <span>
          {openCountField ? (
            <input
              ref={fieldObj}
              onBlur={(e) => save(e)}
              onKeyDown={(e) => handleKeydown(e)}
              className="edit"
              type="text"
              defaultValue={count}
            />
          ) : (
            <span
              onClick={() => {
                setOpenCountField(true);
              }}
            >
              {count}
            </span>
          )}
        </span>
      </div>
      <span>${total}</span>
    </div>
  );
};
export default OrderItem;
