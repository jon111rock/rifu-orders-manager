import React from "react";

const Searchbar = () => {
  return (
    <div className="searchbar">
      <div className="search">
        <div className="s-dropdown-container">
          <div className="s-dropdown-btn">
            <i className="bx bx-search bx-sm"></i>
            <input type="text" placeholder="依姓名搜尋" />
            <i className="bx bxs-down-arrow"></i>
          </div>
          <ul className="s-dropdown-list active">
            <li className="s-dropdown-item">item 1</li>
            <li className="s-dropdown-item">item 2</li>
          </ul>
        </div>
      </div>
      <div className="`control">
        {/*         
        <div className="revision">
          <i className="bx bx-revision bx-sm"></i>
        </div> */}
      </div>
    </div>
  );
};

export default Searchbar;
