import React from "react";
import { Button, DatePicker, Divider, Steps, TimePicker } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_POST_REQUEST, EDIT_POST_REQUEST, LOAD_POSTS_REQUEST } from "../reducers/post";
import { dummyData } from "../utils/dummy";
import PropTypes from "prop-types"




const ReservationForm = ({value, edit, postId}) => {
    const [date, setDate] = useState(value?.day);
    const {loadPostsDone, monthPosts, addPostDone, addPostLoading} = useSelector((state) => state.post);
    const [loadPosts, setLoadPosts] = useState(false); 
    const [startTime, setStartTime] = useState(value?.startTime);
    const [endTime, setEndTime] = useState(value?.endTime);
    const [timeWarning, setTimeWarning] = useState(false);
    const [dateWarning, setDateWarning] = useState(false);
    const [passDate, setPassDate] = useState(false);
    const [checkDate, setCheckDate] = useState(false)
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        if(value&&value.day){
            dispatch({
                type: LOAD_POSTS_REQUEST,
                year: parseInt(value.day.slice(0, 4)),
                month: parseInt(value.day.slice(5, 7)),
                data: dummyData
            });
            setDateWarning(false);
            setCheckDate(false)
            setLoadPosts(true);
            setPassDate(true)
            setTimeWarning(false);
    
        }
        

    }, [value&&value.day])


    useEffect(() => {
        if(addPostDone){
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
                setStartTime(null);
                setEndTime(null);
                setCheckDate(true)
                setLoadPosts(true);
                setPassDate(true)

           }
        }
    }, []);

    const clickTime = useCallback((time) => {
        if(monthPosts&&time[0] !== null&&time[1] !== null){
            setCheckDate(false)
            const day = monthPosts.filter((it) => it.day === date);
            const firstTime = moment(`${date} ${time[0].format("HH")}:${time[0].format("mm")}`).valueOf();
            const secondTime = moment(`${date} ${time[1].format("HH")}:${time[1].format("mm")}`).valueOf();
            const checkFirstTime = day.find((it) => it.startTime < firstTime&&firstTime < it.endTime&&it.id!==parseInt(postId));
            const checkSecondTime = day.find((it) => it.startTime < secondTime&&secondTime < it.endTime&&it.id!==parseInt(postId));
            const formatTime = moment(time[0].valueOf()).format("HH:mm")
            const checkToday = moment(`${date} ${formatTime}`, "YYYY-MM-DD HH:mm").valueOf();
            if(checkToday < moment().valueOf()){
                alert("지난 시간에는 예약을 할 수 없습니다.");
                setTimeWarning(true);
            }else if(checkFirstTime||checkSecondTime){
                    setTimeWarning(true)
                    alert("다른 사람과 겹치는 시간에는 예약을 할 수 없습니다.")
                    
            }else if(time[0] > time[1]){
                alert("시간은 역전될수 없습니다.");
                setTimeWarning(true);
            }else{
                setTimeWarning(false);
                setStartTime(firstTime);
                setEndTime(secondTime);
                    

            }
            
            
        }
    }, [monthPosts, date]);

    const clickReservation = useCallback(() => {
        if(startTime&&endTime&&date){
            if(edit){
                dispatch({
                    type: EDIT_POST_REQUEST,
                    postId: postId,
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
               })
            }else{
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
            }
            
            router.replace({
                pathname: "/",
                query: {
                    year: parseInt(date.slice(0, 4)),
                    month: parseInt(date.slice(5, 7))
                }
            });
        }else{
            alert("날짜와 시간 설정을 해야합니다.")
        }
        
    }, [startTime, endTime, date]);
    

    return (
        <>
            <Steps direction="vertical">
                <Steps.Step  title="날짜를 지정해주세요" description={<DatePicker status={dateWarning&&"error"}  value={dateWarning||!passDate? null : moment(date, "YYYY-MM-DD")} onChange={clickDate}/>}/>
                <Steps.Step title="Step 2" description={loadPostsDone&&loadPosts&&passDate? <TimePicker.RangePicker status={timeWarning&&"error"} value={timeWarning||checkDate ? null : [moment(startTime), moment(endTime)]} onOk={clickTime} format={"HH:mm"} /> : "Step 1을 완료해주세요"} />
            </Steps>
            {<Button onClick={clickReservation} loading={addPostLoading}>예약</Button>}
            <Divider />
        </>

    );
};

ReservationForm.propTypes = {
    value: PropTypes.object.isRequired,
    edit: PropTypes.bool.isRequired,
    postId: PropTypes.string.isRequired
}

export default ReservationForm