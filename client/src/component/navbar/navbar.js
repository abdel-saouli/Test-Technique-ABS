import React from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useMappedState } from "redux-react-hook";
import { logoutRequest } from "../../redux/actions/login.Action";

const mapState = state => {
  return {
    isLogin: state.loginRducer.isLogin
  };
};

const Navbar = () => {
  let { isLogin } = useMappedState(mapState);
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logoutRequest());
  };

  return (
    <div className="navbar">
      <NavLink className="navItem" to="/login">
        Login
      </NavLink>
      <NavLink className="navItem" to="/">
        Home
      </NavLink>
      <NavLink className="navItem" to="/product">
        product
      </NavLink>
      <NavLink className="navItem" to="/" onClick={logout}>
        Logout
      </NavLink>
    </div>
  );
};

export default Navbar;
