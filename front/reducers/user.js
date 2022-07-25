import produce from 'immer';

const initialState = {};


const reducer = (state=initialState, action) => {
    return produce(state, (draft) => {
        switch(action.type){
            default:
                break;
        }
    });
};

export default reducer