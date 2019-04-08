import { loginState } from "../../initState";
import AuthService from "../../../auth/auth";

export const loginRducer = (state = loginState, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST_SUCCESS":
      return {
        ...state,
        isLogin: true,
        token: action.data.data,
        user: AuthService.getProfile().user
      };
    case "LOGOUT_REQUEST":
      AuthService.logout();
      return loginState;

    default:
      return state;
  }
};
