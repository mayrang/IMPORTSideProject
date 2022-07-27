import { Button, Form, Input } from "antd";
import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOG_IN_REQUEST } from "../reducers/user";

const LoginForm = () => {
    const dispatch = useDispatch();
    const {logInLoading, logInDone} = useSelector((state) => state.user);
    const router = useRouter()
    
    useEffect(() => {
        if(logInDone){
            router.replace('/')
        }
    }, [logInDone]);

    const submitLogin = useCallback((value) => {
        dispatch({
            type: LOG_IN_REQUEST,
            data: value
        })
    }, [])

    return (
        <Form onFinish={submitLogin}>
            <Form.Item label="ID" name="studentId" rules={[
                {required: true, message: "ID는 필수 입력 항목입니다."},
            ]}>
                <Input />
            </Form.Item>
            <Form.Item  label="비밀번호" rules={[{ required: true, message: "비밀번호는 필수 입력 항목입니다."}]} hasFeedback name="password" >
                <Input.Password />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={logInLoading}>로그인</Button>
            <Button href={"/signup"}>회원가입</Button>
        </Form>
    );
};

export default LoginForm