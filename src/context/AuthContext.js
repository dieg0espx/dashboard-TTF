import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);

  // Load token from sessionStorage on app start
  useEffect(() => {
    const storedToken = sessionStorage.getItem("google_access_token");
    if (storedToken) {
      setAccessToken(storedToken);
    }
  }, []);

  // Function to update token and store in session
  const updateAccessToken = (token) => {
    setAccessToken(token);
    sessionStorage.setItem("google_access_token", token);
  };

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken: updateAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
