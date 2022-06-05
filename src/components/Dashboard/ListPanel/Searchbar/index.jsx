import React, { useState, useRef, useEffect } from "react";

const drowDownList = [
  { name: "依姓名搜尋", pattern: "name" },
  { name: "依住址搜尋", pattern: "address" },
  { name: "依電話搜尋", pattern: "phone_number" },
];

const Searchbar = (props) => {
  const dropdownRef = useRef();
  const inputRef = useRef();

  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [searchMode, setSearchMode] = useState(drowDownList[0]);
  const [searchValue, setSearchValue] = useState("");

  const { onChange } = props;

  //callback when searchValue change
  useEffect(() => {
    onChange(searchMode.pattern, searchValue);
  }, [onChange, searchMode, searchValue]);

  //clearup input when change mode
  useEffect(() => {
    if (!inputRef || !searchMode) return;
    inputRef.current.value = "";
    setSearchValue("");
  }, [searchMode]);

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
            <input
              autoComplete="none"
              ref={inputRef}
              type="text"
              placeholder={searchMode.name}
              defaultValue={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
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
                {item.name}
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
