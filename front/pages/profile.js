import React, { useCallback, useEffect } from "react";
import { END } from "redux-saga";
import AppLayout from "../components/AppLayout";
import {LOAD_MY_POSTS_REQUEST, REMOVE_POST_REQUEST } from "../reducers/post";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import { cookieStringToObject } from "../utils/cookieString";
import wrapper from "../store/configureStore";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Button, Card, Collapse, Typography } from "antd";
import { msToTime } from "../utils/timeFormat";
import axios from "axios";



const makeArray = (posts) => {
    const copyPosts = [...posts]
    const sortedPosts = copyPosts.sort((a, b) => a.startTime - b.startTime);
    const postArray = [];
    for(const post of sortedPosts){
        const checkPost = postArray.find((it) => it.rsvDate === post.rsvDate);
        if(checkPost){
            postArray.find((it) => it.rsvDate === post.rsvDate).posts.push(post)
        }else{
            postArray.push({rsvDate: post.rsvDate, posts:[post]})
        }
    }
    return postArray;

}


const Profile = () => {
    const {me} = useSelector((state) => state.user);
    const router = useRouter();
    const {profilePosts, removePostLoading, removePostDone} = useSelector((state) => state.post);
    const dispatch = useDispatch();
    useEffect(() => {
        if(!(me&&me.id)){
            alert("로그인한 사용자만 접속 가능합니다.")
            router.replace("/");
        }else{
            
            dispatch({
                type: LOAD_MY_POSTS_REQUEST,
                memberId: parseInt(me.id)
            });
        }
    }, [me&&me.id]);

    useEffect(() => {
        if(removePostDone){
            router.reload();
        }
    }, [removePostDone])


    const clickEdit = useCallback((id) => {
        router.push(`/edit/${id.toString()}`);
    }, []);

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
        <AppLayout>
            <Typography.Title style={{margin: "2rem"}} level={2}>내 예약 보기</Typography.Title>
            <Collapse defaultActiveKey={['0']}>
                {makeArray(profilePosts).map((day, idx) => (
                    <Collapse.Panel header={day.rsvDate} key={idx.toString()}>
                        {day.posts.map((item) => (
                            <Card key={item.reservationId}>{msToTime(item.startTime) + "~" + msToTime(item.endTime)}{item.endtime}     <Button  onClick={() => clickEdit(item.reservationId)}>수정</Button>  <Button loading={removePostLoading} onClick={() => clickRemove(item.reservationId)} type="primary" danger>삭제</Button></Card>
                        ))}
                    </Collapse.Panel>      
                ))}
            </Collapse>
        </AppLayout>
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


export default Profile;