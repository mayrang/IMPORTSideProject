import produce from 'immer';
// import moment from 'moment';

const initialState = {
    holidays: [],
    monthPosts : [],
    testPost : {},
    loadPostsLoading: false,
    loadPostsDone: false,
    loadPostsError: null,
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,
    loadHolidayLoading: false,
    loadHolidayDone: false,
    loadHolidayError: null,
};



export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST";
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";
export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";
export const LOAD_HOLIDAY_REQUEST = "LOAD_HOLIDAY_REQUEST";
export const LOAD_HOLIDAY_SUCCESS = "LOAD_HOLIDAY_SUCCESS";
export const LOAD_HOLIDAY_FAILURE = "LOAD_HOLIDAY_FAILURE";



const reducer = (state=initialState, action) => {
    return produce(state, (draft) => {
        switch(action.type){
            case LOAD_POSTS_REQUEST:
                draft.loadPostsLoading = true;
                draft.loadPostsDone = false;
                draft.loadPostsError = null;
                break;
            case LOAD_POSTS_SUCCESS:
                draft.loadPostsDone = true;
                draft.loadPostsLoading = false;
                draft.monthPosts = action.data;
                break;
            case LOAD_POSTS_FAILURE:
                draft.loadPostsLoading = false;
                draft.loadPostsError = action.error;
                break;
            case ADD_POST_REQUEST:
                draft.addPostLoading = true;
                draft.addPostDone = false;
                draft.addPostError = null;
                break;
            case ADD_POST_SUCCESS:
                draft.addPostDone = true;
                draft.addPostLoading = false;
                draft.testPost = action.data;
                break;
            case ADD_POST_FAILURE:
                draft.addPostLoading = false;
                draft.addPostError = action.error;
                break;
            case LOAD_HOLIDAY_REQUEST:
                draft.loadHolidayLoading = true;
                draft.loadHolidayDone = false;
                draft.loadHolidayError = null;
                break;
            case LOAD_HOLIDAY_SUCCESS:
                draft.loadHolidayLoading = false;
                draft.loadHolidayDone = true;
                draft.holidays = action.data;
                break;
            case LOAD_HOLIDAY_FAILURE:
                draft.loadHolidayError = action.error;
                draft.loadHolidayLoading = false;
                break;
            default:
                break;
        }
    });
};

export default reducer