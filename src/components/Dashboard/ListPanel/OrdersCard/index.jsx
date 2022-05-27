import React from "react";

export default function OrdersCard() {
  return (
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
  );
}
