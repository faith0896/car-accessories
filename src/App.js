import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
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

  // 🔹 Switch Login → Register using custom event
  useEffect(() => {
    const handleOpenRegister = () => {
      setShowLogin(false);
      setShowRegister(true);
    };
    window.addEventListener("open-register", handleOpenRegister);
    return () => window.removeEventListener("open-register", handleOpenRegister);
  }, []);

  // 🔹 Switch Register → Login using custom event
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
      {/* Navbar with login trigger */}
      <Navbar
        isLoggedIn={!!user}
        onLoginClick={() => setShowLogin(true)}
        onLogoutClick={() => setUser(null)}
      />

      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Pages */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />

        {/* Admin protected */}
        <Route
          path="/admin"
          element={user?.role === "admin" ? <AdminDashboard /> : <Navigate to="/" />}
        />

        {/* Direct routes */}
        <Route
          path="/login"
          element={<Login onLogin={setUser} onClose={() => setShowLogin(false)} />}
        />
        <Route
          path="/register"
          element={<Register onClose={() => setShowRegister(false)} />}
        />

        {/* Payment protected */}
        <Route
          path="/payment"
          element={user ? <PaymentPage /> : <Navigate to="/login" />}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* 🔹 Popup Login */}
      {showLogin && (
        <Login
          onLogin={(loggedInUser) => {
            setUser(loggedInUser); // ✅ user info comes from backend login API
            setShowLogin(false);
          }}
          onClose={() => setShowLogin(false)}
        />
      )}

      {/* 🔹 Popup Register */}
      {showRegister && (
        <Register onClose={() => setShowRegister(false)} />
      )}
    </Router>
  );
}
