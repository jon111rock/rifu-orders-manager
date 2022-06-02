import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.scss";

function DropDown(props) {
  const [active, setActive] = useState();
  const [itemDatas, setItemDatas] = useState();

  const handleSelectItem = (item) => {
    if (props.getItemData) {
      //changed item
      props.getItemData(item);
    } else if (props.addNewItem) {
      //add new item
      props.addNewItem({
        item: item,
        count: 1,
      });
    }
    setActive(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:3500/api/item")
      .then((res) => res.data.result)
      .then((items) => setItemDatas(items));
  }, []);

  return (
    <div
      className="dropdown"
      onClick={() => {
        setActive(true);
      }}
    >
      <div className="dropdown-btn">{props.children}</div>
      <div className={`dropdown-list ${active ? "active z-index-2" : ""}`}>
        <div className="dropdown-search">
          <input type="text" placeholder="Search" />
          <i
            className="bx bx-x bx-md"
            onMouseDown={() => {
              setActive(false);
            }}
          ></i>
        </div>
        <div className="dropdown-items">
          <ul>
            {itemDatas ? (
              //DropDown item
              itemDatas.map((item) => {
                return (
                  <li
                    key={item._id}
                    onMouseDown={() => {
                      handleSelectItem(item);
                    }}
                  >
                    <span>{item.name}</span>
                    <span>${item.price}</span>
                  </li>
                );
              })
            ) : (
              <div>讀取中...</div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DropDown;
