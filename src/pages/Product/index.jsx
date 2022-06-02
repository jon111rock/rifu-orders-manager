import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.scss";
import ProductPopup from "../../components/ProductPopup";

const Product = () => {
  const [isOpenProductPopup, setIsOpenProductPopup] = useState(false);
  const [productList, setProductList] = useState([]);
  const [currentSelectedProduct, setCurrentSelectedProduct] = useState();

  //fetechProductData
  const fetechProductData = async () => {
    const res = await axios.get("http://localhost:3500/api/item");

    setProductList(res.data.result);
  };

  useEffect(() => {
    fetechProductData();
  }, []);

  return (
    <>
      <div className="dashboard">
        <div className="product-header">
          <label className="sidebar-switch" htmlFor="sidebar-switch">
            <i className="bx bx-menu bx-lg menu-logo"></i>
          </label>
          <h2>產品</h2>
          <div
            className="add-product"
            onClick={() => {
              setCurrentSelectedProduct();
              setIsOpenProductPopup(true);
            }}
          >
            <i className="bx bx-plus bx-sm"></i>
            <span>新增產品</span>
          </div>
        </div>
        <div className="product-container">
          <ul className="product-list">
            {productList.map((product) => {
              return (
                <li
                  className="product-item"
                  key={product._id}
                  onClick={() => {
                    setIsOpenProductPopup(true);
                    setCurrentSelectedProduct(product);
                  }}
                >
                  <h3>{product.name}</h3>
                  <h3>$ {product.price}</h3>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      {isOpenProductPopup ? (
        <ProductPopup
          defaultProduct={currentSelectedProduct}
          setIsOpenProductPopup={setIsOpenProductPopup}
          fetechProductData={fetechProductData}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Product;
