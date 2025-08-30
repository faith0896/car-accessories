export default class User {
  constructor(userId, role, phoneNumber, name, email, password, address) {
    this.userId = userId;
    this.role = role;
    this.phoneNumber = phoneNumber;
    this.name = name;
    this.email = email;
    this.password = password;
    this.address = address;
  }
}
