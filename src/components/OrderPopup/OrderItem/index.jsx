import React, { useState, useEffect, useRef } from "react";
import "./style.scss";
import DropDown from "../DropDown";

let data = {
  itme_id: "a01",
  name: "草莓三明治",
  count: 10,
  total: 250,
};

const item_list = [
  { id: "a01", name: "草莓三明治", price: 25 },
  { id: "a02", name: "巧克力三明治", price: 25 },
];

const OrderItem = () => {
  const fieldObj = useRef();

  const [name, setName] = useState(data.name);
  const [count, setCount] = useState(data.count);
  const [total, setTotal] = useState(data.total);

  const [openCountField, setOpenCountField] = useState(false);

  const save = (e) => {
    const { value } = e.target;
    if (e.target.name === "count") {
      setCount(value);
      setOpenCountField(false);
    }
  };

  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      save(e);
    }
  };

  useEffect(() => {
    setName(data.name);
  });

  useEffect(() => {
    if (fieldObj.current) fieldObj.current.focus();
  });

  return (
    <div className="orders-item">
      <div className="header">
        <DropDown>草莓三明治</DropDown>
        <span>
          {openCountField ? (
            <input
              name="count"
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
