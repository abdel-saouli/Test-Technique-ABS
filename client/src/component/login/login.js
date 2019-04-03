import React, { useState, useCallback } from "react";
import { NavLink, Redirect } from "react-router-dom";
import "./login.css";
// import logo from "./logo.svg";
import { loginAction } from "../../redux/actions/login.Action";
import { useDispatch, useMappedState } from "redux-react-hook";

// définit un useInput pérsonnalisé
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

// defiend validator of form
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

// définit le component Login
const Login = () => {
  const username = useInput("");
  const password = useInput("");
  const [submit, setSubmit] = useState(false);

  const Dispatch = useDispatch(); //remplace mapDispatchToProps()
  const { isLogin } = useMappedState(mapState);
  console.log("isLogin est : ", isLogin);

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
    console.log("ma response : ", user);
  }, [username.value, password.value]);

  return isLogin ? (
    <Redirect to="/product" />
  ) : (
    <>
      <div className="login">
        <div className="logItem">
          {/* <img src={logo} style={{ width: 250 }} alt="logo" /> */}
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

// export default Login;
export default Login;
