import React, { useEffect } from "react";
import { cookieStringToObject } from "../utils/cookieString";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import { END } from "redux-saga";
import wrapper from "../store/configureStore";
import ReservationForm from "../components/ReservationForm";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

const Reservation = () => {
    const {me} = useSelector((state) => state.user)
    const router = useRouter();
    useEffect(() => {
        console.log(!me, !me.id)
        if(!(me&&me.id)){
            alert("로그인한 사용자만 글을 작성할수있습니다.");
            router.replace("/login");
        }
    }, [me&&me.id]);
    return (
        <ReservationForm value={{}}/>
    )
};


export const getServerSideProps = wrapper.getServerSideProps((store) => async ({req}) => {
    const cookie = req ? req.headers.cookie : '';
    console.log(req&&cookieStringToObject(cookie)['jwtToken'])
    

    if(req&&cookieStringToObject(cookie)['jwtToken']){
        store.dispatch({
            type: LOAD_MY_INFO_REQUEST,
            data: cookieStringToObject(cookie)['jwtToken']
        });
    }
    
    store.dispatch(END);
    await store.sagaTask.toPromise();

});

export default Reservation

