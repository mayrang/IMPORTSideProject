import React, { useCallback, useEffect,  useState } from "react";
import AppLayout from '../components/AppLayout';
import { Button, DatePicker, Divider, Steps, TimePicker } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { ADD_POST_REQUEST, LOAD_POSTS_REQUEST } from "../reducers/post";
import { dummyData } from ".";
import moment from "moment";
import { useRouter } from "next/router";
import { cookieStringToObject } from "../utils/cookieString";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import { END } from "redux-saga";
import wrapper from "../store/configureStore";

const Reservation = () => {
    const [date, setDate] = useState("");
    const {loadPostsDone, monthPosts, addPostDone, addPostLoading} = useSelector((state) => state.post);
    const {me} = useSelector((state) => state.user)
    const [loadPosts, setLoadPosts] = useState(false); 
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    const [timeWarning, setTimeWarning] = useState(false);
    const [dateWarning, setDateWarning] = useState(false);
    const [current, setCurrent] = useState();
    const [passDate, setPassDate] = useState(false);
    const [checkDate, setCheckDate] = useState(false)
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        console.log(!me, !me.id)
        if(!(me&&me.id)){
            alert("로그인한 사용자만 글을 작성할수있습니다.");
            router.replace("/login");
        }
    }, [me]);

    useEffect(() => {
        if(loadPostsDone&&loadPosts){
            setCurrent(1);
        }
    }, [loadPostsDone, loadPosts]);

    useEffect(() => {
        if(addPostDone){
            console.log(parseInt(date.slice(0, 4)).toString(), parseInt(date.slice(5, 7)).toString())
            router.replace({
                pathname: '/',
                query: {
                    year: parseInt(date.slice(0, 4)).toString(),
                    month: parseInt(date.slice(5, 7)).toString(),
                }
            });
        }
    }, [addPostDone, date])


    const clickDate = useCallback((value, dateString) => {
        if(value){
            const checkValue = value.valueOf() + (1000 * 60 * 60 * 24);
            if(checkValue < moment().valueOf()){
                alert("지난 날짜에는 예약을 할 수 없습니다.")
                setDateWarning(true);
                setPassDate(true);
                setCurrent(0);
                setCheckDate(true);
                setLoadPosts(false);
           }else{
                dispatch({
                    type: LOAD_POSTS_REQUEST,
                    year: parseInt(value.format("YYYY")),
                    month: parseInt(value.format("MM")),
                    data: dummyData
                });
                setDateWarning(false);
                setDate(dateString);
                setCheckDate(true)
                setLoadPosts(true);
                setPassDate(true)
                setCurrent(1)
           }
        }
    }, []);

    const clickTime = useCallback((time) => {
        if(monthPosts&&time[1] !== null){
            setCheckDate(false)
            const day = monthPosts.filter((it) => it.day === date);
            const firstTime = moment(`${date} ${time[0].format("HH")}:${time[0].format("mm")}`).valueOf();
            const secondTime = moment(`${date} ${time[1].format("HH")}:${time[1].format("mm")}`).valueOf();
            const checkFirstTime = day.find((it) => it.startTime < firstTime&&firstTime < it.endTime);
            const checkSecondTime = day.find((it) => it.startTime < secondTime&&secondTime < it.endTime);
            const formatTime = moment(time[0].valueOf()).format("HH:mm")
            const checkToday = moment(`${date} ${formatTime}`, "YYYY-MM-DD HH:mm").valueOf();
            if(checkToday < moment().valueOf()){
                alert("지난 시간에는 예약을 할 수 없습니다.");
                setTimeWarning(true);
            }else{
                if(checkFirstTime||checkSecondTime){
                    setTimeWarning(true)
                    alert("다른 사람과 겹치는 시간에는 예약을 할 수 없습니다.")
                    
                }else{
   
                    setTimeWarning(false);
                    setStartTime(firstTime);
                    setEndTime(secondTime);
                    setCurrent(2);
                    
                }
            }
            
            
        }
    }, [monthPosts, date]);

    const clickReservation = useCallback(() => {
        dispatch({
            type: ADD_POST_REQUEST,
            data: {
                day: date,
                id: 4,
                User: {
                    id: 1,
                    name: "박건상"
                },
                startTime: startTime,
                endTime: endTime,
            }
        });
    }, [startTime, endTime, date]);
    

    return (
        <AppLayout> 
            <Steps direction="vertical" current={current}>
                <Steps.Step  title="날짜를 지정해주세요" description={<DatePicker status={dateWarning&&"error"}  value={dateWarning||!passDate? null : moment(date, "YYYY-MM-DD")} onChange={clickDate}/>}/>
                <Steps.Step title="Step 2" description={loadPostsDone&&loadPosts&&passDate? <TimePicker.RangePicker status={timeWarning&&"error"} value={timeWarning||checkDate ? null : [moment(startTime), moment(endTime)]} onOk={clickTime} format={"HH:mm"} /> : "Step 1을 완료해주세요"} />
            </Steps>
            {current===2&&<Button onClick={clickReservation} loading={addPostLoading}>예약</Button>}
            <Divider />
        </AppLayout>
    );
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

