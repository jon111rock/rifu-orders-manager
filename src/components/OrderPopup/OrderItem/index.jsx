import React, { useState, useEffect, useRef } from "react";
import "./style.scss";
import DropDown from "../DropDown";

const OrderItem = (props) => {
  const fieldObj = useRef();

  const [id, setId] = useState();
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

  //delete data
  const handleDelete = () => {
    props.deleteItem(id);
  };

  //updated data
  const getItemData = (data) => {
    setName(data.name);
    setPrice(data.price);
  };

  //init state (run once)
  useEffect(() => {
    const { id, item, count } = props.itemData;
    if (props.itemData) {
      setId(id);
      setName(item.name);
      setPrice(item.price);
      setCount(count);
    }
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
      <div className="footer">
        <div>
          <i className="bx bx-x bx-sm" onClick={handleDelete}></i>
        </div>
        <div>${total}</div>
      </div>
    </div>
  );
};
export default OrderItem;
