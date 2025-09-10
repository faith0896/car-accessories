// src/App.js
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import ProductDetail from "./pages/ProductDetail.jsx";
import CartPage from "./pages/CartPage.jsx";
import Checkout from "./pages/Checkout.jsx";
import Orders from "./pages/Orders.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import PaymentPage from "./pages/PaymentPage.jsx";

export default function App() {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  // Listen for custom events to switch between Login and Register modals
  useEffect(() => {
    const handleOpenRegister = () => {
      setShowLogin(false);
      setShowRegister(true);
    };
    window.addEventListener("open-register", handleOpenRegister);
    return () => window.removeEventListener("open-register", handleOpenRegister);
  }, []);

  useEffect(() => {
    const handleOpenLogin = () => {
      setShowRegister(false);
      setShowLogin(true);
    };
    window.addEventListener("open-login", handleOpenLogin);
    return () => window.removeEventListener("open-login", handleOpenLogin);
  }, []);

  return (
    <Router>
      <Navbar
        isLoggedIn={!!user}
        onLoginClick={() => setShowLogin(true)}
        onLogoutClick={() => setUser(null)}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />

        {/* Protected Admin Dashboard */}
        <Route
          path="/admin"
          element={
            user?.role?.toUpperCase() === "ADMIN" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Login and Register Pages */}
        <Route
          path="/login"
          element={<Login onLogin={setUser} onClose={() => setShowLogin(false)} />}
        />
        <Route
          path="/register"
          element={<Register onClose={() => setShowRegister(false)} />}
        />

        {/* Payment requires login */}
        <Route
          path="/payment"
          element={user ? <PaymentPage /> : <Navigate to="/login" />}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Popup Login Modal */}
      {showLogin && (
        <Login
          onLogin={(loggedInUser) => {
            setUser(loggedInUser);

            // Redirect after login
            if (loggedInUser.role?.toUpperCase() === "ADMIN") {
              window.history.pushState({}, "", "/admin");
              window.dispatchEvent(new PopStateEvent("popstate"));
            } else {
              window.history.pushState({}, "", "/");
              window.dispatchEvent(new PopStateEvent("popstate"));
            }

            setShowLogin(false);
          }}
          onClose={() => setShowLogin(false)}
        />
      )}

      {/* Popup Register Modal */}
      {showRegister && <Register onClose={() => setShowRegister(false)} />}
    </Router>
  );
}
