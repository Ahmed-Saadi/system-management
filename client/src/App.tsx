import React, { useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Login from "./pages/login";
import { Admin } from "./pages/Admin";
import { Client } from "./pages/client";
import { AuthProvider, useAuth } from "./auth/auth";
import ProtectedRoute from "./auth/protectedRoute";
import { Notfound } from "./pages/notfound";
import "./App.css";


const AppRoutes: React.FC = () => {

  

 

  return (
    <Routes>
       <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/user/*"
        element={<ProtectedRoute element={<Client />} role="user" />}
      />
      <Route
        path="/admin/*"
        element={<ProtectedRoute element={<Admin />} role="admin" />}
      />
      <Route path="/notfound" element={<Notfound />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;


