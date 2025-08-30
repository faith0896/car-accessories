import { createContext, useState, useContext, useEffect } from "react";
import { createCart, updateCartItem, deleteCartItem, getCart } from "../services/Api";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [lastOrder, setLastOrder] = useState(() => {
    try {
      const savedOrder = localStorage.getItem("lastOrder");
      return savedOrder ? JSON.parse(savedOrder) : null;
    } catch {
      return null;
    }
  });

  const userId = 1; 

  // Fetch cart from backend 
  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await getCart(userId);
        if (response.data) {
          setCartItems(response.data.cartItems);
          setCartId(response.data.cartId);
        }
      } catch (error) {
        console.error("Error fetching cart:", error.response?.data || error.message);
      }
    }
    fetchCart();
  }, []);

  
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    if (lastOrder) {
      localStorage.setItem("lastOrder", JSON.stringify(lastOrder));
    } else {
      localStorage.removeItem("lastOrder");
    }
  }, [lastOrder]);

  const keyOf = (p) => p.productId ?? p.id;

  // Add item to cart (and backend)
  const addToCart = async (product) => {
    const id = keyOf(product);
    const existing = cartItems.find((item) => keyOf(item) === id);

    if (existing) {
      updateQuantity(id, existing.quantity + 1);
      return;
    }

    
    const newItem = { ...product, quantity: 1 };
    setCartItems((prev) => [...prev, newItem]);

    // Send to backend
    try {
      if (cartId) {
        await createCart({ buyerId: userId, cartItems: [...cartItems, newItem] });
      }
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error.message);
    }
  };

  
  const removeFromCart = async (productId) => {
    const itemToRemove = cartItems.find((item) => keyOf(item) === productId);
    if (!itemToRemove) return;

    setCartItems((prev) => prev.filter((item) => keyOf(item) !== productId));

    try {
      if (cartId && itemToRemove.cartItemId) {
        await deleteCartItem(cartId, itemToRemove.cartItemId);
      }
    } catch (error) {
      console.error("Error removing cart item:", error.response?.data || error.message);
    }
  };

  // Update quantity (and backend)
  const updateQuantity = async (productId, quantity) => {
    const itemToUpdate = cartItems.find((item) => keyOf(item) === productId);
    if (!itemToUpdate) return;

    const updatedItems = cartItems.map((item) =>
      keyOf(item) === productId ? { ...item, quantity: Number(quantity) } : item
    );
    setCartItems(updatedItems);

    try {
      if (cartId && itemToUpdate.cartItemId) {
        await updateCartItem(cartId, itemToUpdate.cartItemId, { quantity: Number(quantity) });
      }
    } catch (error) {
      console.error("Error updating cart item:", error.response?.data || error.message);
    }
  };

  const clearCart = async () => {
    setCartItems([]);
    localStorage.removeItem("cart");

    if (cartId) {
      // optionally clear backend cart
      for (const item of cartItems) {
        if (item.cartItemId) {
          await deleteCartItem(cartId, item.cartItemId);
        }
      }
    }
  };

  const saveLastOrder = (order) => setLastOrder(order);
  const clearLastOrder = () => {
    setLastOrder(null);
    localStorage.removeItem("lastOrder");
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        lastOrder,
        saveLastOrder,
        clearLastOrder,
        cartId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}





