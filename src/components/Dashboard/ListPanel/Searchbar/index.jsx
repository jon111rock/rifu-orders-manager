import React from "react";

export default function Searchbar() {
  return (
    <div class="searchbar">
      <div class="search">
        <i class="bx bx-search bx-sm"></i>
        <input type="text" />
      </div>
      <div class="control">
        <div class="filter">
          <i class="bx bx-filter bx-sm"></i>
        </div>
        <div class="export">
          <i class="bx bx-export bx-sm"></i>
        </div>
      </div>
    </div>
  );
}
