import React from "react";
import moment from "moment"
import AppLayout from "../components/AppLayout";
import CalendarView from "../components/CalendarView";
import wrapper from "../store/configureStore";
import { LOAD_HOLIDAY_REQUEST, LOAD_POSTS_REQUEST } from "../reducers/post";
import { END } from "redux-saga";
import {useSelector} from "react-redux";
import { cookieStringToObject } from "../utils/cookieString";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import axios from "axios"

//moment valueOf 안붙이면 moment객체로 가는데 그것도 miliseconds로 인식하는듯?



const Home = () => {
    const {monthPosts, holidays} = useSelector((state) => state.post);

    return (
        <AppLayout>
            <CalendarView posts={monthPosts} holidays={holidays} />
 
        </AppLayout>
    )
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({query, req}) => {
    const cookie = req ? req.headers.cookie : '';
    
    if(query.year&&query.month){
        if(query.year.match(/^[0-9]+$/) === null||query.month.match(/^[0-9]+$/) === null||parseInt(query.month)<0||parseInt(query.month)>13){
            return {
                redirect: {
                    permanent: false,
                    destination: "/",
                }
            }
        }
        store.dispatch({
            type: LOAD_POSTS_REQUEST,
            year: parseInt(query.year),
            month: parseInt(query.month),
        });
        store.dispatch({
            type: LOAD_HOLIDAY_REQUEST,
            year: parseInt(query.year),
            month: parseInt(query.month),
        });
    }else{
        store.dispatch({
            type: LOAD_POSTS_REQUEST,
            year: parseInt(moment().add(9, 'h').format('YYYY')),
            month: parseInt(moment().add(9, 'h').format('MM')),
        });
        store.dispatch({
            type: LOAD_HOLIDAY_REQUEST,
            year: parseInt(moment().add(9, 'h').format('YYYY')),
            month: parseInt(moment().add(9, 'h').format('MM')),
        });
    }
    axios.defaults.headers.common['Authorization'] = "";
    if(req&&cookieStringToObject(cookie)['jwtToken']){
        axios.defaults.headers.common['Authorization'] = `Bearer ${cookieStringToObject(cookie)['jwtToken']}`;
        store.dispatch({
            type: LOAD_MY_INFO_REQUEST,

        });
    }
    
    store.dispatch(END);
    await store.sagaTask.toPromise();

});


export default Home;