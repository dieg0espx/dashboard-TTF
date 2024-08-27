import React, { createContext, useState, useEffect } from 'react';

// Create the context
const CustomersContext = createContext();

// Create the provider component
export const CustomersProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiURL = process.env.REACT_APP_PUBLIC_API_URL;

  useEffect(() => {
    // Fetch customers from an API or database
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiURL + '/getJobsites.php'); // Replace with your API endpoint
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);


  const getCustomerByCode = (code) => {
    return customers.find(customer => customer.code.toString() === code.toString());
  };

  return (
    <CustomersContext.Provider value={{ customers, loading, error, getCustomerByCode }}>
      {children}
    </CustomersContext.Provider>
  );
};

// Export the context to be used in other components
export const useCustomers = () => {
  return React.useContext(CustomersContext);
};
