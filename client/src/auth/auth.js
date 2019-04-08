import axios from "axios";
import decode from "jwt-decode";

const AuthService = () => {
  const setToken = idToken => {
    localStorage.setItem("id_token", idToken);
  };

  const setAuthToken = token => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = token;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };

  const getToken = () => {
    return localStorage.getItem("id_token") || "";
  };

  const logout = () => {
    localStorage.removeItem("id_token");
  };

  const getProfile = () => {
    return getToken() !== "" ? decode(getToken()) : {};
  };

  return {
    setToken,
    getToken,
    getProfile,
    logout,
    setAuthToken
  };
};

export default AuthService();

// axios.interceptors.request.use(
//   reqConfig => {
//     reqConfig.headers.authorization = localStorage.getItem("id_token");

//     if (reqConfig.url.includes("/auth/logout"))
//       reqConfig.headers["X-REFRESH-TOKEN"] = localStorage.getItem(
//         "refresh_token"
//       );

//     return reqConfig;
//   },
//   err => Promise.reject(err)
// );
