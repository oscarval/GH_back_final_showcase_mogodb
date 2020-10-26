import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import ApiRequest from "../../services/api/Api-request";
import Config from "../../services/config/config";
import "./Header.scss";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";

const Header = (props) => {
  // set and get state of logout
  const [login, setLogin] = useState(false);
  useEffect(() => {
    if (props.state.Login && props.state.Login !== -1) {
      if (props.state.Login.code === 0) {
        setLogin(true);
      }
    }
  });

  // logout
  const history = useHistory();
  useEffect(() => {
    if (props.state.Logout && props.state.Logout !== -1) {
      if (props.state.Logout.code === 0) {
        history.push("/login");
        props.reset();
      }
    }
  });

  const logout = () => {
    props.logout();
  };

  return (
    <div className='Header'>
      <header>
        <h3>Showcase of Products</h3>
        {login && (
          <div className='logout'>
            <Button variant='danger' onClick={() => logout()}>
              Logout
            </Button>
          </div>
        )}
      </header>
    </div>
  );
};

const mapStateToProps = (state) => ({ state: state });

const mapDispacthToProps = (dispatch) => ({
  logout: () => {
    ApiRequest.Users.Logout()(dispatch);
  },
  reset: () => {
    dispatch({
      type: Config.ApiRequest.actionsTypes.RESET,
      payload: null,
    });
  },
});

const connectedHeader = connect(mapStateToProps, mapDispacthToProps)(Header);

export default connectedHeader;
