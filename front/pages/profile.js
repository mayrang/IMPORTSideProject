import moment from "moment";
import React, { useEffect } from "react";
import { END } from "redux-saga";
import { dummyData, dummyHolidays, dummyMyInfo, dummyMyPosts } from "../utils/dummy";
import AppLayout from "../components/AppLayout";
import CalendarView from "../components/CalendarView";
import { LOAD_HOLIDAY_REQUEST, LOAD_MY_POSTS_REQUEST } from "../reducers/post";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import { cookieStringToObject } from "../utils/cookieString";
import wrapper from "../store/configureStore";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";


const Profile = () => {
    const {me} = useSelector((state) => state.user);
    const router = useRouter();
    const {monthPosts, holidays} = useSelector((state) => state.post);
    useEffect(() => {
        if(!me&&!me.id){
            alert("로그인한 사용자만 접속 가능합니다.")
            router.replace("/");
        }
    }, [me&&me.id]);
    useEffect(() => {
        console.log(monthPosts, holidays)
    }, [monthPosts, holidays])

    return (
        <AppLayout>
            <CalendarView  posts={monthPosts} holidays={holidays}/>
        </AppLayout>
    )
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({query, req}) => {
    const cookie = req ? req.headers.cookie : '';
    console.log(req&&cookieStringToObject(cookie)['jwtToken'])
    
    if(query.year&&query.month){
        console.log("match" , query.year.match(/^[0-9]+$/))
        if(query.year.match(/^[0-9]+$/) === null||query.month.match(/^[0-9]+$/) === null||parseInt(query.month)<0||parseInt(query.month)>13){
            return {
                redirect: {
                    permanent: false,
                    destination: "/",
                }
            }
        }
        store.dispatch({
            type: LOAD_MY_POSTS_REQUEST,
            year: parseInt(query.year),
            month: parseInt(query.month),
            data: dummyMyPosts,
        });
        store.dispatch({
            type: LOAD_HOLIDAY_REQUEST,
            year: parseInt(query.year),
            month: parseInt(query.month),
            data: dummyHolidays,
        });
    }else{
        store.dispatch({
            type:LOAD_MY_POSTS_REQUEST,
            year: parseInt(moment().add(9, 'h').format('YYYY')),
            month: parseInt(moment().add(9, 'h').format('MM')),
            data: dummyMyPosts,
        });
        store.dispatch({
            type: LOAD_HOLIDAY_REQUEST,
            year: parseInt(moment().add(9, 'h').format('YYYY')),
            month: parseInt(moment().add(9, 'h').format('MM')),
            data: dummyHolidays,
        });
    }
    if(req&&cookieStringToObject(cookie)['jwtToken']){
        store.dispatch({
            type: LOAD_MY_INFO_REQUEST,
        });
    }
    
    store.dispatch(END);
    await store.sagaTask.toPromise();

});


export default Profile;