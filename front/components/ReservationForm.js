import React from "react";
import { Button, DatePicker, Divider, Steps, TimePicker } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_POST_REQUEST, EDIT_POST_REQUEST, LOAD_POSTS_REQUEST } from "../reducers/post";
import PropTypes from "prop-types"




const ReservationForm = ({value, edit, reservationId}) => {
    const [date, setDate] = useState(value?.rsvDate);
    const {loadPostsDone, monthPosts, addPostDone, addPostLoading, editPostDone, editPostError, addPostError, editPostLoading} = useSelector((state) => state.post);
    const [loadPosts, setLoadPosts] = useState(false); 
    const [startTime, setStartTime] = useState(value?.startTime);
    const [endTime, setEndTime] = useState(value?.endTime);
    const [timeWarning, setTimeWarning] = useState(false);
    const [dateWarning, setDateWarning] = useState(false);
    const [passDate, setPassDate] = useState(false);
    const [checkDate, setCheckDate] = useState(false)
    const {me} = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        if(value&&value.rsvDate){
            dispatch({
                type: LOAD_POSTS_REQUEST,
                year: parseInt(value.rsvDate.slice(0, 4)),
                month: parseInt(value.rsvDate.slice(5, 7)),
            });
            setDateWarning(false);
            setCheckDate(false)
            setLoadPosts(true);
            setPassDate(true)
            setTimeWarning(false);
    
        }
        

    }, [value&&value.rsvDate])

    useEffect(() => {
        if(editPostError){
            alert(editPostError.message);
        }else if(addPostError){
            alert(addPostError.message);
        }
    }, [editPostError, addPostError])


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
        if(editPostDone){
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
            if(value.valueOf() < moment("00:00:00", "HH:mm:ss").valueOf()){
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
            const rsvDate = monthPosts.filter((it) => it.rsvDate === date);
            const firstTime = moment(`${date} ${time[0].format("HH")}:${time[0].format("mm")}`).valueOf();
            const secondTime = moment(`${date} ${time[1].format("HH")}:${time[1].format("mm")}`).valueOf();
            const checkFirstTime = rsvDate.find((it) => it.startTime < firstTime&&firstTime < it.endTime&&it.reservationId!==parseInt(reservationId));
            const checkSecondTime = rsvDate.find((it) => it.startTime < secondTime&&secondTime < it.endTime&&it.reservationId!==parseInt(reservationId));
            const formatTime = moment(time[0].valueOf()).format("HH:mm")
            const checkToday = moment(`${date} ${formatTime}`, "YYYY-MM-DD HH:mm").valueOf();
            if(checkToday < moment().valueOf()){
                alert("지난 시간에는 예약을 할 수 없습니다.");
                setTimeWarning(true);
            }else if(checkFirstTime||checkSecondTime){
                    setTimeWarning(true)
                    alert("다른 사람과 겹치는 시간에는 예약을 할 수 없습니다.")
                    
            }else if(time[0] >= time[1]){
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
                    reservationId: parseInt(reservationId),
                    data: {
                        rsvDate: date,
                        startTime: startTime,
                        endTime: endTime,
                    }
               })
            }else{
                dispatch({
                    type: ADD_POST_REQUEST,
                    data: {
                        rsvDate: date,
                        rsvMemberId: parseInt(me.id),
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
            {<Button onClick={clickReservation} loading={addPostLoading||editPostLoading}>예약</Button>}
            <Divider />
        </>

    );
};

ReservationForm.propTypes = {
    value: PropTypes.object,
    edit: PropTypes.bool,
    reservationId: PropTypes.string
}

export default ReservationForm