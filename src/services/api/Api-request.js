import axios from "axios";
import Config from "../config/config";
import store from "../redux/store";

const TIMEOUT = 500;
/**
 * ApiRequest Services
 * Users functionality
 * Products funtionality
 */
const ApiRequest = {
  options: {
    headers: {
      "Content-Type": "application/json",
    },
  },
  Clear: (action) => {
    return async (dispatch) => {
      clearAction(action, dispatch);
    };
  },
  Users: {
    Register: (userData) => {
      return async (dispatch) => {
        setLoading(dispatch);
        try {
          const apiResponse = await axios
            .post(
              `${Config.ApiRequest.request.baseURL}/users/register`,
              userData
            )
            .then((res) => res.data);
          setTimeout(() => {
            dispatch({
              type: Config.ApiRequest.actionsTypes.REGISTER,
              payload: {
                response: apiResponse,
              },
            });
          }, TIMEOUT);
        } catch (err) {
          dispatch({
            type: Config.ApiRequest.actionsTypes.REGISTER,
            payload: { response: err },
          });
        }
      };
    },
    Login: (userData) => {
      return async (dispatch) => {
        setLoading(dispatch);
        try {
          const apiResponse = await axios
            .post(`${Config.ApiRequest.request.baseURL}/users/login`, userData)
            .then((res) => res.data);
          setTimeout(() => {
            dispatch({
              type: Config.ApiRequest.actionsTypes.LOGIN,
              payload: {
                response: apiResponse,
              },
            });
            if (apiResponse.code === 0) {
              setHeaders("access-token", apiResponse.token);
              setToken(apiResponse.token, dispatch);
            }
          }, TIMEOUT);
        } catch (err) {
          dispatch({
            type: Config.ApiRequest.actionsTypes.REGISTER,
            payload: { response: err },
          });
        }
      };
    },
  },
  Products: {
    GetAll: () => {
      return async (dispatch) => {
        setLoading(dispatch);
        try {
          const apiResponse = await axios
            .get(`${Config.ApiRequest.request.baseURL}/products`, getOptions())
            .then((res) => res.data);
          setTimeout(() => {
            dispatch({
              type: Config.ApiRequest.actionsTypes.GET_ALL_PRODUCTS,
              payload: {
                response: apiResponse,
              },
            });
          }, TIMEOUT);
        } catch (err) {
          dispatch({
            type: Config.ApiRequest.actionsTypes.GET_ALL_PRODUCTS,
            payload: { response: err },
          });
        }
      };
    },
  },
  Cart: {
    GetAll: () => {
      return async (dispatch) => {
        setLoading(dispatch);
        try {
          const apiResponse = await axios
            .get(`${Config.ApiRequest.request.baseURL}/cart`, getOptions())
            .then((res) => res.data);
          setTimeout(() => {
            dispatch({
              type: Config.ApiRequest.actionsTypes.GET_ALL_CART,
              payload: {
                response: apiResponse,
              },
            });
          }, TIMEOUT);
        } catch (err) {
          dispatch({
            type: Config.ApiRequest.actionsTypes.GET_ALL_CART,
            payload: { response: err },
          });
        }
      };
    },
    UpdateCart: (cartData) => {
      return async (dispatch) => {
        setLoading(dispatch);
        try {
          const apiResponse = await axios
            .put(
              `${Config.ApiRequest.request.baseURL}/cart/update`,
              cartData,
              getOptions()
            )
            .then((res) => res.data);
          setTimeout(() => {
            dispatch({
              type: Config.ApiRequest.actionsTypes.UPDATE_CART,
              payload: {
                response: apiResponse,
              },
            });
          }, TIMEOUT);
        } catch (err) {
          dispatch({
            type: Config.ApiRequest.actionsTypes.UPDATE_CART,
            payload: { response: err },
          });
        }
      };
    },
  },
};

const setHeaders = (key, value) => {
  ApiRequest.options.headers[key] = value;
};

const getOptions = () => {
  const state = store.getState();
  if (state && state.token) {
    setHeaders("access-token", state.token);
  }
  return ApiRequest.options;
};

const setLoading = (dispatch) => {
  dispatch({
    type: Config.ApiRequest.actionsTypes.LOADING,
    payload: null,
  });
};

const clearAction = (action, dispatch) => {
  dispatch({
    type: action,
    payload: {
      response: -1,
    },
  });
};

const setToken = (tokenText, dispatch) => {
  dispatch({
    type: Config.ApiRequest.actionsTypes.SET_TOKEN,
    payload: {
      token: tokenText,
    },
  });
};

export default ApiRequest;
