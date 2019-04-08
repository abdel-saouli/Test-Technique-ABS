import React, { useState, useCallback } from "react";
import { NavLink, Redirect } from "react-router-dom";
import "./login.css";
import { loginAction } from "../../redux/actions/login.Action";
import { useDispatch, useMappedState } from "redux-react-hook";
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

const mapState = state => {
  return {
    isLogin: state.loginRducer.isLogin
  };
};

const Login = () => {
  const username = useInput("");
  const password = useInput("");
  const [submit, setSubmit] = useState(false);

  const Dispatch = useDispatch();
  const { isLogin } = useMappedState(mapState);

  const onSubmit = useCallback(
    event => {
      event.preventDefault();
      setSubmit(true);

      if (!validForm([username.valid, password.valid])) {
        return;
      }
      let user = {
        username: username.value,
        password: password.value
      };

      try {
        Dispatch(loginAction(user));
      } catch (e) {
        console.log({ e });
      }
    },
    [username.value, password.value]
  );
  console.log(Login.children);

  return isLogin ? (
    <Redirect to="/product" />
  ) : (
    <>
      <form className="login" onSubmit={onSubmit}>
        <div className="logItem">
          <h2>Authenticate</h2>
        </div>

        <div className="logItem">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={username.value}
            onChange={username.handelChange}
          />
          <div style={{ color: "red" }} hidden={!(!username.valid && submit)}>
            username is required
          </div>
        </div>

        <div className="logItem">
          <label htmlFor="username">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password.value}
            onChange={password.handelChange}
          />
          <div style={{ color: "red" }} hidden={!(!password.valid && submit)}>
            password is required
          </div>
        </div>

        <div className="logItem">
          <button style={{ backgroundColor: "LightGrey" }} type="submit">
            Submit
          </button>
          <br />
          <br />
          <NavLink to="forget" style={{ float: "left" }}>
            Forget Password
          </NavLink>
          <NavLink to="/register" style={{ float: "right" }}>
            Reister
          </NavLink>
        </div>
      </form>
    </>
  );
};

Login.propTypes = {
  loginAction: PropTypes.func
};

export default Login;
