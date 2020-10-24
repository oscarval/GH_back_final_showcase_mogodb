import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ApiRequest from "../../services/api/Api-request";
import "./Login.scss";
import Config from "../../services/config/config";
// bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Login = (props) => {
  // populate email with data of register
  useEffect(() => {
    if (props.state.Register && props.state.Register.data) {
      setValues({ ...values, email: props.state.Register.data.email });
    }
  }, []);

  const [validated, setValidated] = useState(false);
  // inputs login form
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const [values, setValues] = useState({
    email: props.state.username ? props.state.email : "",
    password: props.state.password ? props.state.password : "",
  });

  // navigate to home when login ok
  useEffect(() => {
    if (props.state.Login && props.state.Login !== -1) {
      if (props.state.Login.code === 0) {
        props.history.push("/home");
      } else {
        setValidated(false);
        alert(props.state.Login.message);
        props.clear();
      }
    }
  });

  const sendLogin = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      props.login(values);
    }
  };

  const goToRegister = (e) => {
    e.preventDefault();
    props.history.push("/register");
  };

  return (
    <div className='Login'>
      <div className='login-form'>
        <Form noValidate validated={validated} onSubmit={sendLogin}>
          <Form.Group controlId='email'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              name='email'
              value={values.email}
              onChange={handleChange}
              placeholder='Enter email'
              autoComplete='off'
              required
            />
            <Form.Control.Feedback type='invalid'>
              Please enter a valid
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              name='password'
              value={values.password}
              onChange={handleChange}
              placeholder='Enter password'
              autoComplete='off'
              required
              minLength='6'
            />
          </Form.Group>

          <Button variant='primary' type='submit'>
            Login
          </Button>
        </Form>
        <div className='register'>
          <span>No account yet? </span>
          <a href='.' onClick={goToRegister}>
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ state: state });

const mapDispacthToProps = (dispatch) => ({
  login: (userData) => {
    ApiRequest.Users.Login(userData)(dispatch);
  },
  clear: () => {
    ApiRequest.Clear(Config.ApiRequest.actionsTypes.LOGIN)(dispatch);
  },
});

const connectedLogin = connect(mapStateToProps, mapDispacthToProps)(Login);

export default connectedLogin;
