import React from "react";

const Searchbar = () => {
  return (
    <div className="searchbar">
      <div className="search">
        <i className="bx bx-search bx-sm"></i>
        <input type="text" />
      </div>
      <div className="control">
        <div className="filter">
          <i className="bx bx-filter bx-sm"></i>
        </div>
        <div className="export">
          <i className="bx bx-export bx-sm"></i>
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
