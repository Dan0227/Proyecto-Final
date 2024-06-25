// src/context/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token'),
    id_rol: localStorage.getItem('id_rol'),
  });

  const login = (token, id_rol) => {
    localStorage.setItem('token', token);
    localStorage.setItem('id_rol', id_rol);
    setAuth({ token, id_rol });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id_rol');
    setAuth({ token: null, id_rol: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;