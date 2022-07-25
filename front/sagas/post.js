import axios from "axios";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { LOAD_POSTS_FAILURE, LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS } from "../reducers/post";

function* watchLoadPosts () {
    yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}

function* loadPosts(action) {
    try{
        //const result = yield call(loadPostsAPI, action.year, action.month);
        yield put({
            type:LOAD_POSTS_SUCCESS,
            data: action.data
        });
    }catch(err){
        console.error(err);
        yield put({
            type: LOAD_POSTS_FAILURE,
            error: err.response.data
        });
    }
}

function loadPostsAPI(year, month){
    return axios.get(`/reservation?year=${year.toString()}month=${month.toString()}`);
}


export default function* postSaga() {
    yield all([
        fork(watchLoadPosts)
    ])
}