import React from "react";
import moment from "moment"
import AppLayout from "../components/AppLayout";
import CalendarView from "../components/CalendarView";
import wrapper from "../store/configureStore";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { END } from "redux-saga";
import {useSelector} from "react-redux";


//moment valueOf 안붙이면 moment객체로 가는데 그것도 miliseconds로 인식하는듯?

export const dummyData = [
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
];

const Home = () => {
    const {monthPosts} = useSelector((state) => state.post);
    
    return (
        <AppLayout>
            <CalendarView posts={monthPosts} />
        </AppLayout>
    )
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({query}) => {
    console.log(query.year, query.month)
    
    if(query.year&&query.month){
        if(!isNaN(query.year)||!isNaN(query.month)||query.month>0||query.month<13){
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
    }else{
        store.dispatch({
            type: LOAD_POSTS_REQUEST,
            year: parseInt(moment().add(9, 'h').format('YYYY')),
            month: parseInt(moment().add(9, 'h').format('MM')),
            data: dummyData,
        });
    }
    
    store.dispatch(END);
    await store.sagaTask.toPromise();

});

export default Home;