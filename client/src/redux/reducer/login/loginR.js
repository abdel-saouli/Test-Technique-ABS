import { loginState } from "../../initState";

export const loginRducer = (state = loginState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST_SUCCESS":
      return {
        ...state,
        isLogin: true,
        user: action.data.data
      };
    case "LOGOUT_REQUEST":
      return loginState;

    default:
      return state;
  }
};
