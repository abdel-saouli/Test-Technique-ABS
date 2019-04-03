import { takeEvery, call, put } from "redux-saga/effects";
import Axios from "axios";
import { loadProductSuccess } from "../../actions/product.action";

function* loadProductRequest(action) {
  try {
    const res = yield call(Axios.get, `products/${action.id}`);
    yield put(loadProductSuccess(res));
  } catch (error) {
    console.log("error : ", error);
  }
}

export function* watchProduct() {
  yield takeEvery("LOAD_PRODUCT_REQUEST", loadProductRequest);
}
