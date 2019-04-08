import React, { useState, useCallback } from "react";
import { NavLink, Redirect } from "react-router-dom";
import { useDispatch } from "redux-react-hook";
import { addUserAction } from "../../redux/actions/register.Action";
import { Input, Button } from "antd";
import "./register.css";
import PropTypes from "prop-types";

const useInput = initValue => {
  const [value, setValue] = useState(initValue);
  const [valid, setValid] = useState(false);
  const handelChange = event => {
    let { value } = event.target;
    setValue(value);
    setValid(
      !(
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      )
        ? true
        : false
    );
  };

  return {
    value,
    valid,
    handelChange,
    setValid,
    setValue
  };
};

const validForm = (arg = []) => {
  if (arg.length !== 0 && !arg.includes(false)) {
    return true;
  }
  return false;
};

const Register = () => {
  const firstName = useInput("");
  const lastName = useInput("");
  const username = useInput("");
  const password = useInput("");
  const [submit, setSubmit] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const Dispatch = useDispatch();

  const handleSubmit = useCallback(() => {
    setSubmit(true);

    if (
      !validForm([
        firstName.valid,
        lastName.valid,
        username.valid,
        password.valid
      ])
    ) {
      return;
    }
    let user = {
      firstName: firstName.value,
      lastName: lastName.value,
      username: username.value,
      password: password.value
    };

    try {
      Dispatch(addUserAction(user));
      setRedirect(true);
    } catch (e) {
      console.log({ error: e });
    }
  }, [firstName.value, lastName.value, username.value, password.value]);

  return redirect ? (
    <Redirect to="/login" />
  ) : (
    <div className="register">
      <h2>Register</h2>
      <form className="registerForm">
        <div className="registerItem">
          <label htmlFor="firstName">First Name</label>
          <Input
            type="text"
            className="registerItem"
            name="firstName"
            value={firstName.value}
            onChange={firstName.handelChange}
          />
          {submit && !firstName.valid && (
            <div className="registerItem" style={{ color: "red" }}>
              First Name is required
            </div>
          )}
        </div>
        <div className="registerItem">
          <label htmlFor="lastName">Last Name</label>
          <Input
            type="text"
            className="registerItem"
            name="lastName"
            value={lastName.value}
            onChange={lastName.handelChange}
          />
          {submit && !lastName.valid && (
            <div className="registerItem" style={{ color: "red" }}>
              Last Name is required
            </div>
          )}
        </div>
        <div className="registerItem">
          <label htmlFor="username">Username</label>
          <Input
            type="text"
            className="registerItem"
            name="username"
            value={username.value}
            onChange={username.handelChange}
          />
          {submit && !username.valid && (
            <div className="registerItem" style={{ color: "red" }}>
              Username is required
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <Input
            type="password"
            className="form-control"
            name="password"
            value={password.value}
            onChange={password.handelChange}
          />
          {submit && !password.valid && (
            <div className="help-block" style={{ color: "red" }}>
              Password is required
            </div>
          )}
        </div>
        <br />
        <div className="form-group">
          <Button
            type="submit"
            style={{ backgroundColor: "LightGrey" }}
            onClick={handleSubmit}
          >
            Register
          </Button>
        </div>
        <div className="form-group">
          <NavLink to="/login" style={{ float: "right" }}>
            Cancel
          </NavLink>
        </div>
      </form>
    </div>
  );
};

Register.propTypes = {
  addUserAction: PropTypes.func.isRequired
};

export default Register;
