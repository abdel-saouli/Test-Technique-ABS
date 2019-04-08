import { takeEvery, call, put } from "redux-saga/effects";
import Axios from "axios";
import { loginRequestSuccess } from "../../actions/login.Action";
import AuthService from "../../../auth/auth";

function* loginRequest(action) {
  try {
    const response = yield call(Axios.post, "/authenticate", action.data);

    if (response.data.token) {
      AuthService.setToken(response.data.token);
      // let tokentDecode = AuthService.getProfile(response.data.token);
      AuthService.setAuthToken(response.data.token);

      yield put(loginRequestSuccess(response));
    }
  } catch (e) {
    console.log("error d'authentication :", e);
  }
}

export function* watchLogin() {
  yield takeEvery("LOGIN_REQUEST", loginRequest);
}
