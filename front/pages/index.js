import React from "react";
import moment from "moment"
import AppLayout from "../components/AppLayout";
import CalendarView from "../components/CalendarView";
import axios from "axios";
import wrapper from "../store/configureStore";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { END } from "redux-saga";
import {useSelector} from "react-redux";

axios.defaults.withCredentials = true;

//moment valueOf 안붙이면 moment객체로 가는데 그것도 miliseconds로 인식하는듯?

export const dummyData = [
    {
        day: "2022-08-12",
        id: 1,
        User: {
            id: 1,
            name: "박건상"
        },
        startTime: moment('2022-07-12 10:35').add(9, 'h').valueOf(),
        endTime: moment('2022-07-12 12:00').add(9, 'h').valueOf(),
    },
    {
        day: "2022-08-12",
        id: 2,
        User: {
            id: 1,
            name: "박건상"
        },
        startTime: moment('2022-07-12 13:30').add(9, 'h').valueOf(),
        endTime: moment('2022-07-12 15:00').add(9, 'h').valueOf(),

    },
    {
        day: "2022-08-12",
        id: 3,
        User: {
            id: 1,
            name: "박건상"
        },
        startTime: moment('2022-07-12 16:30').add(9, 'h').valueOf(),
        endTime: moment('2022-07-12 16:30').add(9, 'h').valueOf(),
    },
    {
        day: "2022-08-12",
        id: 4,
        User: {
            id: 1,
            name: "박건상"
        },
        startTime: moment('2022-07-12 19:30').add(9, 'h').valueOf(),
        endTime: moment('2022-07-12 20:30').add(9, 'h').valueOf(),

    },
    {
        day: "2022-08-24",
        id: 5,
        User: {
            id: 1,
            name: "박건상"
        },
        startTime: moment().add(9, 'h').valueOf(),
        endTime: moment().add(9, 'h').valueOf(),

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

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
    store.dispatch({
        type: LOAD_POSTS_REQUEST,
        year: parseInt(moment().add(9, 'h').format('YYYY')),
        month: parseInt(moment().add(9, 'h').format('MM')),
        data: dummyData,
    });
    store.dispatch(END);
    await store.sagaTask.toPromise();

});

export default Home;