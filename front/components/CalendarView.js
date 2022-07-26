import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {EllipsisOutlined} from "@ant-design/icons";
import styled from "styled-components";
import moment from "moment";
import {Button, Modal} from "antd";
import { useDispatch } from "react-redux";
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { dummyData } from "../pages";
import Router, { useRouter } from "next/router";



const CalendarWrapper = styled.div`
    max-width: 1300px;
    padding: 0 1.4rem;
    max-height: auto
    box-sizing: border-box;
    margin: auto;
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



const scheduleStyle = {
    height: "20%",
    width: "100%",
    minHeight: "11px",
    backgroundColor: "#112667",
    overflow: "hidden",
    textOverflow: "ellipsis",
    color: "#fff",
    padding: "1px",
    marginTop: ".1rem",
    fontSize: "0.5em",
    cursor:"pointer",
  };

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


const calendarArray = (year, month, posts) => {
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
                const yearMonthDay = year 
                                    + "-" + (month < 10 ? "0" + (month) : month) 
                                    + "-" + (count < 10 ? "0" + count : count)
                const findPosts = posts.filter((it) => it.day === yearMonthDay);
                if(findPosts){
                    week.push({day: count.toString(), posts: findPosts});
                }else{
                    week.push({day: count.toString(), posts: []});
                }
                count++; 
            }
        }
        newMonth.push(week);
    }
    console.log(newMonth)
    return newMonth;
}

 

const CalendarView = ({posts}) => {
    const [modalPosts, setModalPosts] = useState([]);
    const [visible, setVisible] = useState(false);
    const router = useRouter();
    const {year, month} = router.query
    const [modalDay, setModalDay] = useState("");
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch({
            type: LOAD_POSTS_REQUEST,
            year: year,
            month: month,
            data: dummyData,
        });
        
    }, [year, month])

    const clickNext = useCallback(() => {
        const calendarYear = year?year:parseInt(moment().add(9, 'h').format('YYYY'));
        const calendarMonth = month?month:parseInt(moment().add(9, 'h').format('MM'));
        if(parseInt(month) === 12){
            router.push({
                pathname: '/',
                query: {
                    year: (parseInt(calendarYear)+1).toString(),
                    month: "1"
                }
            })
        }else{
            router.push({
                pathname: '/',
                query: {
                    year: calendarYear,
                    month: (parseInt(calendarMonth)+1).toString()
                }
            })
        }
    }, [month]);
    const clickPrev = useCallback(() => {
        const calendarYear = year?year:parseInt(moment().add(9, 'h').format('YYYY'));
        const calendarMonth = month?month:parseInt(moment().add(9, 'h').format('MM'));
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
                    year: calendarYear,
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
                <div>{year||parseInt(moment().add(9, 'h').format('YYYY'))}년 {month||parseInt(moment().add(9, 'h').format('MM'))}월</div>
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
            {calendarArray(year, month, posts).map((week, idx) => (
                <div key={`week${idx}`} className="grid dayBody">
                    {week.map((day, idx) => (
                        <div key={`day${idx}`}>
                            <div className="dayDate">{day.day}</div>
                            {day.posts.length<4 ?
                            day.posts.map((post) => (
                                <div key={post.id} style={scheduleStyle} onClick={() => clickModal(day.posts, day.day)}>{post.User.name} {msToTime(post.startTime)} ~ {msToTime(post.endTime)}</div>
                            )) :(
                                <>
                                <div style={scheduleStyle}  onClick={() => clickModal(day.posts, day.day)}>{day.posts[0].User.name} {msToTime(day.posts[0].startTime)} ~ {msToTime(day.posts[0].endTime)}</div>
                                <div style={scheduleStyle}  onClick={() => clickModal(day.posts, day.day)}>{day.posts[1].User.name} {msToTime(day.posts[1].startTime)} ~ {msToTime(day.posts[1].endTime)}</div>
                                <EllipsisOutlined style={{width: "100%", marginTop: "2px"}}  onClick={() => clickModal(day.posts, day.day)}/>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            ))}
            <FloatButton onClick={clickReservation}>글 쓰기</FloatButton>
        </CalendarWrapper>
        </>
    );
};

CalendarView.propTypes = {
    posts: PropTypes.array.isRequired,
}

export default CalendarView;