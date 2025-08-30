export default class OrderItem {
  constructor(orderItemId, quantity, priceAtPurchase, order, product) {
    this.orderItemId = orderItemId;        // Long
    this.quantity = quantity;              // int
    this.priceAtPurchase = priceAtPurchase;// double
    this.order = order;                    // Order object
    this.product = product;                // Product object
  }
}
