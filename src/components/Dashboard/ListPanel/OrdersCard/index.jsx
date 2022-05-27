import React from "react";

export default function OrdersCard() {
  return (
    <div className="orders-card">
      <ul className="cards-list">
        <li className="cards-item">
          <div className="name">王小明</div>
          <div className="address">桃園市</div>
          <div className="footer">
            <div className="date">2021/08/08</div>
            <div className="state-completed">已完成</div>
          </div>
        </li>
        <li className="cards-item">
          <div className="name">小美</div>
          <div className="address">新北市</div>
          <div className="footer">
            <div className="date">2021/09/08</div>
            <div className="state-prepared">準備中</div>
          </div>
        </li>
        <li className="cards-item">
          <div className="name">王小明</div>
          <div className="address">桃園市</div>
          <div className="footer">
            <div className="date">2021/08/08</div>
            <div className="state-shipping">已出貨</div>
          </div>
        </li>
        <li className="cards-item">
          <div className="name">王小明</div>
          <div className="address">桃園市</div>
          <div className="footer">
            <div className="date">2021/08/08</div>
            <div className="state-prepared">準備中</div>
          </div>
        </li>
        <li className="cards-item">
          <div className="name">王小明</div>
          <div className="address">桃園市</div>
          <div className="footer">
            <div className="date">2021/08/08</div>
            <div className="state-completed">已完成</div>
          </div>
        </li>
      </ul>
    </div>
  );
}
