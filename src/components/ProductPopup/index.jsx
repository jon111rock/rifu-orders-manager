import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.scss";
import DeletePopup from "../OrderPopup/DeletePopup";

const ProductPopup = (props) => {
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [isDeletePopup, setIsDeletePopup] = useState(false);

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

  const patchProduct = async () => {
    try {
      await axios.patch(
        `http://localhost:3500/api/item/${props.defaultProduct._id}`,
        {
          name: name,
          price: price,
        }
      );
      props.fetechProductData();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async () => {
    try {
      await axios.delete(
        `http://localhost:3500/api/item/${props.defaultProduct._id}`
      );
      props.fetechProductData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickSave = () => {
    if (!name || !price) return;
    if (props.defaultProduct) {
      patchProduct();
    } else {
      postProduct();
    }
    clearUp();
    props.setIsOpenProductPopup(false);
  };

  const handleClickDelete = () => {
    deleteProduct();
    clearUp();
    props.setIsOpenProductPopup(false);
  };

  //init if exist product
  useEffect(() => {
    if (!props.defaultProduct) return;
    setName(props.defaultProduct.name);
    setPrice(props.defaultProduct.price);
  }, []);

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
              defaultValue={name}
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
              defaultValue={price}
            />
          </div>
        </div>

        <div className="d-button-box">
          <button
            className="delete"
            onClick={() => {
              setIsDeletePopup(true);
            }}
          >
            刪除
          </button>
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
      {isDeletePopup ? (
        <DeletePopup
          onClick={(state) => {
            if (state === "delete") {
              handleClickDelete();
            } else {
              setIsDeletePopup(false);
            }
          }}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProductPopup;
