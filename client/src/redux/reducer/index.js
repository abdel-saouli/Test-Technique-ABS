import { combineReducers } from "redux";
import { loginRducer } from "./login/loginR";
import { productRducer } from "./product/productR";

export const rootReducer = combineReducers({ loginRducer, productRducer });
