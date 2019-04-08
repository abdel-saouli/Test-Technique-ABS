export const registerRducer = (state = { user: [] }, action) => {
  switch (action.type) {
    case "ADD_USER_SUCCESS":
      console.log("user ", action.user);

      return { user: [...state.user, ...action.user] };
    default:
      return state;
  }
};
