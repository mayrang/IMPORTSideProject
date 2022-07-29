import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import AppLayout from '../components/AppLayout';
import ReservationForm from '../components/ReservationForm';
import { LOAD_POST_REQUEST } from '../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';
import { cookieStringToObject } from '../utils/cookieString'

const Edit = () => {
    const {singlePost} = useSelector((state) => state.post);
    const {me} = useSelector((state) => state.user);

    const router = useRouter();
    const {id} = router.query;

    useEffect(() => {
        console.log(id)
    }, [])

    useEffect(() => {
        if(!(me&&me.id)){
            alert("로그인을 해주세요")
            router.replace("/login");
        }else if(singlePost.length < 1){
            alert("존재하지 않는 게시글입니다.");
        }else{
            console.log(me)
            const checkPost = me.Posts.find((it) => it.id === parseInt(id));
            if(!checkPost){
                alert("수정권한이 없습니다.")
            }
        }
    }, [me, singlePost]);


    return(
        <AppLayout>
            <ReservationForm />
        </AppLayout>

    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({req, query}) => {
    const cookie = req ? req.headers.cookie : '';
    console.log(req&&cookieStringToObject(cookie)['jwtToken'])
    
    console.log(query)
    if(req&&cookieStringToObject(cookie)['jwtToken']){
        store.dispatch({
            type: LOAD_MY_INFO_REQUEST,
            data: cookieStringToObject(cookie)['jwtToken']
        });
    }
    store.dispatch({
        type: LOAD_POST_REQUEST,
        postId: query.id,
    })
    
    store.dispatch(END);
    await store.sagaTask.toPromise();

});

export default Edit;