import axios from "axios";
import Cookies from "js-cookie";
import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import { ADD_POST_FAILURE, ADD_POST_REQUEST, ADD_POST_SUCCESS, EDIT_POST_FAILURE, EDIT_POST_REQUEST, EDIT_POST_SUCCESS, LOAD_HOLIDAY_FAILURE, LOAD_HOLIDAY_REQUEST, LOAD_HOLIDAY_SUCCESS, LOAD_MY_POSTS_FAILURE, LOAD_MY_POSTS_REQUEST, LOAD_MY_POSTS_SUCCESS, LOAD_POSTS_FAILURE, LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, REMOVE_POST_FAILURE, REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS } from "../reducers/post";


function* watchLoadPosts () {
    yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
}

function* loadPosts(action) {
    try{
        const result = yield call(loadPostsAPI, action.year, action.month);
        yield put({
            type:LOAD_POSTS_SUCCESS,
            data: result.data === "" ? [] : result.data
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
    return axios.get(`/reservation?year=${year.toString()}&month=${month.toString()}`);
}


function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* addPost(action){
    try{
        yield call(addPostAPI, action.data);
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

function addPostAPI(data){
    return axios.post('/reservation', data, {
        headers: {
            'Authorization': `Bearer ${Cookies.get('jwtToken')}`
        },
        params: {}
    });
}


function* watchLoadHoliday(){
    yield takeLatest(LOAD_HOLIDAY_REQUEST, loadHoliday);
}

function* loadHoliday(action){
    try{
        const result = yield call(loadHolidayAPI, action.year, action.month);
        yield put({
            type: LOAD_HOLIDAY_SUCCESS,
            data: result.data === "" ? [] : result.data
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
    return axios.get(`/holiday?year=${year.toString()}&month=${month.toString()}`)
}


function* watchLoadMyPosts(){
    yield takeLatest(LOAD_MY_POSTS_REQUEST, loadMyPosts);
}

function* loadMyPosts(action){
    try{
        const result = yield call(loadMyPostsAPI, action.memberId);
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

function loadMyPostsAPI(memberId){
    return axios.get(`/reservation?memberId=${memberId}`, {}, {
        headers: {
            'Authorization': `Bearer ${Cookies.get('jwtToken')}`
        },
        params: {}
    });
}




function* watchEditPost(){
    yield takeLatest(EDIT_POST_REQUEST, editPost);
}

function* editPost(action){
    try{
       const result = yield call(editPostAPI, action.data, action.reservationId);

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

function editPostAPI(data, reservationId){
    return axios.put(`/reservation/${reservationId}`, data, {
        headers: {
            'Authorization': `Bearer ${Cookies.get('jwtToken')}`
        },
        params: {}
    });
}


function* watchRemovePost(){
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* removePost(action){
    try{
        yield call(removePostAPI, action.reservationId, action.rsvMemberId);
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

function removePostAPI(reservationId, rsvMemberId){
    return axios.delete(`/reservation/${reservationId.toString()}`,  {
        data: {rsvMemberId: parseInt(rsvMemberId)},
        headers: {
            'Authorization': `Bearer ${Cookies.get('jwtToken')}`
        },
        params: {}
    });
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