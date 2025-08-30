import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllOrders } from "../services/Api";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null); // ✅ Track which order is expanded
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await getAllOrders();
        console.log("Full response from backend:", res);

        let ordersData;

        // ✅ Handle JSON string responses
        if (typeof res.data === "string") {
          try {
            ordersData = JSON.parse(res.data);
          } catch (err) {
            console.error("Failed to parse orders JSON:", err);
            ordersData = [];
          }
        } else {
          ordersData = res.data;
        }

        // ✅ Normalize response
        if (!ordersData) {
          setOrders([]);
        } else if (Array.isArray(ordersData)) {
          setOrders(ordersData);
        } else {
          setOrders([ordersData]);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  if (loading) return <p>Loading orders...</p>;
  if (orders.length === 0) return <p>No orders found.</p>;

  return (
    <div className="orders">
      <h2>Order History</h2>
      {orders.map((order) => (
        <div
          key={order.orderId}
          style={{
            border: "1px solid #ccc",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "12px",
            background: "#fff",
          }}
        >
          <p>
            <strong>Order ID:</strong> {order.orderId}
          </p>
          <p>
            <strong>Order Date:</strong>{" "}
            {order.orderDate
              ? new Date(order.orderDate).toLocaleString()
              : "N/A"}
          </p>
          <p>
            <strong>Status:</strong> {order.status}
          </p>
          <p>
            <strong>Total:</strong> R{order.totalAmount}
          </p>
          <p>
            <strong>Buyer:</strong>{" "}
            {order.buyer
              ? `${order.buyer.firstName || ""} ${order.buyer.lastName || ""} (${
                  order.buyer.email || "No email"
                })`
              : "N/A"}
          </p>
          <p>
            <strong>Payment Method:</strong>{" "}
            {order.payment?.paymentMethod || "N/A"}
          </p>
          <p>
            <strong>Payment Status:</strong> {order.payment?.status || "N/A"}
          </p>

          {/* Expandable order items */}
          <button
            onClick={() => toggleOrderDetails(order.orderId)}
            className="toggle-btn"
          >
            {expandedOrderId === order.orderId ? "Hide Items" : "View Items"}
          </button>

          {expandedOrderId === order.orderId && (
            <div className="order-items">
              <h4>Items:</h4>
              {order.orderItems && order.orderItems.length > 0 ? (
                <ul>
                  {order.orderItems.map((item, index) => (
                    <li key={index}>
                      {item.product?.name || "Unknown Product"} — Qty: {item.quantity} — R
                      {(item.priceAtPurchase ?? item.product?.price ?? 0).toFixed(2)}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No items found for this order.</p>
              )}
            </div>
          )}

        </div>
      ))}

      <button onClick={() => navigate("/")} className="back-home-btn">
        Back to Home
      </button>

      <style>{`
        .orders {
          padding: 20px;
          font-family: Arial, sans-serif;
          background: #f5f5f5;
        }
        h2 {
          margin-bottom: 16px;
        }
        .toggle-btn {
          background: #ffd600;
          color: #fff;
          padding: 8px 16px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          margin-top: 10px;
        }
        .toggle-btn:hover {
          background: #ffb300;
        }
        .order-items {
          margin-top: 12px;
          padding: 10px;
          background: #f9f9f9;
          border-radius: 6px;
        }
        .order-items ul {
          list-style-type: none;
          padding: 0;
        }
        .order-items li {
          padding: 4px 0;
          border-bottom: 1px solid #ddd;
        }
        .back-home-btn {
          background: #ffd600;
          color: #fff;
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s;
          margin-top: 20px;
        }
        .back-home-btn:hover {
          background: #ffb300;
        }
      `}</style>
    </div>
  );
}



