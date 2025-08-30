import { useCart } from "../context/CartContext.jsx";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {createCart} from "../services/Api.js";
import { useState } from "react";

export default function CartPage({ onClose }) {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const handleQuantityChange = (productId, quantity) => {
    let qty = parseInt(quantity, 10);
    if (isNaN(qty) || qty < 1) qty = 1;
    updateQuantity(productId, qty);
  };

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

   const handleCheckout = async () => {
  if (!cartItems.length) return;

  try {
    const cartPayload = {
      buyer: { userId: 1 }, 
      cartItems: cartItems.map(item => ({
        quantity: item.quantity,
        product: { productId: item.productId || item.id }
      }))
    };

    const response = await createCart(cartPayload); // this calls /cart/checkout
    console.log(" Cart saved:", response.data);

    localStorage.setItem("cart", JSON.stringify(cartItems));
    if (onClose) onClose();
    navigate("/payment", { state: { cartItems } });

  } catch (error) {
    console.error("Error saving cart:", error.response?.data || error.message);
    alert("Could not save cart. Please try again.");
  }
};

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Your Cart</h2>
        <button className="close-cart" onClick={onClose}>✖</button>
      </div>

      {cartItems.length === 0 ? (
        <p className="empty-cart">Your cart is empty.</p>
      ) : (
        <div className="cart-box">
          {cartItems.map((item) => (
            <div key={item.productId || item.id} className="cart-item-card">
              <div className="cart-item-left">
                <img src={item.imageURL || item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-info">
                  <h3>{item.name}</h3>
                  <p>R {item.price.toFixed(2)}</p>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    className="quantity-input"
                    onChange={(e) =>
                      handleQuantityChange(item.productId || item.id, e.target.value)
                    }
                  />
                  <p className="item-total">
                    R {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.productId || item.id)}
                title="Remove item"
              >
                <Trash2 size={20} />
              </button>
            </div>
          ))}

          <h2 className="cart-total">Total: R {cartTotal.toFixed(2)}</h2>

          <div className="checkout-section">
            <p className="delivery-info">
              Order will be delivered in 3-5 working days
            </p>
            <button className="checkout-btn" onClick={handleCheckout}>
              Checkout
            </button>
          </div>
        </div>
      )}

      <style>{`
        .cart-container { padding: 20px; }
        .cart-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; }
        .close-cart { background: none; border: none; font-size: 1.4rem; cursor: pointer; }
        .empty-cart { text-align: center; font-size: 18px; color: #555; }
        .cart-box { display: flex; flex-direction: column; gap: 15px; }
        .cart-item-card { display: flex; justify-content: space-between; align-items: center; border: 1px solid #ddd; padding: 15px; border-radius: 10px; background: #fff; }
        .cart-item-left { display: flex; align-items: center; gap: 15px; }
        .cart-item-image { width: 70px; height: 70px; object-fit: cover; border-radius: 8px; }
        .cart-item-info h3 { font-size: 16px; margin-bottom: 5px; }
        .quantity-input { width: 45px; border: 1px solid #ccc; border-radius: 5px; padding: 2px; margin: 5px 0; }
        .item-total { font-size: 14px; font-weight: bold; margin-top: 4px; }
        .remove-btn { background: transparent; border: none; cursor: pointer; color: #ff4444; }
        .remove-btn:hover { color: #cc0000; }
        .cart-total { text-align: right; font-size: 20px; font-weight: bold; margin-top: 15px; }
        .checkout-section { margin-top: 20px; text-align: center; }
        .checkout-btn { background: #ffd600; color: white; border: none; padding: 10px 20px; font-size: 16px; border-radius: 8px; cursor: pointer; }
        .checkout-btn:hover { background: #ffb300; }
      `}</style>
    </div>
  );
}
