import React, { useState, useEffect } from "react";
import "./style.scss";

function DropDown(props) {
  const [active, setActive] = useState();

  return (
    <div
      className="dropdown"
      onClick={() => {
        setActive(true);
      }}
      onMouseLeave={() => {
        setActive(false);
      }}
    >
      <div className="dropdown-btn">{props.children}</div>
      <div className={`dropdown-list ${active ? "active" : ""}`}>
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
            <li>草莓三明治</li>
            <li>巧克力三明治</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DropDown;
