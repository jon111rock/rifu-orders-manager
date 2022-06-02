import React from "react";
import "./style.scss";

const DeletePopup = (props) => {
  return (
    <div className="d-popup">
      <div className="d-popup-inner">
        <div className="title">確定要刪除嗎?</div>
        <div className="btn-container">
          <div
            className="popup-btn confirm"
            onClick={() => {
              props.onClick("delete");
            }}
          >
            刪除
          </div>
          <div
            className="popup-btn cancel"
            onClick={() => {
              props.onClick("cancel");
            }}
          >
            取消
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletePopup;
