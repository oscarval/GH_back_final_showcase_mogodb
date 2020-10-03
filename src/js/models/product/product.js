/*
* Product class
* Model of products
*/
export default class Product {
  id;
  name;
  price;
  quantity;

  constructor(id, name, price, quantity) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.quantity = quantity || 1;
  }
}
