import produce from 'immer';
// import moment from 'moment';

const initialState = {
    profilePosts: [],
    holidays: [],
    monthPosts : [],
    singlePost : {},
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
    loadMyPostsLoading: false,
    loadMyPostsDone: false,
    loadMyPostsError: null, 
    editPostLoading: false,
    editPostDone: false,
    editPostError: null,
    removePostLoading: false,
    removePostDone: false,
    removePostError: null,
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
export const LOAD_MY_POSTS_REQUEST = "LOAD_MY_POSTS_REQUEST";
export const LOAD_MY_POSTS_SUCCESS = "LOAD_MY_POSTS_SUCCESS";
export const LOAD_MY_POSTS_FAILURE = "LOAD_MY_POSTS_FAILURE";
export const EDIT_POST_REQUEST = "EDIT_POST_REQUEST";
export const EDIT_POST_SUCCESS = "EDIT_POST_SUCCESS";
export const EDIT_POST_FAILURE = "EDIT_POST_FAILURE";
export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE"



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
            case LOAD_MY_POSTS_REQUEST:
                draft.loadMyPostsLoading = true;
                draft.loadMyPostsDone = false;
                draft.loadMyPostsError = null;
                break;
            case LOAD_MY_POSTS_SUCCESS:
                draft.loadMyPostsLoading = false;
                draft.loadMyPostsDone = true;
                draft.profilePosts = action.data;
                break;
            case LOAD_MY_POSTS_FAILURE:
                draft.loadMyPostsLoading = false;
                draft.loadMyPostsError = action.error;
                break;
            case EDIT_POST_REQUEST:
                draft.editPostLoading = true;
                draft.editPostDone = false;
                draft.editPostError = null;
                break;
            case EDIT_POST_SUCCESS:
                draft.editPostLoading = false;
                draft.editPostDone = true;
                break;
            case EDIT_POST_FAILURE:
                draft.editPostLoading = false;
                draft.editPostError = action.error;
                break; 
            case REMOVE_POST_REQUEST:
                draft.removePostLoading = true;
                draft.removePostDone = false;
                draft.removePostError = null;
                break;
            case REMOVE_POST_SUCCESS:
                draft.removePostLoading = false;
                draft.removePostDone = true;
                break;
            case REMOVE_POST_FAILURE:
                draft.removePostLoading = false;
                draft.removePostError = action.error;
                break;
            default:
                break;
        }
    });
};

export default reducer