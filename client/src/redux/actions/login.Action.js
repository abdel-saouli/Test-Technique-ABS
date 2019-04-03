export const loginAction = data => {
  return {
    type: "LOGIN_REQUEST",
    data
  };
};

export const loginRequestSuccess = data => {
  return {
    type: "LOGIN_REQUEST_SUCCESS",
    data
  };
};

export const logoutRequest = () => {
  return {
    type: "LOGOUT_REQUEST"
  };
};
