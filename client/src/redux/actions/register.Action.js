export const addUserAction = user => {
  return {
    type: "ADD_USER_REQUEST",
    user
  };
};
export const addUserSuccess = user => {
  return {
    type: "ADD_USER_SUCCESS",
    user
  };
};
