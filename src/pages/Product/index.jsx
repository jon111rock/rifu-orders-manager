import React from "react";
import "./style.scss";
import ProductPopup from "../../components/ProductPopup";

const Product = () => {
  return (
    <>
      <div className="dashboard">
        <div className="product-header">
          <label className="sidebar-switch" htmlFor="sidebar-switch">
            <i className="bx bx-menu bx-lg menu-logo"></i>
          </label>
          <h2>產品</h2>
          <div className="add-product">
            <i className="bx bx-plus bx-sm"></i>
            <span>新增產品</span>
          </div>
        </div>
        <div className="product-container">
          <ul className="product-list">
            <li className="product-item">
              <h3>草莓三明治</h3>
              <h3>35$</h3>
            </li>
            <li className="product-item">
              <h3>草莓三明治</h3>
              <h3>35$</h3>
            </li>
            <li className="product-item">
              <h3>草莓三明治</h3>
              <h3>35$</h3>
            </li>
          </ul>
        </div>
      </div>
      {/* <ProductPopup /> */}
    </>
  );
};

export default Product;
