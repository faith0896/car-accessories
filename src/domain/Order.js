export default class Order {
  constructor(orderId, orderDate, totalAmount, status, buyer, orderItems = [], payment = null) {
    this.orderId = orderId;          // Long
    this.orderDate = orderDate;      // Date
    this.totalAmount = totalAmount;  // double
    this.status = status;            // String
    this.buyer = buyer;              // Buyer object
    this.orderItems = orderItems;    // List<OrderItem>
    this.payment = payment;          // Payment object
  }
}
