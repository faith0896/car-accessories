export default class Reviews{

constructor(reviewId, rating, comment, reviewDate, product, buyer) {
    this.reviewId = reviewId;    // Long
    this.rating = rating;        // int
    this.comment = comment;      // String
    this.reviewDate = reviewDate;// LocalDate
    this.product = product;      // Product object
    this.buyer = buyer;          // Buyer object
  }
}