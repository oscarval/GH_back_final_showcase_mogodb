import Config from "../config/config";
const initialErrorsState = [];

/**
 * Reducer Services
 * @param {*} state
 * @param {*} param1
 */
const reducer = (state = initialErrorsState, { type, payload }) => {
  switch (type) {
    case Config.ApiRequest.actionsTypes.UPDATE_CART:
      return {
        ...state,
        Cart: payload.response,
        loading: payload.response || payload.response === -1 ? false : true,
      };
    case Config.ApiRequest.actionsTypes.GET_ALL_CART:
      return {
        ...state,
        Cart: payload.response,
        loading: payload.response || payload.response === -1 ? false : true,
      };

    case Config.ApiRequest.actionsTypes.REGISTER:
      return {
        ...state,
        Register: payload.response,
        loading: payload.response || payload.response === -1 ? false : true,
      };
    case Config.ApiRequest.actionsTypes.LOGIN:
      return {
        ...state,
        Login: payload.response,
        loading: payload.response || payload.response === -1 ? false : true,
      };
    case Config.ApiRequest.actionsTypes.SET_TOKEN:
      return {
        ...state,
        token: payload.token,
        tokenDate: new Date().getTime() / 1000,
      };
    case Config.ApiRequest.actionsTypes.GET_ALL_PRODUCTS:
      return {
        ...state,
        Products: payload.response,
        loading: payload.response || payload.response === -1 ? false : true,
      };
    case Config.ApiRequest.actionsTypes.LOADING:
      return {
        ...state,
        loading: true,
      };
    case Config.ApiRequest.actionsTypes.LOGOUT:
      return {
        ...state,
        Logout: payload.response,
        loading: payload.response || payload.response === -1 ? false : true,
      };
    case Config.ApiRequest.actionsTypes.RESET:
      return {
        loading: false,
        token: null,
        tokenDate: 0,
      };
    default:
      return state;
  }
};

export default reducer;
