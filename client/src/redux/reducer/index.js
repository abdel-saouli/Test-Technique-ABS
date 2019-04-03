import { combineReducers } from "redux";
import { loginRducer } from "./login/loginR";

export const rootReducer = combineReducers({ loginRducer: loginRducer });
