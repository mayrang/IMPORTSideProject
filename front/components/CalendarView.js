import React from "react";
import PropTypes from "prop-types";
import {EllipsisOutlined} from "@ant-design/icons"
import styled from "styled-components"

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
    console.log(duration)
    let second = Math.floor(duration/ 1000);
    let minute = Math.floor(second / 60);
    let hour = Math.floor(minute /60);

    second = second % 60;
    minute = minute % 60;
    hour = hour % 24
    return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
  }


const calendarArray = (year, month, posts) => {
    let newMonth = [];
    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();
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
                                    + "-" + (month < 9 ? "0" + (month + 1) : month + 1) 
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

 

const CalendarView = ({year, month, posts}) => {
    
    
    return (
        <CalendarWrapper>
            <HeaderWrapper>
                <div>{"<"} 이전 달</div>
                <div >{year}년 {month+1}월</div>
                <div>다음 달 {">"}</div>

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
                                <div key={post.id} style={scheduleStyle}>{post.User.name} {msToTime(post.startTime)} ~ {msToTime(post.endTime)}</div>
                            )) :(
                                <>
                                <div style={scheduleStyle}>{posts[0].User.name} {msToTime(posts[0].startTime)} ~ {msToTime(posts[0].endTime)}</div>
                                <div style={scheduleStyle}>{posts[1].User.name} {msToTime(posts[1].startTime)} ~ {msToTime(posts[1].endTime)}</div>
                                <EllipsisOutlined style={{width: "100%", marginTop: "2px"}}/>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </CalendarWrapper>
    );
};

CalendarView.propTypes = {
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    posts: PropTypes.array.isRequired,
}

export default CalendarView;