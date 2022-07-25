import produce from 'immer';
import moment from 'moment';

const initialState = {
    monthPosts : [],
    loadPostsLoading: false,
    loadPostsDone: false,
    loadPostsError: null,
};



export const LOAD_POSTS_REQUEST = "LOAD_POSTS_REQUEST";
export const LOAD_POSTS_SUCCESS = "LOAD_POSTS_SUCCESS";
export const LOAD_POSTS_FAILURE = "LOAD_POSTS_FAILURE";

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
            default:
                break;
        }
    });
};

export default reducer