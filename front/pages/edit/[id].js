import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import {useSelector } from 'react-redux';
import { END } from 'redux-saga';
import AppLayout from '../../components/AppLayout';
import ReservationForm from '../../components/ReservationForm';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import wrapper from '../../store/configureStore';
import { cookieStringToObject } from '../../utils/cookieString'

const Edit = () => {
    const {me} = useSelector((state) => state.user);
    const [post, setPost] = useState();
    const router = useRouter();
    const {id} = router.query;


    useEffect(() => {
        if(!(me&&me.id)){
            alert("로그인을 해주세요")
            router.replace("/login");
        }else{
            const checkPost = me.Posts.find((it) => it.id === parseInt(id));
            
            console.log(checkPost)
            if(!checkPost){
                alert("수정권한이 없습니다.")
                router.replace('/')
            }else{
                setPost(checkPost)
            }
        }
    }, [me&&me.id]);



    return(
        <AppLayout>
            {post&&<ReservationForm value={post} edit={true} postId={id}/>}
        </AppLayout>

    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({req}) => {
    const cookie = req ? req.headers.cookie : '';
    console.log(req&&cookieStringToObject(cookie)['jwtToken'])
    console.log(store.getState().post)
    if(req&&cookieStringToObject(cookie)['jwtToken']){
        store.dispatch({
            type: LOAD_MY_INFO_REQUEST,
        });
    }
    store.dispatch(END);
    await store.sagaTask.toPromise();

});

export default Edit;