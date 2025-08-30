export default class Buyer {
  constructor({ id, name, email, password, address, phoneNumber, role = "buyer", cart = [], orders = [], reviews = [] }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.role = role;
    this.cart = cart;
    this.orders = orders;
    this.reviews = reviews;
  }
}
