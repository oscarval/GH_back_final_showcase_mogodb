const Utils = {
  responseOK(data, message) {
    return {
      code: 0,
      message: message ? message : "Successful",
      data: data,
    };
  },
  responseKO(error) {
    return {
      code: -1,
      message: error ? error : "There was a problem",
    };
  },
};

module.exports = Utils;
