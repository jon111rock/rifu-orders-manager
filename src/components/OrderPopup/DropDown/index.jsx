import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./style.scss";

const baseUrl = process.env.REACT_APP_BASE_URL;

function DropDown(props) {
  const searchRef = useRef();

  const [active, setActive] = useState();
  const [itemList, setItemList] = useState();
  const [displayList, setDisplayList] = useState();
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

  const handleSearch = (e) => {
    // setSearchValue(e.target.value);

    //filter itemList
    if (!itemList) return;

    const inputValue = e.target.value;
    const newList = itemList.reduce((filtered, item) => {
      if (item.name.includes(inputValue)) {
        if (inputValue === "") {
          filtered.push(item);
        } else {
          const joinHtml = `<span style="background-color:yellow;">${inputValue}</span>`;
          const newName = item.name.split(inputValue).join(joinHtml);
          const tempItem = { ...item };

          tempItem.displayName = newName;
          filtered.push(tempItem);
        }
      }
      return filtered;
    }, []);
    setDisplayList(newList);
  };

  //GET itemList
  useEffect(() => {
    axios
      .get(`${baseUrl}/api/item`)
      .then((res) => res.data.result)
      .then((items) => {
        for (let i in items) {
          items[i].displayName = items[i].name;
        }
        setItemList(items);
        setDisplayList(items);
      });
  }, []);

  //clearUp searchRef value
  useEffect(() => {
    searchRef.current.value = "";
    setDisplayList(itemList);
  }, [active, itemList]);

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
          <input
            ref={searchRef}
            type="text"
            placeholder="???????????????"
            onChange={(e) => {
              handleSearch(e);
            }}
          />
          <i
            className="bx bx-x bx-md"
            onMouseDown={() => {
              setActive(false);
            }}
          ></i>
        </div>
        <div className="dropdown-items">
          <ul>
            {displayList ? (
              //DropDown item
              displayList.map((item) => {
                return (
                  <li
                    key={item._id}
                    onMouseDown={() => {
                      handleSelectItem(item);
                    }}
                  >
                    <span
                      dangerouslySetInnerHTML={{ __html: item.displayName }}
                    ></span>
                    <span>${item.price}</span>
                  </li>
                );
              })
            ) : (
              <div>?????????...</div>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DropDown;
