import axios from "axios";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";

import { ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS, LOAD_HOLIDAY_FAILURE, LOAD_HOLIDAY_REQUEST, LOAD_HOLIDAY_SUCCESS, LOAD_POSTS_FAILURE, LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS } from "../reducers/post";
import { getCookie } from "../utils/cookie";

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


function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* addPost(action){
    try{
        //const token = getCookie('jwtToken')
        //const result = yield call(addPostAPI, action.data, token);
        yield put({
            type: ADD_POST_SUCCESS,
            data: action.data
        })
    }catch(err){
        console.error(err);
        yield put({
            type: ADD_POST_FAILURE,
            error: err.response.data,
        });
    }
}

function addPostAPI(data, token){
    return axios.post('/reservation', data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }});
}


function* watchLoadHoliday(){
    yield takeLatest(LOAD_HOLIDAY_REQUEST, loadHoliday);
}

function* loadHoliday(action){
    try{
        //const result = yield call(loadHolidayAPI, action.year, action.month);
        yield put({
            type: LOAD_HOLIDAY_SUCCESS,
            data: action.data
        });
    }catch(err){
        console.error(err);
        yield put({
            type: LOAD_HOLIDAY_FAILURE,
            error: err.response.data
        });
    }
}

function loadHolidayAPI(year, month){
    return axios.get(`/holiday?year=${year}&month=${month}`)
}

export default function* postSaga() {
    yield all([
        fork(watchLoadPosts),
        fork(watchAddPost),
        fork(watchLoadHoliday),
    ])
}