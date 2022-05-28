import React from "react";
import "./style.scss";

const AddOrderPopup = (props) => {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <div className="input-group">
          <ul className="input-field-list">
            <li className="input-field-item">
              <span>姓名</span>
              <input type="text" />
            </li>
            <li className="input-field-item">
              <span>地址</span>
              <input type="text" />
            </li>
            <li className="input-field-item">
              <span>聯絡電話</span>
              <input type="text" />
            </li>
          </ul>
          <div className="orders-area">
            <ul className="orders-list">
              <li className="orders-item">
                <div className="header">
                  <h3 className="name">草莓三明治</h3>
                  <span className="number">X 10</span>
                </div>
                <span className="total">$250</span>
              </li>
              <li className="orders-item">
                <div className="header">
                  <h3 className="name">草莓三明治</h3>
                  <span className="number">X 10</span>
                </div>
                <span className="total">$250</span>
              </li>
              <li className="orders-item">
                <div className="header">
                  <h3 className="name">草莓三明治</h3>
                  <span className="number">X 10</span>
                </div>
                <span className="total">$250</span>
              </li>
              <li className="add-new">
                <h3>新增商品</h3>
              </li>
            </ul>
          </div>
        </div>
        <div className="compute-group">
          <div className="compute-info">
            <h3>Total</h3>
            <span>$1000</span>
          </div>
          <div className="button-group">
            <button className="confirm">新增</button>
            <button className="cancel">取消</button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default AddOrderPopup;
