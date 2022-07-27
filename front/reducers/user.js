import produce from 'immer';
import moment from "moment";
const initialState = {
    me: {},
    signUpLoading: false,
    signUpDone: false,
    signUpError: null,
    logInLoading: false,
    logInDone: false,
    logInError: null,
    loadMyInfoLoading: false,
    loadMyInfoDone: false,
    loadMyInfoError: null,
    logOutLoading: false,
    logOutDone: false,
    logOutError: null,
};

export const dummyMyInfo = {
    id: 1,
    name: "박건상",
    Posts: [
        {
            day: "2022-07-12",
            id: 1,
            User: {
                id: 1,
                name: "박건상"
            },
            startTime: moment('2022-07-12 10:35').valueOf(),
            endTime: moment('2022-07-12 12:00').valueOf(),
        },
        {
            day: "2022-07-12",
            id: 2,
            User: {
                id: 1,
                name: "박건상"
            },
            startTime: moment('2022-07-12 13:30').valueOf(),
            endTime: moment('2022-07-12 15:00').valueOf(),
    
        },
        {
            day: "2022-07-12",
            id: 3,
            User: {
                id: 1,
                name: "박건상"
            },
            startTime: moment('2022-07-12 16:30').valueOf(),
            endTime: moment('2022-07-12 17:30').valueOf(),
        },
        {
            day: "2022-07-12",
            id: 4,
            User: {
                id: 1,
                name: "박건상"
            },
            startTime: moment('2022-07-12 19:30').valueOf(),
            endTime: moment('2022-07-12 20:30').valueOf(),
    
        },
        {
            day: "2022-07-24",
            id: 5,
            User: {
                id: 1,
                name: "박건상"
            },
            startTime: moment().valueOf(),
            endTime: moment().valueOf(),
    
        }
    ]
}


export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";
export const LOG_IN_REQUEST = "LOG_IN_REQUEST";
export const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
export const LOG_IN_FAILURE = "LOG_IN_FAILURE";
export const LOAD_MY_INFO_REQUEST = "LOAD_MY_INFO_REQUEST";
export const LOAD_MY_INFO_SUCCESS = "LOAD_MY_INFO_SUCCESS";
export const LOAD_MY_INFO_FAILURE = "LOAD_MY_INFO_FAILURE";
export const LOG_OUT_REQUEST = "LOG_OUT_REQUEST";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";
export const LOG_OUT_FAILURE = "LOG_OUT_FAILURE";




const reducer = (state=initialState, action) => {
    return produce(state, (draft) => {
        switch(action.type){
            case SIGN_UP_REQUEST:
                draft.signUpLoading = true;
                draft.signUpDone = false;
                draft.signUpError = null;
                break;
            case SIGN_UP_SUCCESS:
                draft.signUpDone = true;
                draft.signUpLoading = false;
                draft.me = action.data;
                break;
            case SIGN_UP_FAILURE:
                draft.signUpError = action.error;
                draft.signUpLoading = false;
                break;
            case LOG_IN_REQUEST:
                draft.logInLoading = true;
                draft.logInDone = false;
                draft.logInError = null;
                break;
            case LOG_IN_SUCCESS:
                draft.logInDone = true;
                draft.logInLoading = false;
                draft.me = action.data;
                break;
            case LOG_IN_FAILURE:
                draft.logInLoading = false;
                draft.logInError = action.error;
                break;
            case LOAD_MY_INFO_REQUEST:
                draft.loadMyInfoLoading = true;
                draft.loadMyInfoError = null;
                draft.loadMyInfoDone = false;
                break;
            case LOAD_MY_INFO_SUCCESS:
                draft.loadMyInfoDone = true;
                draft.loadMyInfoLoading = false;
                draft.me = action.data;
                break;
            case LOAD_MY_INFO_FAILURE:
                draft.loadMyInfoLoading = false;
                draft.loadMyInfoError = action.error;
                break;
            case LOG_OUT_REQUEST:
                draft.logOutLoading = true;
                draft.logOutDone = false;
                draft.logOutError = null;
                break;
            case LOG_OUT_SUCCESS:
                draft.logOutLoading = false;
                draft.logOutDone = true;
                break;
            case LOG_OUT_FAILURE:
                draft.logOutLoading = false;
                draft.logOutError = action.error;
                break;
            default:
                break;
        }
    });
};

export default reducer