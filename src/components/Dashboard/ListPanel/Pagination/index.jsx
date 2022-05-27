import React from "react";

export default function Pagination() {
  return (
    <div className="pagination">
      <div className="state">
        <ul>
          <li>
            All Order <span>80</span>
          </li>
          <li>
            Prepared <span>10</span>
          </li>
          <li>
            Delivered <span>20</span>
          </li>
          <li>
            Completed <span>50</span>
          </li>
        </ul>
      </div>
      <div className="showing">Showing 8 - 10 of 84 results</div>
    </div>
  );
}
