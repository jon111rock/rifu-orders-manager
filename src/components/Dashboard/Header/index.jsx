import React from "react";

const Header = (props) => {
  const openOrderPopup = () => {
    props.setOrderPopupTrigger(true);
  };

  return (
    <div className="header">
      <label className="sidebar-switch" htmlFor="sidebar-switch">
        <i className="bx bx-menu bx-lg menu-logo"></i>
      </label>
      <h2>訂單</h2>
      <div className="notification">
        <i className="bx bx-bell bx-md"></i>
        <div className="add-order" onClick={openOrderPopup}>
          <i className="bx bx-plus bx-sm"></i>
          <span>新增訂單</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
