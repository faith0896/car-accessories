
export default class Product {

  constructor(productId, name, brand, size, material, price, stockQuantity, description, imageURL, reviews = []) {
this.productId = productId;          // Long
    this.name = name;                    // String
    this.brand = brand;                  // String
    this.size = size;                    // String
    this.material = material;            // String
    this.price = price;                  // double
    this.stockQuantity = stockQuantity;  // in t
    this.description = description;      // String
    this.imageURL = imageURL;            // String
    this.reviews = reviews;              // List<Review>
  }
}