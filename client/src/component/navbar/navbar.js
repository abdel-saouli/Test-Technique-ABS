import React from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useMappedState } from "redux-react-hook";
import { logoutRequest } from "../../redux/actions/login.Action";
import PropTypes from "prop-types";

const mapState = state => {
  return {
    isLogin: state.loginRducer.isLogin,
    firstName: state.loginRducer.user.firstName
  };
};

const Navbar = () => {
  let { isLogin, firstName } = useMappedState(mapState);
  const Dispatch = useDispatch();
  const logout = () => {
    Dispatch(logoutRequest());
  };
  return (
    <div className="navbar">
      {!isLogin ? (
        <>
          <NavLink
            className="navItem"
            to="/login"
            activeStyle={{
              fontWeight: "bold",
              color: "bleu"
            }}
          >
            Login
          </NavLink>
          <NavLink className="navItem" to="/">
            Home
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            className="navItem"
            to="/register"
            activeStyle={{
              fontWeight: "bold",
              color: "bleu"
            }}
          >
            {firstName}
          </NavLink>
          <NavLink
            className="navItem"
            to="/product"
            activeStyle={{
              fontWeight: "bold",
              color: "bleu"
            }}
          >
            product
          </NavLink>
          <NavLink className="navItem" to="/" onClick={logout}>
            Logout
          </NavLink>
        </>
      )}
    </div>
  );
};

Navbar.propTypes = {
  logoutRequest: PropTypes.func,
  firstName: PropTypes.object,
  isLogin: PropTypes.bool
};

export default Navbar;
