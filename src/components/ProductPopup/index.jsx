import React from "react";
import "./style.scss";

const ProductPopup = () => {
  return (
    <div className="p-popup">
      <div className="p-popup-inner">
        <div className="d-input-box">
          <div className="d-input-item">
            <span>名稱</span>
            <input className="p-input" type="text" />
          </div>
          <div className="d-input-item">
            <span>價格</span>
            <input className="p-input" type="text" />
          </div>
        </div>

        <div className="d-button-box">
          <button className="save">儲存</button>
          <button className="cancel">取消</button>
        </div>
      </div>
    </div>
  );
};

export default ProductPopup;
