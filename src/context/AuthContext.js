import React, { createContext, useContext, useState } from 'react';

// Create our Auth Context
const AuthContext = createContext(null);

// This provider holds the token in state (in memory)
export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);

  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use Auth in any component
export function useAuth() {
  return useContext(AuthContext);
}
