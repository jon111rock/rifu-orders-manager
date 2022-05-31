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
  const [currentSelectedOrder, setCurrentSelectedOrder] = useState();
  const [isUpdateExistOrder, setIsUpdateExistOrder] = useState(false);

  const fetechOrdersData = () => {
    //get data from http
    // ...
    //set Data
    setOrdersData(fakeData);
  };

  const getSelectedOrderIndex = (selectedIndex) => {
    //http request
    //...
    //get one order from db
    const selectedItem = ordersData.find((i) => i.id === selectedIndex);

    setCurrentSelectedOrder(selectedItem);
    setOrderPopupTrigger(true);
    setIsUpdateExistOrder(true);
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
        <Dashboard
          setOrderPopupTrigger={setOrderPopupTrigger}
          getSelectedOrderIndex={getSelectedOrderIndex}
        />
        <div className="sidebar-switch-panel"></div>
        <OrderPopup
          trigger={orderPopupTrigger}
          setOrderPopupTrigger={setOrderPopupTrigger}
          currentSelectedOrder={currentSelectedOrder}
          setCurrentSelectedOrder={setCurrentSelectedOrder}
          isUpdateExistOrder={isUpdateExistOrder}
          setIsUpdateExistOrder={setIsUpdateExistOrder}
        />
      </AppContext.Provider>
    </div>
  );
}
