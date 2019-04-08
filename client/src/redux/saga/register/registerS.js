import { takeEvery, call } from "redux-saga/effects";
import Axios from "axios";
// import { addUserSuccess } from "../../actions/register.Action";

function* addUserRequest(action) {
  try {
    const res = yield call(Axios.post, `/users`, action.user);
    console.log("ma response : ", res);

    // yield put(addUserSuccess(res.data));
  } catch (error) {
    console.log("error : ", error);
  }
}

export function* watchRegister() {
  yield takeEvery("ADD_USER_REQUEST", addUserRequest);
}
