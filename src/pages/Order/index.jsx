import React, { useState, useEffect } from "react";
import Dashboard from "../../components/Dashboard";
import OrderPopup from "../../components/OrderPopup";

import axios from "axios";

export const AppContext = React.createContext();

const baseUrl = process.env.REACT_APP_BASE_URL;

const Order = (props) => {
  const [orderPopupTrigger, setOrderPopupTrigger] = useState(false);
  const [ordersData, setOrdersData] = useState();
  const [currentSelectedOrder, setCurrentSelectedOrder] = useState();
  const [isUpdateExistOrder, setIsUpdateExistOrder] = useState(false);

  const fetechOrdersData = () => {
    axios.get(`${baseUrl}/api/order`).then((res) => {
      setOrdersData(res.data.result);
    });
  };

  const getSelectedOrderIndex = (selectedIndex) => {
    const selectedItem = ordersData.find((i) => i._id === selectedIndex);
    setCurrentSelectedOrder(selectedItem);
    setOrderPopupTrigger(true);
    setIsUpdateExistOrder(true);
  };

  useEffect(() => {
    fetechOrdersData();
  }, []);

  useEffect(() => {
    props.getIsOrderPopOpen(orderPopupTrigger);
  }, [orderPopupTrigger, props]);

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
};

export default Order;
