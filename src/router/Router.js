import { BrowserRouter, Switch, Route } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
// Components
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import Home from "../components/Home/Home";
import PrivateRoute from "./PrivateRoute";
import loadingImage from "../assets/img/loading.gif";
/**
 * Raoutes of App
 */
const Routes = (props) => {
  return (
    <BrowserRouter>
      <Header />
      <div className='main-container'>
        {props.state.loading && (
          <div className='loading'>
            <div>
              <img src={loadingImage} alt='loading' />
            </div>
          </div>
        )}
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

const mapStateToProps = (state) => ({ state: state });

const connectedRoutes = connect(mapStateToProps)(Routes);

export default connectedRoutes;
