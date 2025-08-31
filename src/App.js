import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
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

  // Switch Login → Register
  useEffect(() => {
    const handleOpenRegister = () => {
      setShowLogin(false);
      setShowRegister(true);
    };
    window.addEventListener("open-register", handleOpenRegister);
    return () => window.removeEventListener("open-register", handleOpenRegister);
  }, []);

  // Switch Register → Login
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

        {/* Admin Dashboard: protected */}
        <Route
          path="/admin"
          element={
            user?.role?.toUpperCase() === "ADMIN"
              ? <AdminDashboard />
              : <Navigate to="/" />
          }
        />

        {/* Login and Register pages (optional routing) */}
        <Route
          path="/login"
          element={<Login onLogin={setUser} onClose={() => setShowLogin(false)} />}
        />
        <Route
          path="/register"
          element={<Register onClose={() => setShowRegister(false)} />}
        />

        {/* Payment Page: requires login */}
        <Route
          path="/payment"
          element={user ? <PaymentPage /> : <Navigate to="/login" />}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {/* Popup Login */}
      {showLogin && (
        <Login
          onLogin={(loggedInUser) => {
            setUser(loggedInUser);

            // Use navigate to redirect after login (replace window.location.href)
            if (loggedInUser.role?.toUpperCase() === "ADMIN") {
              window.history.pushState({}, "", "/admin");
              window.dispatchEvent(new PopStateEvent('popstate'));
            } else {
              window.history.pushState({}, "", "/");
              window.dispatchEvent(new PopStateEvent('popstate'));
            }

            setShowLogin(false);
          }}
          onClose={() => setShowLogin(false)}
        />
      )}

      {/* Popup Register */}
      {showRegister && (
        <Register onClose={() => setShowRegister(false)} />
      )}
    </Router>
  );
}
