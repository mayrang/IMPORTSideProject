import React, { useEffect } from "react";
import { cookieStringToObject } from "../utils/cookieString";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import { END } from "redux-saga";
import wrapper from "../store/configureStore";
import ReservationForm from "../components/ReservationForm";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";

const Reservation = () => {
    const {me} = useSelector((state) => state.user)
    const router = useRouter();
    useEffect(() => {
        if(!(me&&me.id)){
            alert("로그인한 사용자만 글을 작성할수있습니다.");
            router.replace("/login");
        }
    }, [me&&me.id]);
    return (
        <ReservationForm edit={false}/>
    )
};


export const getServerSideProps = wrapper.getServerSideProps((store) => async ({req}) => {
    const cookie = req ? req.headers.cookie : '';

    

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

export default Reservation

