/**
 * Config Object to ApiRequest
 * Configurations by request of api
 * Actions types
 * Request
 */
const Config = {
  ApiRequest: {
    request: {
      baseURL: "http://localhost:3002",
    },
    actionsTypes: {
      LOADING: "LOADING",
      REGISTER: "REGISTER",
      LOGIN: "LOGIN",
      LOGOUT: "LOGOUT",
      SET_TOKEN: "SET_TOKEN",
      GET_ALL_PRODUCTS: "GET_ALL_PRODUCTS",
      GET_ALL_CART: "GET_ALL_CART",
      UPDATE_CART: "UPDATE_CART",
      RESET: "RESET",
    },
  },
};

export default Config;
