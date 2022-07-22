import { HYDRATE } from "next-redux-wrapper";
import {combineReducers} from "redux";


const rootReducer = (state, aciton) => {
    switch(aciton.type){
        case HYDRATE:
            console.log('HYDRATE', aciton);
            return aciton.payload;
        default:{
           return state;
        }  
    }
};

export default rootReducer;