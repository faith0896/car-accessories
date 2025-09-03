import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getAllOrders } from "../services/Api.js";

export default function Orders() {
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const newOrder = location.state?.orderData;

    if (newOrder) {
      // Show newly placed order first
      setOrders([newOrder]);
      setLoading(false);
    } else {
      getAllOrders()
        .then((response) => {
          console.log("Orders from backend:", response.data);
          setOrders(response.data || []);
        })
        .catch((err) => {
          console.error("Error fetching orders:", err);
          setError("Failed to fetch orders.");
        })
        .finally(() => setLoading(false));
    }
  }, [location.state]);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;
  if (!orders.length) return <p>No orders found.</p>;

  const formatDate = (dateStr) => {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  return isNaN(date.getTime())
    ? dateStr // fallback: show raw string from backend
    : date.toLocaleString();
};

  return (
    <div className="orders-container">
      <h2 className="orders-title">Order History</h2>
      <div className="orders-grid">
        {orders.map((order) => (
          <div key={order.orderId} className="order-card">
            <p className="order-id"><strong>Order ID:</strong> {order.orderId}</p>
            <p className="order-status"><strong>Status:</strong> {order.status || "N/A"}</p>
            <p className="order-date"><strong>Order Date:</strong> {formatDate(order.orderDate)}</p>

            <div className="payment-info">
              <strong>Payment:</strong>{" "}
              {order.payment
                ? `${order.payment.amount || 0} (${order.payment.status?.toUpperCase() || "PAID"})`
                : "PAID"} {/* Default to PAID if missing */}
            </div>

            {order.orderItems?.length > 0 && (
              <div className="order-details">
                <p className="section-title">Items:</p>
                <ul className="order-items">
                  {order.orderItems.map((item, idx) => (
                    <li key={idx} className="order-item">
                      {item.product?.name || `Product #${item.product?.productId || "Unknown"}`} x{" "}
                      {item.quantity || 1}
                    </li>
                  ))}
                </ul>
              </div>
            ) }
          </div>
        ))}
      </div>

      <style>{`
        .orders-container { font-family: Arial; padding: 20px; background: #f5f5f5; min-height: 100vh; }
        .orders-title { text-align: center; margin-bottom: 20px; font-size: 1.8rem; font-weight: bold; }
        .orders-grid { display: grid; gap: 20px; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); }
        .order-card { background: #fff; border-radius: 12px; padding: 16px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); transition: transform 0.2s, box-shadow 0.2s; }
        .order-card:hover { transform: translateY(-3px); box-shadow: 0 6px 14px rgba(0,0,0,0.15); }
        .order-id { font-weight: 600; font-size: 1.1rem; }
        .order-date, .order-status { font-size: 0.9rem; color: #666; }
        .order-details { margin-top: 16px; padding-top: 12px; border-top: 1px solid #ddd; }
        .order-items { list-style: none; padding: 0; margin: 0; }
        .order-item { padding: 6px 0; border-bottom: 1px solid #eee; }
        .empty-text { color: #777; font-size: 0.9rem; }
        .payment-info { margin-top: 12px; font-size: 0.95rem; color: #333; }
      `}</style>
    </div>
  );
}
