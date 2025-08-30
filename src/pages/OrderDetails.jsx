import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:8080/orders/${orderId}`)
      .then(res => {
        setOrder(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching order details:", err);
        setLoading(false);
      });
  }, [orderId]);

  if (loading) return <p>Loading order details...</p>;
  if (!order) return <p>Order not found.</p>;

  const {
    orderNumber,
    buyerId,
    orderDate,
    deliveryInfo,
    orderItems = [],
    payment,
    totalAmount,
    status
  } = order;

  return (
    <div className="order-details">
      <h2>Order #{orderNumber}</h2>
      <p><strong>Order Date:</strong> {new Date(orderDate).toLocaleString()}</p>
      <p><strong>Buyer ID:</strong> {buyerId}</p>
      <p><strong>Status:</strong> {status}</p>

      <div className="section">
        <h3>Delivery Information</h3>
        <p><strong>Name:</strong> {deliveryInfo.fullName}</p>
        <p><strong>Address:</strong> {deliveryInfo.address}, {deliveryInfo.city}, {deliveryInfo.postalCode}</p>
        <p><strong>Phone:</strong> {deliveryInfo.phone}</p>
      </div>

      <div className="section">
        <h3>Payment Information</h3>
        <p><strong>Method:</strong> {payment?.paymentMethod?.toUpperCase()}</p>
        <p><strong>Status:</strong> {payment?.status}</p>
        <p><strong>Amount:</strong> R{payment?.amount?.toFixed(2)}</p>
      </div>

      <div className="section">
        <h3>Order Items</h3>
        <div className="order-items">
          {orderItems.map(item => (
            <div key={item.orderItemId} className="order-item">
              <img src={item.product.image} alt={item.product.name} />
              <div>
                <p>{item.product.name} x {item.quantity}</p>
                <p>R{(item.priceAtPurchase * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p><strong>Total Amount:</strong> R{totalAmount.toFixed(2)}</p>
      <button onClick={() => navigate("/orders")} className="back-btn">Back to Orders</button>

      <style>{`
        .order-details { padding: 20px; font-family: sans-serif; background: #f5f5f5; }
        .section { background: #f1ededff; padding: 15px; margin: 15px 0; border-radius: 10px; }
        .order-items { display: flex; flex-direction: column; gap: 10px; }
        .order-item { display: flex; gap: 15px; align-items: center; background: #fff; padding: 10px; border-radius: 8px; box-shadow: 0 1px 5px rgba(0,0,0,0.1); }
        .order-item img { width: 70px; height: 70px; object-fit: cover; border-radius: 5px; }
        .order-item div { display: flex; flex-direction: column; }
        .back-btn { background: #ffd600; color: #fff; padding: 10px 20px; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; transition: background 0.3s; margin-top: 20px; }
        .back-btn:hover { background: #ffb300; }
      `}</style>
    </div>
  );
}
