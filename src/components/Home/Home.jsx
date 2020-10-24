import React, { useEffect } from "react";
import { connect } from "react-redux";
import ApiRequest from "../../services/api/Api-request";
import Utils from "../../Utils";
import "./Home.scss";
// bootstrap
import Button from "react-bootstrap/Button";

const Home = (props) => {
  // get all products and format
  useEffect(() => {
    props.getAllProducts();
  }, []);

  const products = props.state.Products;
  const productsAgroup = () => {
    let result = [];
    if (products && products.data) {
      result = products.data.reduce((acc, product, index) => {
        if (index % 5 === 0) {
          acc[acc.length] = [];
        } else {
          acc[acc.length - 1].push(product);
        }
        return acc;
      }, []);
    }
    return result;
  };

  // get shopping cart
  useEffect(() => {
    props.getProductsCart();
  }, []);
  const cart = props.state.Cart;
  const cartProducts = cart && cart.data ? cart.data.products : [];
  const addProduct = (product) => {
    const productIndex = cartProducts.findIndex(
      (item) => item._id === product._id
    );
    if (productIndex >= 0) {
      cartProducts[productIndex].quantity++;
    } else {
      cartProducts.push(product);
    }
    const newListProduct = cartProducts;
    const cartData = {
      userid: props.state.Login.data._id,
      products: newListProduct,
    };
    props.updateCart(cartData);
  };

  const deleteProduct = (id) => {
    let empty = false;
    const productIndex = cartProducts.findIndex((item) => item._id === id);
    if (productIndex >= 0 && cartProducts[productIndex].quantity > 1) {
      cartProducts[productIndex].quantity--;
    } else {
      if (cartProducts.length === 1) {
        empty = true;
      } else {
        delete cartProducts[productIndex];
      }
    }
    const newListProduct = empty ? [] : cartProducts;
    const cartData = {
      userid: props.state.Login.data._id,
      products: newListProduct,
    };
    props.updateCart(cartData);
  };

  return (
    <div className='Home'>
      <section className='showcase-container'>
        <div className='showcase-content'>
          <div className='showcase-header'>
            <h4>Arrastre los productos al carrito</h4>
          </div>
          <div className='showcase-grid'>
            <div className='showcase-grid-header'>
              Nuestra frutas y verduras
            </div>
            <div className='showcase-grid-content'>
              <div className='showcase-grid-content-wrapper'>
                {productsAgroup().map((productA, indexParent) => {
                  return (
                    <div className='showcase-row' key={"group" + indexParent}>
                      {productA.map((product, index) => {
                        return (
                          <div className='showcase-col' key={product.name}>
                            <CustomImg
                              src={product.img}
                              className='img-format'
                              alt={product.name}
                            />
                            <span className={product._id + "-price"}>
                              {Utils.formatCurrency(product.price)}
                            </span>
                            <Button
                              variant='success'
                              size='sm'
                              className='addbutton'
                              onClick={() => addProduct(product)}>
                              Add
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className='showcase-grid-footer'>Gracias por su compra</div>
          </div>
        </div>
      </section>

      <aside className='carlist-container'>
        <div className='carlist-content'>
          <div className='carlist-header'>
            <h4>Lista de la compra</h4>
          </div>
          <div className='carlist-car'>
            <div className='shopping-car-drop'>
              <CustomImg
                src='shopping-car.png'
                className='img-format'
                alt='Car'
              />
            </div>
            <div className='shopping-car-total'>
              <p>Total</p>
              <p className='total'>
                {Utils.formatCurrency(cart && cart.data ? cart.data.total : 0)}
              </p>
            </div>
          </div>
          <div className='carlist-products'>
            <div className='carlist-product-item'>
              <div className='product-name'>Fruta</div>
              <div className='product-"quantity"'>Cantidad</div>
              <div className='product-price'>Precio</div>
              <div className='product-delete'>Borrar</div>
            </div>
            {cartProducts &&
              cartProducts.map((product, index) => {
                return (
                  <div
                    id={"product-item-" + product.name}
                    className='carlist-product-item'
                    key={index + product._id}>
                    <div
                      className='product-name'
                      id={"product-name-" + product.name}>
                      {product.name}
                    </div>
                    <div
                      className='product-quantity'
                      id={"product-quantity-" + product.name}>
                      {product.quantity}
                    </div>
                    <div
                      className='product-price'
                      id={"product-price-" + product.name}>
                      {Utils.formatCurrency(product.price)}
                    </div>
                    <div className='product-delete'>
                      <Button
                        variant='warning'
                        size='sm'
                        className='addbutton'
                        onClick={() => deleteProduct(product._id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </aside>
    </div>
  );
};

class CustomImg extends React.Component {
  render() {
    let image_path = "";
    try {
      image_path = require("../../assets/img/" + this.props.src);
    } catch (err) {
      image_path = require("../../assets/img/default.jpg"); //set default image path
    }
    return (
      <img
        src={image_path}
        className={this.props.className}
        alt={this.props.alt}
      />
    );
  }
}

const mapStateToProps = (state) => ({ state: state });

const mapDispacthToProps = (dispatch) => ({
  getAllProducts: () => {
    ApiRequest.Products.GetAll()(dispatch);
  },
  getProductsCart: () => {
    ApiRequest.Cart.GetAll()(dispatch);
  },
  updateCart: (cartData) => {
    ApiRequest.Cart.UpdateCart(cartData)(dispatch);
  },
});

const connectedHome = connect(mapStateToProps, mapDispacthToProps)(Home);

export default connectedHome;
