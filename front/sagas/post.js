import axios from "axios";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";

import { ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS, EDIT_POST_FAILURE, EDIT_POST_REQUEST, EDIT_POST_SUCCESS, LOAD_HOLIDAY_FAILURE, LOAD_HOLIDAY_REQUEST, LOAD_HOLIDAY_SUCCESS, LOAD_MY_POSTS_FAILURE, LOAD_MY_POSTS_REQUEST, LOAD_MY_POSTS_SUCCESS, LOAD_POSTS_FAILURE, LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POST_FAILURE, LOAD_POST_REQUEST, LOAD_POST_SUCCESS, REMOVE_POST_FAILURE, REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS } from "../reducers/post";
import { getCookie } from "../utils/cookie";
function* watchLoadPosts () {
    yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}

function* loadPosts(action) {
    try{
        const result = yield call(loadPostsAPI, action.year, action.month, action.memberId);
        yield put({
            type:LOAD_POSTS_SUCCESS,
            data: result.data
        });
    }catch(err){
        console.error(err);
        yield put({
            type: LOAD_POSTS_FAILURE,
            error: err.response.data
        });
    }
}

function loadPostsAPI(year, month, memberId){
    return axios.get(`/reservation?year=${year.toString()}&month=${month.toString()}&memberId=${memberId.toString()}`);
}


function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* addPost(action){
    try{
        const token = getCookie('jwtToken')
        const result = yield call(addPostAPI, action.data, token);
        yield put({
            type: ADD_POST_SUCCESS,
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
        const result = yield call(loadHolidayAPI, action.year, action.month);
        yield put({
            type: LOAD_HOLIDAY_SUCCESS,
            data: result.data
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


function* watchLoadMyPosts(){
    yield takeLatest(LOAD_MY_POSTS_REQUEST, loadMyPosts);
}

function* loadMyPosts(action){
    try{
        const token = getCookie('jwtToken')
        const result = yield call(loadMyPostsAPI, token, action.memberId);
        yield put({
            type: LOAD_MY_POSTS_SUCCESS,
            data: result.data,
        });
    }catch(err){
        console.error(err);
        yield put({
            type: LOAD_MY_POSTS_FAILURE,
            error: err.response.data
        });
    }
}

function loadMyPostsAPI(token, memberId){
    return axios.get(`/reservation?memberId=${memberId}`, {}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }});
}




function* watchEditPost(){
    yield takeLatest(EDIT_POST_REQUEST, editPost);
}

function* editPost(action){
    try{
        const token = getCookie('jwtToken')
       const result = yield call(editPostAPI, action.data, action.reservationId, token);
        console.log(action.data, action.reservationId)
        yield put({
            type: EDIT_POST_SUCCESS,
            data: result.data
        })
    }catch(err){
        console.error(err);
        yield put({
            type: EDIT_POST_FAILURE,
            error: err.response.data
        })
    }
}

function editPostAPI(data, reservationId, token){
    return axios.put(`/reservation/edit/${reservationId}`, data, {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
}


function* watchRemovePost(){
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* removePost(action){
    try{
        const token = getCookie('jwtToken')
        const result = yield call(removePostAPI, action.reservationId, action.rsvMemberId, token);
        yield put({
            type: REMOVE_POST_SUCCESS,
        })
    }catch(err){
        console.error(err);
        yield put({
            type: REMOVE_POST_FAILURE,
            error: err.response.data
        })
    }
}

function removePostAPI(reservationId, rsvMemberId, token){
    return axios.delete(`/reservation/${reservationId.toString()}`, {rsvMemberId: rsvMemberId}, {
        headers: {
            'Authorization': `Bearer ${token}`
        }})
}

export default function* postSaga() {
    yield all([
        fork(watchLoadPosts),
        fork(watchAddPost),
        fork(watchLoadHoliday),
        fork(watchLoadMyPosts),
        fork(watchEditPost),
        fork(watchRemovePost),
    ])
}