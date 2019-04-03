import { all } from "redux-saga/effects";
import { watchLogin } from "./login/loginS";

export default function* rootSaga() {
  yield all([watchLogin()]);
}
