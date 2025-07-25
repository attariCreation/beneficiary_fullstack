import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [admin, setAdmin] = useState(null); // can store user object or just a boolean
  const [token, setToken] = useState(null);

  // useEffect(() => {
    
  //   const savedAdmin = JSON.parse(localStorage.getItem("admin"))
  //   const savedToken = localStorage.getItem("token") 

  //   if (savedAdmin && savedToken) {
  //     setAdmin(savedAdmin);
  //     setToken(savedToken);
  //   }
  // }, []);

  const login = (adminData, token) => {
    setAdmin(adminData);
    setToken(token);
    localStorage.setItem("admin", JSON.stringify(adminData));
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setAdmin(null);
    setToken(null);
    localStorage.removeItem("admin");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ admin, token, login, logout, isAuthenticated: !!admin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
