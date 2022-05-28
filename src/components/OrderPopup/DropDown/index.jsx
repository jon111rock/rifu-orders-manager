import React, { useState, useEffect } from "react";
import "./style.scss";

const itemDatas = [
  { name: "草莓三明治", price: 25 },
  { name: "巧克力三明治", price: 30 },
  { name: "抹茶厚片", price: 45 },
];

function DropDown(props) {
  const [active, setActive] = useState();

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
            {itemDatas.map((item, key) => {
              return (
                <li
                  key={key}
                  onMouseDown={() => {
                    if (props.getItemData) props.getItemData(item);
                    if (props.addNewItem) {
                      props.addNewItem({
                        item: item,
                        count: 1,
                      });
                    }
                    setActive(false);
                  }}
                >
                  {item.name}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DropDown;
