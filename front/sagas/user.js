import axios from "axios";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import {LOAD_MY_INFO_FAILURE, LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOG_IN_FAILURE, LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS, SIGN_UP_FAILURE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS } from "../reducers/user";
import Cookies from "js-cookie";

function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST ,signUp);
}

function* signUp(action) {
    try{
        const result = yield call(signUpAPI, action.data);
        yield put({
            type: SIGN_UP_SUCCESS,
            data: result.data.myInfo
        });
        axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.jwtToken}`
        Cookies.set('jwtToken', result.data.jwtToken, {expires: 1/48})

    }catch(err){
        console.error(err);
        yield put({
            type: SIGN_UP_FAILURE,
            error: err.response.data,
        });
    }
}

function signUpAPI(data){
    return axios.post('/auth/signup', data)
}

function* watchLogIn(){
    yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* logIn(action){
    try{
        const result = yield call(logInAPI, action.data);
        yield put({
            type: LOG_IN_SUCCESS,
            data: result.data.myInfo,
        });
        axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.jwtToken}`
        Cookies.set('jwtToken', result.data.jwtToken, {expires: 1/48})
    }catch(err){
        console.error(err);
        yield put({
            type: LOG_IN_FAILURE,
            error: err.response.data,
        });
    }
}

function logInAPI(data){
    return axios.post("/auth/login", data)
}

function* watchLoadMyInfo(){
    yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyInfo);
}

function* loadMyInfo(){
    try{
        const result = yield call(loadMyInfoAPI);
        yield put({
            type: LOAD_MY_INFO_SUCCESS,
            data: result.data.myInfo,
        });
        axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.jwtToken}`||null;
        Cookies.set('jwtToken', result.data.jwtToken, {expires: 1/48})
    }catch(err){
        console.error(err);
        yield put({
            type: LOAD_MY_INFO_FAILURE,
            error: err.response.data,
        })
    }
}

function loadMyInfoAPI(){
    return axios.get('/auth/me');
}

function* watchLogOut(){
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}

function* logOut(){
    try{
        Cookies.remove('jwtToken')
        yield put({
            type: LOG_OUT_SUCCESS
        })
    }catch(err){
        console.error(err);
        yield put({
            type: LOG_OUT_FAILURE,
            error: err.response.data
        })
    }
}


export default function* userSaga() {
    yield all([
        fork(watchSignUp),
        fork(watchLogIn),
        fork(watchLoadMyInfo),
        fork(watchLogOut)
    ])
}