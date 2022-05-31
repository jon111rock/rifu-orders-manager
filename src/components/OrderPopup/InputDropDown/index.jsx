import React, { useState, useEffect, useRef } from "react";
import "./style.scss";

function InputDropDown(props) {
  const [state, setState] = useState();
  const [active, setActive] = useState(false);

  const dropDownList = props.dropDownList;

  useEffect(() => {
    if (props.defaultState) {
      setState(props.defaultState);
    } else {
      setState(dropDownList[0]);
    }
  }, [props, dropDownList]);

  const handleClick = (state) => {
    setState(state);
    setActive(false);
    props.onChangeState(state);
  };

  return (
    <div className={`popup-dropdown ${active ? "dropdown-active" : ""}`}>
      <div
        className="dropdown-btn"
        type="text"
        defaultValue={state}
        onClick={() => {
          setActive(!active);
        }}
      >
        <span>{state}</span>
        <i className="bx bxs-down-arrow"></i>
      </div>
      <div className="dropdown-content">
        {dropDownList.map((item, key) => {
          return (
            <p
              key={key}
              onClick={() => {
                handleClick(item);
              }}
            >
              {item}
            </p>
          );
        })}
      </div>
    </div>
  );
}

export default InputDropDown;
