import React from "react";

export default function OrdersTable() {
  return (
    <div className="orders-table">
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
              <div className="state-shipping">已出貨</div>
            </td>
          </tr>
          <tr>
            <td>#9685</td>
            <td>Bess Cooper</td>
            <td>Indonesia</td>
            <td>Cannubia</td>
            <td>2021/08/08</td>
            <td>
              <div className="state-prepared">準備中</div>
            </td>
          </tr>
          <tr>
            <td>#9685</td>
            <td>Bess Cooper</td>
            <td>Indonesia</td>
            <td>Cannubia</td>
            <td>2021/08/08</td>
            <td>
              <div className="state-completed">已完成</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
