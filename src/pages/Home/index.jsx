import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Dashboard from "../../components/Dashboard";
import OrderPopup from "../../components/OrderPopup";

//fake data
import fakeData from "../../data/orders";

export const AppContext = React.createContext();

export default function Home() {
  const [orderPopupTrigger, setOrderPopupTrigger] = useState(false);
  const [ordersData, setOrdersData] = useState();

  const fetechOrdersData = () => {
    //get data from http
    // ...
    //set Data
    setOrdersData(fakeData);
  };

  useEffect(() => {
    fetechOrdersData();
  }, []);

  return (
    <div className="container">
      <input id="sidebar-switch" type="checkbox" />
      <AppContext.Provider value={{ orders: ordersData }}>
        {/* <!-- control sidebar --> */}
        <Sidebar />
        {/* <!-- when menu open --> */}
        <Dashboard setOrderPopupTrigger={setOrderPopupTrigger} />
        <div className="sidebar-switch-panel"></div>
        <OrderPopup
          trigger={orderPopupTrigger}
          setOrderPopupTrigger={setOrderPopupTrigger}
        />
      </AppContext.Provider>
    </div>
  );
}
