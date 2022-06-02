import React, { useState } from "react";
import axios from "axios";
import "./style.scss";

const ProductPopup = (props) => {
  const [name, setName] = useState();
  const [price, setPrice] = useState();

  const clearUp = () => {
    setName();
    setPrice();
  };

  const postProduct = async () => {
    try {
      await axios.post("http://localhost:3500/api/item", {
        name: name,
        price: price,
      });
      props.fetechProductData();
    } catch (error) {}
  };

  const handleClickSave = () => {
    if (!name || !price) return;
    postProduct();
    clearUp();
    props.setIsOpenProductPopup(false);
  };

  return (
    <div className="p-popup">
      <div className="p-popup-inner">
        <div className="d-input-box">
          <div className="d-input-item">
            <span>名稱</span>
            <input
              className="p-input"
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="d-input-item">
            <span>價格</span>
            <input
              className="p-input"
              type="text"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="d-button-box">
          <button
            className="save"
            onClick={() => {
              handleClickSave();
            }}
          >
            儲存
          </button>
          <button
            className="cancel"
            onClick={() => {
              clearUp();
              props.setIsOpenProductPopup(false);
            }}
          >
            取消
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPopup;
