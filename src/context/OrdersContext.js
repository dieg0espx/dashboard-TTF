import React, { createContext, useState, useContext, useEffect } from 'react';

// Create OrdersContext
const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const apiURL = process.env.REACT_APP_PUBLIC_API_URL;
  const [orders, setOrders] = useState([]);
  const [ordersDates, setOrdersDates] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    // Update ordersDates whenever orders are updated
    if (orders.length > 0) {
      setOrdersDates(orders.map(order => order.theDate));
    }
  }, [orders]);

  const getOrders = () => {
    console.log('GETTING ORDERS....');

    fetch(apiURL + '/getAllTrucksGlobal.php')
      .then(response => response.json())
      .then(response => {
        setOrders(response); // Update orders state
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  // Provide state and functions
  return (
    <OrdersContext.Provider value={{ getOrders, orders, ordersDates }}>
      {children}
    </OrdersContext.Provider>
  );
};

// Custom Hook for using OrdersContext
export const useOrders = () => {
  return useContext(OrdersContext);
};
