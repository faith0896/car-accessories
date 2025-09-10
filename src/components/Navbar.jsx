import { Link } from "react-router-dom";
import { useState } from "react";
import CartPage from "../pages/CartPage";
import { useCart } from "../context/CartContext"; 
import logo from "../Images/logo.jpg";

export default function Navbar({ onLoginClick, isLoggedIn, onLogoutClick }) {
  const [popupMessage, setPopupMessage] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  const { cartCount } = useCart();

  const handleProtectedClick = (e, page) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setPopupMessage(`Cannot access ${page.charAt(0).toUpperCase() + page.slice(1)} without signing in, please login.`);
    } else if (page === "cart") {
      e.preventDefault();
      setCartOpen(true);
    }
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className="navbar">
        <div className="left-section">
          <div className="logo-box">
            <img src={logo} alt="Logo" className="logo-img" />
          </div>
        </div>

        <Link to="/" className="site-name">Car Accessories</Link>

        <div className="right-links">
          <Link to="/shop" className="tooltip-container">
            Shop
            <span className="tooltip-text">Shop</span>
          </Link>

          <Link to="/cart" onClick={(e) => handleProtectedClick(e, "cart")} className="tooltip-container cart-link">
            Cart {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            <span className="tooltip-text">Cart</span>
          </Link>

          <Link to="/orders" onClick={(e) => handleProtectedClick(e, "orders")} className="tooltip-container">
            Orders
            <span className="tooltip-text">Orders</span>
          </Link>

          <div className="nav-divider"></div>

          {isLoggedIn ? (
            <span onClick={onLogoutClick} className="tooltip-container logout-link" style={{ cursor: "pointer" }}>
              Logout
              <span className="tooltip-text">Logout</span>
            </span>
          ) : (
            <span onClick={onLoginClick} className="tooltip-container login-link" style={{ cursor: "pointer" }}>
              Login
              <span className="tooltip-text">Login</span>
            </span>
          )}
        </div>
      </nav>

      {/* Bottom Black Bar */}
      <nav className="bottom-bar"></nav>

      {/* Cart Drawer */}
      <div className={`cart-drawer ${cartOpen ? "open" : ""}`}>
        <CartPage onClose={() => setCartOpen(false)} />
      </div>

      {/* Popup */}
      {popupMessage && (
        <div className="popup-overlay" onClick={() => setPopupMessage("")}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <p>{popupMessage}</p>
            <div className="popup-actions">
              <button className="close-btn" onClick={() => setPopupMessage("")}>Close</button>
              <button
                className="login-btn"
                onClick={() => {
                  setPopupMessage("");
                  onLoginClick();
                }}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        :root {
          --nav-height: 84px;
        }

        /* BODY PADDING */
        body {
          margin: 0;
          padding-top: var(--nav-height);
          padding-bottom: var(--nav-height);
        }

        /* TOP NAVBAR */
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: var(--nav-height);
          background: #000;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.35);
          z-index: 1000;
        }

        .left-section {
          display: flex;
          align-items: center;
        }

        .logo-box {
          width: 200px;
          height: auto;
          display: flex;
          align-items: center;
        }

        .logo-img {
          width: 100%;
          height: auto;
          object-fit: contain;
        }

        .site-name {
          font-size: 1.8rem;
          font-weight: bold;
          text-decoration: none;
          color: white;
          flex-grow: 1;
          text-align: center;
          user-select: none;
        }

        .right-links {
          display: flex;
          align-items: center;
          gap: 20px;
          font-size: 1rem;
          font-weight: 500;
        }

        .right-links a, .right-links span {
          color: white;
          text-decoration: none;
          cursor: pointer;
          position: relative;
          padding: 5px 8px;
          border-radius: 4px;
          transition: background-color 0.3s ease, color 0.3s ease;
          user-select: none;
        }

        .right-links a:hover, .right-links span:hover {
          background-color: #ffcc00;
          color: #000;
        }

        .cart-badge {
          background: red;
          color: white;
          font-size: 12px;
          font-weight: bold;
          border-radius: 50%;
          padding: 2px 6px;
          margin-left: 6px;
          vertical-align: top;
        }

        /* Tooltip */
        .tooltip-container {
          position: relative;
          display: inline-block;
        }
        .tooltip-text {
          visibility: hidden;
          opacity: 0;
          position: absolute;
          bottom: -28px;
          left: 50%;
          transform: translateX(-50%);
          background: #333;
          color: white;
          font-size: 0.8rem;
          padding: 4px 8px;
          border-radius: 6px;
          white-space: nowrap;
          transition: opacity 0.3s;
          pointer-events: none;
          user-select: none;
          z-index: 1500;
        }
        .tooltip-container:hover .tooltip-text {
          visibility: visible;
          opacity: 1;
        }

        /* Divider before login */
        .nav-divider {
          height: 28px;
          width: 1px;
          background: #555;
          margin: 0 12px;
        }

        /* CART DRAWER */
        .cart-drawer {
          position: fixed;
          top: 70px;
          right: -380px;
          width: 380px;
          height: calc(100% - 70px);
          background: white; 
          color: #333; 
          display: flex;
          flex-direction: column;
          padding: 20px;
          gap: 15px;
          transition: right 0.3s ease-in-out;
          z-index: 999;
          overflow-y: auto;
        }
        .cart-drawer.open {
          right: 0;
        }

        /* POPUP */
        .popup-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
        }
        .popup-box {
          background: white;
          padding: 20px;
          border-radius: 12px;
          max-width: 350px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        .popup-box p {
          margin-bottom: 16px;
          font-size: 1rem;
          color: #333;
        }
        .popup-actions {
          display: flex;
          justify-content: space-between;
          gap: 10px;
        }
        .close-btn, .login-btn {
          flex: 1;
          padding: 8px 12px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }
        .close-btn {
          background: #ccc;
          color: #222;
        }
        .close-btn:hover {
          background: #aaa;
        }
        .login-btn {
          background: #ffcc00;
          color: white;
        }
        .login-btn:hover {
          background: #dbb20a;
        }

        /* BOTTOM BLACK BAR */
        .bottom-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          height: var(--nav-height);
          background: #000;
          z-index: 1000;
          pointer-events: none; /* disable interaction */
          user-select: none;
        }
      `}</style>
    </>
  );
}
