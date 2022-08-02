import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {EllipsisOutlined} from "@ant-design/icons";
import styled from "styled-components";
import moment from "moment";
import {Button, List, Modal} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { msToTime } from "../utils/timeFormat";
import Router, { useRouter } from "next/router";
import { LOAD_POST, REMOVE_POST_REQUEST } from "../reducers/post";



const CalendarWrapper = styled.div`
    max-width: 1300px;
    padding: 0 1.4rem;
    box-sizing: border-box;
    min-height: auto;
    margin-top: .4rem;
    margin: auto

`

const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1rem .7rem;
    font-weight: bold;
    box-sizing: border-box;
    .yearMonth {
        font-size: 1.3em;
    }
    .changeMonth {
        font-size: 1em;
        cursor: pointer;
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
    return newMonth;
}

 

const CalendarView = ({posts, holidays}) => {
    const [modalPosts, setModalPosts] = useState([]);
    const [visible, setVisible] = useState(false);
    const router = useRouter();
    const {year, month} = router.query
    const [modalDay, setModalDay] = useState("");
    const {me} = useSelector((state) => state.user);
    const {removePostLoading, removePostDone, monthPosts} = useSelector((state) => state.post);
    const calendarYear = year||parseInt(moment().format('YYYY'));
    const calendarMonth = month||parseInt(moment().format('MM'));
    const checkToday = moment(`${parseInt(calendarYear)}, ${parseInt(calendarMonth)}`, 'YYYYMMDDHHmmss').format("YYYY-MM")
    const dispatch = useDispatch();


    useEffect(() => {
        if(removePostDone){
            setVisible(false)
            router.replace({
                pathname: "/",
                query: {
                    year: calendarYear,
                    month: calendarMonth
                }
            })
        }
    }, [removePostDone])


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

    const clickEdit = useCallback((id) => {
        if(!(me&&me.id)){
            alert("로그인을 해주세요")
            router.replace("/login");
        }else{
            const checkPost = me.Posts.find((it) => it.reservationId === parseInt(id));
            
            console.log(checkPost)
            if(!checkPost){
                alert("수정권한이 없습니다.")
                router.replace('/')
            }else{
                router.push(`/edit/${id}`)
            }
        }
            
        
    }, [me&&me.id])

    const clickRemove = useCallback((id) => {
        if(me.id&&me){
            const checkPost = me.Posts.find((it) => it.reservationId === parseInt(id))
            if(checkPost){
                dispatch({
                    type: REMOVE_POST_REQUEST,
                    reservationId: id
                })
            }else{
                alert('삭제권한이 없습니다.')
            }      
        }
    }, [me.id&&me])

    return (
        <>
        <Modal visible={visible} onCancel={cancelModal} title={modalDay + "일"}>
            {modalPosts.length > 0 ?
            <List
                itemLayout="horizontal"
                dataSource={modalPosts}
                renderItem={(item) => (
                    <List.Item actions={me.id&&me.Posts.find((it)=>it.reservationId === item.reservationId)&&[<Button key={item.reservationId} onClick={() => clickEdit(item.reservationId)}>수정</Button>,<Button loading={removePostLoading} onClick={() => clickRemove(item.reservationId)} type="primary" key={item.reservationId} danger>삭제</Button>]}>
                        <List.Item.Meta
                            title={item.name}
                            description={msToTime(item.startTime) +"~"+ msToTime(item.endTime)}
                        />
                    </List.Item>
                )}
            />
            : 
            <p>예약된 시간이 없습니다.</p>}
        </Modal>
        <CalendarWrapper>
            <HeaderWrapper>
                <div className="changeMonth" onClick={clickPrev}>{"<"} 이전 달</div>
                <div className="yearMonth">{calendarYear}년 {calendarMonth}월</div>
                <div className="changeMonth" onClick={clickNext}>다음 달 {">"}</div>

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
                            <div style={{color:"red"}} className="dayDate"><p style={moment().format('YYYY-MM-DD')===(checkToday+"-"+(parseInt(day.day) < 10 ? "0" + day.day : day.day))?{margin: "1px", color:"white", backgroundColor:"red", display: "inline-block", textAlign:"center", padding:".1em"}:{margin: "1px", color:"red", display:"inline-block"}}>{day.day}</p> <p style={{display: "inline-block", fontSize: ".3rem", marginBottom: "1px"}}>{day.holidays?.dateName}</p></div>
                            :
                            <div className="dayDate"><p style={moment().format('YYYY-MM-DD')===(checkToday+"-"+(parseInt(day.day) < 10 ? "0" + day.day : day.day))?{margin: "1px", color:"white", backgroundColor:"black", display: "inline-block", textAlign:"center", padding:".1em"}:{margin: "1px", color:"black", display:"inline-block"}}>{day.day}</p></div>}
                            {day.posts.length<3 ?
                            day.posts.map((post) => (
                                <ScheduleDiv key={post.reservationId} onClick={() => clickModal(day.posts, day.day)}>{post.name} {msToTime(post.startTime)} ~ {msToTime(post.endTime)}</ScheduleDiv>
                            )) :(
                                <div>
                                <ScheduleDiv  onClick={() => clickModal(day.posts, day.day)}>{day.posts[0].name} {msToTime(day.posts[0].startTime)} ~ {msToTime(day.posts[0].endTime)}</ScheduleDiv>
                                <ScheduleDiv  onClick={() => clickModal(day.posts, day.day)}>{day.posts[1].name} {msToTime(day.posts[1].startTime)} ~ {msToTime(day.posts[1].endTime)}</ScheduleDiv>
                                <EllipsisOutlined style={{width: "100%"}}  onClick={() => clickModal(day.posts, day.day)}/>
                                </div>
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