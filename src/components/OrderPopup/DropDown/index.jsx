import React, { useState } from "react";
import "./style.scss";

const itemDatas = [
  { _id: 1, name: "草莓三明治", price: 25 },
  { _id: 2, name: "巧克力三明治", price: 30 },
  { _id: 3, name: "抹茶厚片", price: 45 },
];

function DropDown(props) {
  const [active, setActive] = useState();

  const handleSelectItem = (item) => {
    if (props.getItemData) {
      //changed item
      props.getItemData(item);
    } else if (props.addNewItem) {
      //add new item
      props.addNewItem({
        _id: Math.floor(Date.now() / 1000),
        item: item,
        count: 1,
        total: item.price,
      });
    }
    setActive(false);
  };

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
            {
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
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DropDown;
