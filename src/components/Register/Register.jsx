import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ApiRequest from "../../services/api/Api-request";
import Config from "../../services/config/config";
import "./Register.scss";
// bootstrap
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const Register = (props) => {
  // navigate to login when register ok
  useEffect(() => {
    if (props.state.Register && props.state.Register !== -1) {
      if (props.state.Register.code === 0) {
        props.history.push("/login");
      } else {
        setValidated(false);
        alert(props.state.Register.message);
        props.clear();
      }
    }
  });

  const [validated, setValidated] = useState(false);
  // inputs register form
  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const [values, setValues] = useState({
    name: props.state.name ? props.state.name : "",
    lastname: props.state.lastname ? props.state.lastname : "",
    email: props.state.username ? props.state.email : "",
    password: props.state.password ? props.state.password : "",
  });

  const sendLogin = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      setValidated(true);
      props.register(values);
    }
  };

  return (
    <div className='Login'>
      <div className='login-form'>
        <Form noValidate validated={validated} onSubmit={sendLogin}>
          <Form.Group controlId='name'>
            <Form.Label>Your name</Form.Label>
            <Form.Control
              type='text'
              name='name'
              value={values.name}
              onChange={handleChange}
              placeholder='Enter your name'
              autoComplete='off'
            />
          </Form.Group>

          <Form.Group controlId='lastname'>
            <Form.Label>Your Last Name</Form.Label>
            <Form.Control
              type='text'
              name='lastname'
              value={values.lastname}
              onChange={handleChange}
              placeholder='Enter your lastname'
              autoComplete='off'
            />
          </Form.Group>

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
            />
          </Form.Group>

          <Button variant='primary' type='submit'>
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ state: state });

const mapDispacthToProps = (dispatch) => ({
  register: (userData) => {
    ApiRequest.Users.Register(userData)(dispatch);
  },
  clear: () => {
    ApiRequest.Clear(Config.ApiRequest.actionsTypes.REGISTER)(dispatch);
  },
});

const connectedRegister = connect(
  mapStateToProps,
  mapDispacthToProps
)(Register);

export default connectedRegister;
