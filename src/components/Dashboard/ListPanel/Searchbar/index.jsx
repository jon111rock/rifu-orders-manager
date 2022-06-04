import React, { useState, useRef } from "react";

const drowDownList = ["依姓名搜尋", "依住址搜尋", "依電話搜尋"];

const Searchbar = () => {
  const dropdownRef = useRef();
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [searchMode, setSearchMode] = useState(drowDownList[0]);

  return (
    <div
      className="searchbar"
      onClick={(e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
          setIsOpenDropdown(false);
        }
      }}
    >
      <div className="search">
        <div className="s-dropdown-container">
          <div className="s-dropdown-btn">
            <i className="bx bx-search bx-sm"></i>
            <input type="text" placeholder={searchMode} />
            <i
              ref={dropdownRef}
              className="bx bxs-down-arrow"
              onClick={() => {
                setIsOpenDropdown(!isOpenDropdown);
              }}
            ></i>
          </div>
          <ul className={`s-dropdown-list ${isOpenDropdown ? "active" : ""}`}>
            {drowDownList.map((item, key) => (
              <li
                className="s-dropdown-item"
                key={key}
                onClick={() => {
                  setSearchMode(drowDownList[key]);
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="`control">
        {/*         
        <div className="revision">
          <i className="bx bx-revision bx-sm"></i>
        </div> */}
      </div>
    </div>
  );
};

export default Searchbar;
