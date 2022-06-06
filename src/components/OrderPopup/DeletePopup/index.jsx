import React, { useState, useEffect } from "react";
import "./style.scss";

const DeletePopup = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return (
    <div className="d-popup">
      <div className="d-popup-inner">
        <div className="title">確定要刪除嗎?</div>
        <div className="btn-container">
          <div
            className="popup-btn confirm"
            onClick={() => {
              setIsLoading(true);
              props.onClick("delete");
            }}
          >
            {isLoading ? (
              <i className="bx bx-loader-alt bx-spin bx-rotate-90"></i>
            ) : (
              "刪除"
            )}
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
