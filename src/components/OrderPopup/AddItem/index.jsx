import React, { useState } from "react";
import "./style.scss";
import DropDown from "../DropDown";

const AddItem = (props) => {
  return (
    <div className="add-new">
      <DropDown addNewItem={props.addNewItem}>新增商品</DropDown>
    </div>
  );
};

export default AddItem;
