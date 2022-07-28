import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {EllipsisOutlined} from "@ant-design/icons";
import styled from "styled-components";
import moment from "moment";
import {Button, Modal} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { dummyData } from "../pages";
import Router, { useRouter } from "next/router";



const CalendarWrapper = styled.div`
    max-width: 1300px;
    padding: 0 1.4rem;
    box-sizing: border-box;
    max-height: auto;
    margin-top: .4rem;

`

const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1rem .7rem;
    font-weight: bold;
    box-sizing: border-box;
    div {
        font-size: 16px;
    }
`   

const FloatButton = styled(Button)`
    float: right;
    box-shadow: 0 1px 2px 0;   
    width: 20%;
    min-width: 100px;
    max-width: 150px;
    height: 40px;
    margin-top: .7rem;
    margin-right: .7rem;
    border: none;
    border-radius: 20px;
    font-weight: bold;
    font-size: 0.7em;
    cursor: pointer;
    outline: none;
`





const ScheduleDiv = styled.div`
    min-height: 10px;
    background-color: #112667;
    height: 20%;
    max-width: 100%;
    
    color: #fff;
    padding: 1px;
    margin-top: .1rem;
    font-size: .5em;
    cursor: pointer;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
`

function msToTime(duration) {
    const localeDuration = duration + (1000 * 60 * 60 * 9)
    let second = Math.floor(localeDuration/ 1000);
    let minute = Math.floor(second / 60);
    let hour = Math.floor(minute /60) ;

    second = second % 60;
    minute = minute % 60;
    hour = hour % 24
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
  }


const calendarArray = (year, month, posts, holidays) => {
    let newMonth = [];
    const firstDay = new Date(year, month - 1, 1).getDay();
    const lastDay = new Date(year, month, 0).getDate();
    let count = 1;
    for(let i = 0; i < 6; i++){
        var week = [];
        for(let j = 0; j < 7; j++){
            if(count > lastDay){
                week.push({day: "", posts: []});
            }else if(firstDay > j && i === 0){
                week.push({day: "", posts: []});
            }else{
                const yearMonthDayPosts = year 
                                    + "-" + (month < 10 ? "0" + (month) : month) 
                                    + "-" + (count < 10 ? "0" + count : count);
                const yearMonthDayHolidays = year
                                        + (month < 10 ? "0" + (month) : month)
                                        + (count < 10 ? "0" + count : count);
                const findHoliday = holidays.find((it) => it.locdate.toString() === yearMonthDayHolidays)
                let findPosts = posts.filter((it) => it.day === yearMonthDayPosts);
                findPosts.sort((a, b) => a.startTime - b.startTime);
                if(findPosts){
                    if(findHoliday){
                        week.push({day: count.toString(), posts: findPosts, holidays: findHoliday});
                    }else{
                        week.push({day: count.toString(), posts: findPosts, holidays: {}});
                    }
                    
                }else{
                    if(findHoliday){
                        week.push({day: count.toString(), posts: [], holidays: findHoliday});
                    }else{
                        week.push({day: count.toString(), posts: [], holidays: {}});
                    }
                }
                count++; 
            }
        }
        newMonth.push(week);
    }
    console.log(newMonth)
    return newMonth;
}

 

const CalendarView = ({posts, holidays}) => {
    const [modalPosts, setModalPosts] = useState([]);
    const [visible, setVisible] = useState(false);
    const router = useRouter();
    const {year, month} = router.query
    const [modalDay, setModalDay] = useState("");
    const dispatch = useDispatch();
    const {me} = useSelector((state) => state.user)
    const calendarYear = year||parseInt(moment().format('YYYY'));
    const calendarMonth = month||parseInt(moment().format('MM'));
    const checkToday = moment(`${year}, ${month}`, 'YYYYMMDDHHmmss').format("YYYY-MM")


    useEffect(() => {
        console.log(calendarYear, calendarMonth)
        dispatch({
            type: LOAD_POSTS_REQUEST,
            year: year,
            month: month,
            data: dummyData,
        });
        
    }, [calendarYear, calendarMonth])



    const clickNext = useCallback(() => {
        if(parseInt(month) === 12){
            router.push({
                pathname: '/',
                query: {
                    year: (parseInt(calendarYear)+1).toString(),
                    month: "1"
                }
            })
        }else{
            console.log(123)
            router.push({
                pathname: '/',
                query: {
                    year: calendarYear.toString(),
                    month: (parseInt(calendarMonth)+1).toString()
                }
            })
        }
    }, [month]);

    const clickPrev = useCallback(() => {
        if(parseInt(month) === 1){
            router.push({
                pathname: '/',
                query: {
                    year: (parseInt(calendarYear)-1).toString(),
                    month: "12"
                }
            })
        }else{
            router.push({
                pathname: '/',
                query: {
                    year: calendarYear.toString(),
                    month: (parseInt(calendarMonth)-1).toString()
                }
            })
        }
    }, [month]);

    const clickModal = useCallback((posts, day) => {
        setModalPosts(posts);
        setVisible(true);
        setModalDay(day);
    }, []);

    const cancelModal = useCallback(() => {
        setVisible(false);
    }, []);

    const clickReservation = useCallback(() => {
        Router.push('/reservation')
    }, []);

    return (
        <>
        <Modal visible={visible} onCancel={cancelModal} title={modalDay + "일"}>
            {modalPosts.length > 0 ?
            modalPosts.map((post) => <p key={post.id}>{post.User.name} {msToTime(post.startTime)} ~ {msToTime(post.endTime)}</p>) : 
            <p>예약된 시간이 없습니다.</p>}
        </Modal>
        <CalendarWrapper>
            <HeaderWrapper>
                <Button onClick={clickPrev}><div>{"<"} 이전 달</div></Button>
                <div>{calendarYear}년 {calendarMonth}월</div>
                <Button onClick={clickNext}><div>다음 달 {">"}</div></Button>

            </HeaderWrapper>
            <div className="grid dayHeader">
                <div>SUN</div>
                <div>MON</div>
                <div>TUE</div>
                <div>WED</div>
                <div>THU</div>
                <div>FRI</div>
                <div>SAT</div>
            </div>
            {calendarArray(calendarYear, calendarMonth, posts, holidays).map((week, idx) => (
                <div key={`week${idx}`} className="grid dayBody">
                    {week.map((day, idx) => (
                        <div key={`day${idx}`}>
                            {idx===0||day.holidays?.dateName? 
                            <div style={{color:"red"}} className="dayDate"><p style={moment().format('YYYY-MM-DD')===(checkToday+"-"+(parseInt(day.day) < 10 ? "0" + day.day : day.day))?{margin: "1px", color:"white", backgroundColor:"red", display: "inline-block", textAlign:"center", padding:".1em"}:{margin: "1px", color:"red", display:"inline-block"}}>{day.day}</p>  {day.holidays?.dateName}</div>
                            : 
                            <div className="dayDate"><p style={moment().format('YYYY-MM-DD')===(checkToday+"-"+(parseInt(day.day) < 10 ? "0" + day.day : day.day))?{margin: "1px", color:"white", backgroundColor:"black", display: "inline-block", textAlign:"center", padding:".1em"}:{margin: "1px", color:"black", display:"inline-block"}}>{day.day}</p></div>}
                            {day.posts.length<4 ?
                            day.posts.map((post) => (
                                <ScheduleDiv key={post.id} onClick={() => clickModal(day.posts, day.day)}>{post.User.name} {msToTime(post.startTime)} ~ {msToTime(post.endTime)}</ScheduleDiv>
                            )) :(
                                <>
                                <ScheduleDiv  onClick={() => clickModal(day.posts, day.day)}>{day.posts[0].User.name} {msToTime(day.posts[0].startTime)} ~ {msToTime(day.posts[0].endTime)}</ScheduleDiv>
                                <ScheduleDiv  onClick={() => clickModal(day.posts, day.day)}>{day.posts[1].User.name} {msToTime(day.posts[1].startTime)} ~ {msToTime(day.posts[1].endTime)}</ScheduleDiv>
                                <EllipsisOutlined style={{width: "100%", marginTop: "2px"}}  onClick={() => clickModal(day.posts, day.day)}/>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            ))}
            {me&&me.id&&<FloatButton onClick={clickReservation}>예약하기</FloatButton>}
        </CalendarWrapper>
        </>
    );
};

CalendarView.propTypes = {
    posts: PropTypes.array.isRequired,
    holidays: PropTypes.array.isRequired,
}

export default CalendarView;