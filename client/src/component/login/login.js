import React, { useState, useCallback } from "react";
import { NavLink, Redirect } from "react-router-dom";
import "./login.css";
import { loginAction } from "../../redux/actions/login.Action";
import { useDispatch, useMappedState } from "redux-react-hook";

const useInput = initValue => {
  const [value, setValue] = useState(initValue);
  const [valid, setValid] = useState(false);
  const handelChange = event => {
    let { value } = event.target;
    setValue(value);
    setValid(value.length > 0 ? true : false);
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

  const onSubmit = useCallback(() => {
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
  }, [username.value, password.value]);

  return isLogin ? (
    <Redirect to="/product" />
  ) : (
    <>
      <div className="login">
        <div className="logItem" />

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
            name="password"
            placeholder="password"
            value={password.value}
            onChange={password.handelChange}
          />
          <div style={{ color: "red" }} hidden={!(!password.valid && submit)}>
            password is required
          </div>
        </div>

        <div className="logItem">
          <button style={{ backgroundColor: "LightGrey" }} onClick={onSubmit}>
            Submit
          </button>
          <br />
          <br />
          <NavLink to="forget">Forget Password</NavLink>
        </div>
      </div>
    </>
  );
};

export default Login;
