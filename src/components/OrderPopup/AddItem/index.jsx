import React, { useState } from "react";
import "./style.scss";
import DropDown from "../DropDown";

const AddItem = () => {
  return (
    <div className="add-new">
      <DropDown>新增商品</DropDown>
    </div>
  );
};

export default AddItem;
