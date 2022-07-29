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


//moment valueOf 안붙이면 moment객체로 가는데 그것도 miliseconds로 인식하는듯?

export const dummyData = [
   
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
        day: "2022-07-14",
        id: 4,
        User: {
            id: 1,
            name: "박건상"
        },
        startTime: moment('2022-07-12 19:30').valueOf(),
        endTime: moment('2022-07-12 20:30').valueOf(),

    },
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
        id: 3,
        User: {
            id: 1,
            name: "박건상"
        },
        startTime: moment('2022-07-12 16:30').valueOf(),
        endTime: moment('2022-07-12 17:30').valueOf(),
    },
    {
        day: "2022-07-29",
        id: 5,
        User: {
            id: 1,
            name: "박건상"
        },
        startTime: moment().valueOf(),
        endTime: moment().valueOf(),

    }
];


export const dummyHolidays = [
    {
        datekind: "01",
        dateName: "테스트1",
        isHoliday: "Y",
        locdate: 20220702,
        seq: 1
    },
    {
        datekind: "01",
        dateName: "테스트2",
        isHoliday: "Y",
        locdate: 20220712,
        seq: 1
    },
    {
        datekind: "01",
        dateName: "테스트3",
        isHoliday: "Y",
        locdate: 20220718,
        seq: 1
    },
    {
        datekind: "01",
        dateName: "테스트4",
        isHoliday: "Y",
        locdate: 20220729,
        seq: 1
    },
]

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
            type: LOAD_POSTS_REQUEST,
            year: parseInt(query.year),
            month: parseInt(query.month),
            data: dummyData,
        });
        store.dispatch({
            type: LOAD_HOLIDAY_REQUEST,
            year: parseInt(query.year),
            month: parseInt(query.month),
            data: dummyHolidays,
        });
    }else{
        store.dispatch({
            type: LOAD_POSTS_REQUEST,
            year: parseInt(moment().add(9, 'h').format('YYYY')),
            month: parseInt(moment().add(9, 'h').format('MM')),
            data: dummyData,
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
            data: cookieStringToObject(cookie)['jwtToken']
        });
    }
    
    store.dispatch(END);
    await store.sagaTask.toPromise();

});


export default Home;