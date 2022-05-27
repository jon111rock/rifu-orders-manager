import React from "react";

export default function Dashboard() {
  return (
    <main class="dashboard">
      <div class="header">
        <label for="sidebar-switch">
          <i class="bx bx-menu bx-lg menu-logo"></i>
        </label>
        <h2>Order</h2>
        <div class="notification">
          <i class="bx bx-bell bx-md"></i>
          <div>Jack Wu</div>
        </div>
      </div>

      <div class="main">
        <div class="pagination">
          <div class="state">
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
          <div class="showing">Showing 8 - 10 of 84 results</div>
        </div>

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

        <div class="orders-table">
          <table>
            <thead>
              <tr>
                <th>ORDER ID</th>
                <th>CUSTOMER</th>
                <th>ADDRESS</th>
                <th>PRODUCT</th>
                <th>DATA ORDER</th>
                <th>STATUS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#9685</td>
                <td>Bess Cooper</td>
                <td>Indonesia</td>
                <td>Cannubia</td>
                <td>2021/08/08</td>
                <td>
                  <div class="state-shipping">已出貨</div>
                </td>
              </tr>
              <tr>
                <td>#9685</td>
                <td>Bess Cooper</td>
                <td>Indonesia</td>
                <td>Cannubia</td>
                <td>2021/08/08</td>
                <td>
                  <div class="state-prepared">準備中</div>
                </td>
              </tr>
              <tr>
                <td>#9685</td>
                <td>Bess Cooper</td>
                <td>Indonesia</td>
                <td>Cannubia</td>
                <td>2021/08/08</td>
                <td>
                  <div class="state-completed">已完成</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* <!-- Mobile Card --> */}
        <div class="orders-card">
          <ul class="cards-list">
            <li class="cards-item">
              <div class="name">王小明</div>
              <div class="address">桃園市</div>
              <div class="footer">
                <div class="date">2021/08/08</div>
                <div class="state-completed">已完成</div>
              </div>
            </li>
            <li class="cards-item">
              <div class="name">小美</div>
              <div class="address">新北市</div>
              <div class="footer">
                <div class="date">2021/09/08</div>
                <div class="state-prepared">準備中</div>
              </div>
            </li>
            <li class="cards-item">
              <div class="name">王小明</div>
              <div class="address">桃園市</div>
              <div class="footer">
                <div class="date">2021/08/08</div>
                <div class="state-shipping">已出貨</div>
              </div>
            </li>
            <li class="cards-item">
              <div class="name">王小明</div>
              <div class="address">桃園市</div>
              <div class="footer">
                <div class="date">2021/08/08</div>
                <div class="state-prepared">準備中</div>
              </div>
            </li>
            <li class="cards-item">
              <div class="name">王小明</div>
              <div class="address">桃園市</div>
              <div class="footer">
                <div class="date">2021/08/08</div>
                <div class="state-completed">已完成</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
