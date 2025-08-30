import { Link } from "react-router-dom";
import { useState } from "react";
import CartPage from "../pages/CartPage";
import { useCart } from "../context/CartContext"; 
import { ShoppingBag, ShoppingCart, Package, LogIn } from "lucide-react";

export default function Navbar({ onLoginClick, isLoggedIn, onLogoutClick }) {
  const [menuOpen, setMenuOpen] = useState(false);
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
      <nav className="navbar">
        {/* Left Section */}
        <div className="left-section">
          <div className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="logo-box">
            <img src="/src/images/logo.png" alt="Logo" className="logo-img" />
          </div>
        </div>

        {/* Center: Site Name */}
        <Link to="/" className="site-name">Car Accessories</Link>

        {/* Right Section: Icons */}
        <div className="right-links">
          <Link to="/shop" className="tooltip-container">
            <ShoppingBag size={20} />
            <span className="tooltip-text">Shop</span>
          </Link>

          <Link to="/cart" onClick={(e) => handleProtectedClick(e, "cart")} className="tooltip-container cart-link">
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            <span className="tooltip-text">Cart</span>
          </Link>

          <Link to="/orders" onClick={(e) => handleProtectedClick(e, "orders")} className="tooltip-container">
            <Package size={20} />
            <span className="tooltip-text">Orders</span>
          </Link>

          <div className="nav-divider"></div>

          {isLoggedIn ? (
            <span onClick={onLogoutClick} className="tooltip-container">
              <LogIn size={20} style={{ transform: "rotate(180deg)" }} />
              <span className="tooltip-text">Logout</span>
            </span>
          ) : (
            <span onClick={onLoginClick} className="tooltip-container">
              <LogIn size={20} />
              <span className="tooltip-text">Login</span>
            </span>
          )}
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`sidebar ${menuOpen ? "active" : ""}`}>
        <h3>Quick Navigation</h3>
        <Link to="/shop/steering-wheel-cover" onClick={() => setMenuOpen(false)}>Battery Charging & Jump Starting</Link>
        <Link to="/shop/tyres" onClick={() => setMenuOpen(false)}>Tyres</Link>
        <Link to="/shop/rims" onClick={() => setMenuOpen(false)}>Rims</Link>
        <Link to="/shop/seat-covers" onClick={() => setMenuOpen(false)}>Seat Covers</Link>
        <Link to="/shop/oils" onClick={() => setMenuOpen(false)}>Oils</Link>
        <Link to="/shop/lights" onClick={() => setMenuOpen(false)}>Sound System</Link>
      </div>

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
        :root { --nav-height: 84px; }
        body { margin: 0; padding-top: var(--nav-height); }

        /* NAVBAR */
        .navbar {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: var(--nav-height);
          background: #222;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,.35);
          z-index: 1000;
        }

        .left-section { display: flex; align-items: center; gap: 16px; }
        .logo-box { width: 50px; height: 50px; }
        .logo-img { width: 100%; height: auto; object-fit: contain; }

        .site-name {
          font-size: 1.8rem;
          font-weight: bold;
          text-decoration: none;
          color: white;
          flex-grow: 1;
          text-align: center;
        }

        .right-links { 
          display: flex; 
          align-items: center;
          gap: 7px; /* ✅ more spacious */
        }
        .right-links a, .right-links span {
          position: relative;
          display: flex;
          align-items: center;
          color: white;
          text-decoration: none;
          font-size: 1rem;
          cursor: pointer;
          transition: color 0.3s ease;
        }
        .right-links a:hover, .right-links span:hover { color: #ffcc00; }

        /* ✅ Tooltip */
        .tooltip-container {
          position: relative;
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
        }
        .tooltip-container:hover .tooltip-text {
          visibility: visible;
          opacity: 1;
        }

        /* ✅ Divider before login */
        .nav-divider {
          height: 28px;
          width: 1px;
          background: #555;
          margin: 0 12px;
        }

        /* ✅ Cart Badge */
        .cart-badge {
          position: absolute;
          top: -6px;
          right: -12px;
          background: red;
          color: white;
          font-size: 10px;
          font-weight: bold;
          border-radius: 50%;
          padding: 2px 5px;
          min-width: 16px;
          text-align: center;
          line-height: 1.2;
        }

        /* HAMBURGER */
        .hamburger {
          display: flex;
          flex-direction: column;
          cursor: pointer;
          gap: 6px;
        }
        .hamburger span {
          height: 3px;
          width: 28px;
          background: white;
          border-radius: 3px;
          transition: 0.3s;
        }
        .hamburger.open span:nth-child(1) { transform: rotate(45deg) translateY(10px); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translateY(-10px); }

        /* SIDEBAR */
        .sidebar {
          position: fixed;
          top: 0;
          left: -560px;
          width: 250px;
          height: 100%;
          background: #333;
          color: white;
          display: flex;
          flex-direction: column;
          padding: 80px 20px 20px;
          gap: 15px;
          transition: left 0.3s ease-in-out;
          z-index: 999;
        }
        .sidebar.active { left: 0; }
        .sidebar h3 { margin-bottom: 10px; font-size: 1.2rem; border-bottom: 1px solid #555; padding-bottom: 8px; }
        .sidebar a { color: white; text-decoration: none; font-size: 1rem; padding: 8px 0; transition: color 0.3s ease; }
        .sidebar a:hover { color: #ffcc00; }

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
        .cart-drawer.open { right: 0; }

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
        .close-btn { background: #ccc; color: #222; }
        .close-btn:hover { background: #aaa; }
        .login-btn { background: #ffcc00; color: white; }
        .login-btn:hover { background: #dbb20a; }
      `}</style>
    </>
  );
}
