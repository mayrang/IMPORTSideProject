import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { END } from 'redux-saga';
import AppLayout from '../../components/AppLayout';
import ReservationForm from '../../components/ReservationForm';
import { LOAD_POST_REQUEST } from '../../reducers/post';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';
import wrapper from '../../store/configureStore';
import { cookieStringToObject } from '../../utils/cookieString'

const Edit = () => {
    const {loadPostError, singlePost} = useSelector((state) => state.post);
    const {me} = useSelector((state) => state.user);

    const router = useRouter();
    const {id} = router.query;



    useEffect(() => {
       if(loadPostError){
            alert(loadPostError)
            router.replace('/')
        }else if(!(me&&me.id)){
            alert("로그인을 해주세요")
            router.replace("/login");
        }else{
            const checkPost = me.Posts.find((it) => it.id === parseInt(id));
            if(!checkPost){
            alert("수정권한이 없습니다.")
            console.log(123)
            router.replace('/')
            }
        }
       
        
       
    }, [me&&me.id, loadPostError]);

    useEffect(() => {
        console.log(singlePost)
    }, [singlePost])



    return(
        <AppLayout>
            <ReservationForm value={singlePost} />
        </AppLayout>

    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({req, params}) => {
    const cookie = req ? req.headers.cookie : '';
    console.log(req&&cookieStringToObject(cookie)['jwtToken'])
    
    console.log(params)
    if(req&&cookieStringToObject(cookie)['jwtToken']){
        store.dispatch({
            type: LOAD_MY_INFO_REQUEST,
            data: cookieStringToObject(cookie)['jwtToken']
        });
    }
    store.dispatch({
        type: LOAD_POST_REQUEST,
        postId: params.id,
    })
    
    store.dispatch(END);
    await store.sagaTask.toPromise();

});

export default Edit;