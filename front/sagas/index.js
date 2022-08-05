import axios from "axios";
import {fork, all} from "redux-saga/effects"
import postSaga from "./post";
import userSaga from "./user";

axios.defaults.baseURL = "http://localhost:3080";
axios.defaults.withCredentials = true;

export default function* rootSaga() {
    yield all([
        fork(userSaga),
        fork(postSaga),
    ])
}