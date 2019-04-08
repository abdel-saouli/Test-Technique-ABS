import { all } from "redux-saga/effects";
import { watchLogin } from "./login/loginS";
import { watchProduct } from "./product/productS";
import { watchRegister } from "./register/registerS";

export default function* rootSaga() {
  yield all([watchLogin(), watchProduct(), watchRegister()]);
}
