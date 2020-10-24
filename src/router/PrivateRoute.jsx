import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = useSelector((state) => state.token);
  const tokenDate = useSelector((state) => state.tokenDate);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  useEffect(() => {
    if (token) {
      const dateNow = new Date().getTime() / 1000;
      const resolutionTime = (dateNow - tokenDate) / 1000 / 60 / 60;
      if (resolutionTime >= 24) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    } else {
      setIsAuthenticated(false);
    }
    // eslint-disable-next-line
  }, []);

  if (isAuthenticated === null) {
    return <></>;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated ? <Redirect to='/login' /> : <Component {...props} />
      }
    />
  );
};

export default PrivateRoute;
