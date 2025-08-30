// src/services/Api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/CarAccessories",
});

// ✅ Attach token (if exists) to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ================= AUTH =================

// Register user
export const registerUser = (userData) =>
  api.post("/auth/register", userData);

// Login user (returns token)
export const loginUser = (credentials) =>
  api.post("/auth/login", {
    username: credentials.username || credentials.email,
    password: credentials.password,
  });

export const getBuyerByEmail = (email) => api.get(`/buyer/read/${email}`);

// ✅ Fetch currently logged-in user from DB
export const getLoggedUser = () => api.get("/auth/me");

// ================= PRODUCT =================

// Fetch all products
export const getProducts = () => api.get("/product/all");

// ================= CART =================

// Create cart (checkout)
export const createCart = (cartData) =>
  api.post("/cart/checkout", cartData);

// Update quantity of a cart item
export const updateCartItem = (cartId, cartItemId, data) =>
  api.put(`/cart/${cartId}/items/${cartItemId}`, data);

// Delete one item from cart
export const deleteCartItem = (cartId, productId) =>
  api.delete(`/cart/${cartId}/items/${productId}`);

// Fetch buyer's cart
export const getCart = (buyerId) =>
  api.get(`/cart/by-buyer/${buyerId}`);

// ================= ORDER =================

// Fetch orders by buyerId (if backend supports it)
export const getOrdersByBuyerId = (buyerId) =>
  api.get(`/orders/buyer/${buyerId}`);

// Create order
export const createOrder = (orderData) =>
  api.post("/order/create", orderData);

// Fetch all orders
export const getAllOrders = () => api.get("/order/All");

// ✅ Fetch single order by orderId
export const getOrderById = (orderId) => api.get(`/order/${orderId}`);

// ================= PAYMENT =================

// Create payment
export const createPayment = (paymentData) =>
  api.post("/payment/create", paymentData);

export default api;
