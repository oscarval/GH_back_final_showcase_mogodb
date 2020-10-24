import { BrowserRouter, Switch, Route } from "react-router-dom";
import React from "react";
// Components
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Home from "../components/Home/Home";
import PrivateRoute from "./PrivateRoute";

/**
 * Raoutes of App
 */
const Routes = () => {
  return (
    <BrowserRouter>
      <Header />
      <div className='main-container'>
        <Switch>
          <Route path='/login' component={Login} exact />
          <Route path='/register' component={Register} exact />
          <PrivateRoute exact path='/home' component={Home} />
          <Route component={Login} />
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
};

export default Routes;
