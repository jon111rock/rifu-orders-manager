import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Dashboard from "../../components/Dashboard";
import OrderPopup from "../../components/OrderPopup";

import axios from "axios";

export const AppContext = React.createContext();

export default function Home() {
  const [orderPopupTrigger, setOrderPopupTrigger] = useState(false);
  const [ordersData, setOrdersData] = useState();
  const [currentSelectedOrder, setCurrentSelectedOrder] = useState();
  const [isUpdateExistOrder, setIsUpdateExistOrder] = useState(false);

  const fetechOrdersData = () => {
    axios.get("http://localhost:3500/api/order").then((res) => {
      setOrdersData(res.data.result);
    });
  };

  const getSelectedOrderIndex = (selectedIndex) => {
    //http request
    //...
    //get one order from db
    const selectedItem = ordersData.find((i) => i._id === selectedIndex);
    setCurrentSelectedOrder(selectedItem);
    setOrderPopupTrigger(true);
    setIsUpdateExistOrder(true);
  };

  useEffect(() => {
    fetechOrdersData();
  }, []);

  return (
    <>
      <AppContext.Provider value={{ orders: ordersData }}>
        {/* <!-- control sidebar --> */}
        {/* <!-- when menu open --> */}
        <Dashboard
          setOrderPopupTrigger={setOrderPopupTrigger}
          getSelectedOrderIndex={getSelectedOrderIndex}
        />
        <OrderPopup
          trigger={orderPopupTrigger}
          setOrderPopupTrigger={setOrderPopupTrigger}
          currentSelectedOrder={currentSelectedOrder}
          setCurrentSelectedOrder={setCurrentSelectedOrder}
          isUpdateExistOrder={isUpdateExistOrder}
          setIsUpdateExistOrder={setIsUpdateExistOrder}
          fetechOrdersData={fetechOrdersData}
        />
      </AppContext.Provider>
    </>
  );
}
