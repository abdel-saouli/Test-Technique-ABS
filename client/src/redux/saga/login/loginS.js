import { takeEvery, call, put } from "redux-saga/effects";
import Axios from "axios";
import { loginRequestSuccess } from "../../actions/login.Action";

function* loginRequest(action) {
  try {
    const res = yield call(Axios.post, "/login", action.data);
    yield put(loginRequestSuccess(res));
  } catch (e) {
    console.log("error d'authentication :", e);
  }
}

export function* watchLogin() {
  yield takeEvery("LOGIN_REQUEST", loginRequest);
}
