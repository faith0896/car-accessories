// src/services/Api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/CarAccessories",
});

// Checkout cart by cartId
export const checkoutCart = (cartId) => api.post(`/cart/checkout/${cartId}`);

// Attach token (if exists) to every request
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

// Fetch currently logged-in user from DB
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

// Create order
export const createOrder = (orderData) =>
  api.post("/order/create", orderData);

// Fetch orders by USER ID (backend uses "user")
export const getOrdersByUserId = (userId) =>
  api.get(`/order/user/${userId}`);

// Fetch all orders
export const getAllOrders = () => api.get("/order/all");

// Fetch single order by orderId
export const getOrderById = (orderId) =>
  api.get(`/order/read/${orderId}`);

//Create order items
export const createOrderItems = (orderItemData) =>
  api.post("/orderItem/create", orderItemData);

export const getOrderItemsByOrderId = (orderId) =>
  api.get(`/orderItem/order/${orderId}`);


export const getOrderHistory = (email) => {
  return axios.get(`http://localhost:8080/orders/history/${email}`);
};

// ================= PAYMENT =================

// Create payment
export const createPayment = (paymentData) =>
  api.post("/payment/create", paymentData);

// fetch payment by status
export const getPaymentByStatus = (status) => 
  api.get(`/payment/status/${status}`);

// Fetch payment by orderId
export const getPaymentByOrderId = (orderId) =>
  api.get(`/payment/order/${orderId}`);

export default api;
