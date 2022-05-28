import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Dashboard from "../../components/Dashboard";
import OrderPopup from "../../components/OrderPopup";

export default function Home() {
  const [orderPopupTrigger, setOrderPopupTrigger] = useState(false);

  return (
    <div className="container">
      <input id="sidebar-switch" type="checkbox" />
      {/* <!-- control sidebar --> */}
      <Sidebar />
      {/* <!-- when menu open --> */}
      <Dashboard setOrderPopupTrigger={setOrderPopupTrigger} />
      <div className="sidebar-switch-panel"></div>
      <OrderPopup
        trigger={orderPopupTrigger}
        setOrderPopupTrigger={setOrderPopupTrigger}
      />
    </div>
  );
}
