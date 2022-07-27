import React, { useCallback, useEffect } from "react";
import {Button, Cascader, Form, Input} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SIGN_UP_REQUEST } from "../reducers/user";
import { useRouter } from "next/router";


const majorOptions = [
    {
        value: '공과대학',
        label: '공과대학',
        children: [
            {
                label: "기계공학과",
                value: "기계공학과",
            },
            {
                label: "신소재공학과",
                value: "신소재공학과",
            },
            {
                label: "화학생명공학과",
                value: "화학생명공학과",
            },
            {
                label: "산업경영공학과",
                value: "산업경영공학과",
            },
            {
                label: "설비공학과",
                value: "설비공학과",
            },
            {
                label: "창의융합학과",
                value: "창의융합학과",
            },
            {
                label: "산업융합학부",
                value: "산업융합학부",
            },

        ]
    },
    {
        value: '정보기술대학',
        label: '정보기술대학',
        children: [
            {
                label: "전기공학과",
                value: "전기공학과",
            },
            {
                label: "전자공학과",
                value: "전자공학과",
            },
            {
                label: "컴퓨터공학과",
                value: "컴퓨터공학과",
            },
            {
                label: "정보통신공학과",
                value: "정보통신공학과",
            },
            {
                label: "모바일융합공학과",
                value: "모바일융합공학과",
            },
            {
                label: "인공지능소프트웨어학과",
                value: "인공지능소프트웨어학과",
            },
            {
                label: "지능미디어공학과",
                value: "지능미디어공학과",
            },
        ]
    },
    {
        value: "건설환경조형대학",
        label: '건설환경조형대학',
        children: [
            {
                label: "건설환경공학과",
                value: "건설환경공학과",
            },
            {
                label: "도시공학과",
                value: "도시공학과",
            },
            {
                label: "건축공학과",
                value: "건축공학과",
            },
            {
                label: "건축학과",
                value: "건축학과",
            },
            {
                label: "시각디자인학과",
                value: "시각디자인학과",
            },
            {
                label: "산업디자인학과",
                value: "산업디자인학과",
            },
        ]
    },
    {
        value: "인문사회대학",
        label: "인문사회대학",
        children: [
            {
                label: "영어영문학과",
                value: "영어영문학과",
            },
            {
                label: "중국어과",
                value: "중국어과",
            },
            {
                label: "일본어과",
                value: "일본어과",
            },
            {
                label: "공공행정학과",
                value: "공공행정학과",
            },
            
        ]
    },
    {
        value: "경상대학",
        label: "경상대학",
        children: [
            {
                label: "경제학과",
                value: "경제학과",
            },
            {
                label: "융합경영학과",
                value: "융합경영학과",
            },
            {
                label: "회계학과",
                value: "회계학과",
            },
            {
                label: "경영회계학과",
                value: "경영회계학과",
            },
        ]
    },
    {
        value: "미래산업융합대학",
        label: "미래산업융합대학",
        children: [
            {
                label: "기계소재융합시스템공학과",
                value: "기계소재융합시스템공학과",
            },
            {
                label: "융합기술학과",
                value: "융합기술학과",
            },
            {
                label: "전기시스템공학과",
                value: "전기시스템공학과",
            },
            {
                label: "생산경영공학과",
                value: "생산경영공학과",
            },
            {
                label: "회계사무부동산학과",
                value: "회계사무부동상학과",
            },
            {
                label: "통합물관리학과",
                value: "통합물관리학과",
            },
            {
                label: "창업경영학과",
                value: "창업경영학과",
            },
            {
                label: "협동조합금융학과",
                value: "협동조합금융학과",
            },
            {
                label: "스포츠건강과학과",
                value: "스포츠건강과학과",
            },
            {
                label: "농어촌수자원관리학과",
                value: "농어촌수자원관리학과",
            },
            {
                label: "융합건설시스템학과",
                value: "융합건설시스템학과",
            },
            {
                label: "융합디자인학과",
                value: "융합디자인학과",
            },
            {
                label: "IT시스템학과",
                value: "IT시스템학과",
            },
        ]
    }
]

const SignupForm = () => {
    const dispatch = useDispatch();
    const {singUpLoading, signUpDone} = useSelector((state) => state.user);
    const router = useRouter();
    useEffect(() => {
        if(signUpDone){
            router.replace("/");
        }
    }, [signUpDone])

    const submitSignup = useCallback((value) => {
        dispatch({
            type: SIGN_UP_REQUEST,
            data: {
                name: value.name,
                studentId: value.studentId,
                password: value.password,
                phoneNumber: value.phoneNumber,
                major: value.major,
                email: value.email
            }
        });

    }, [])
    
    return (
        <Form onFinish={submitSignup} layout="vertical" style={{marginLeft: "1.5rem", marginRight: "1.5rem"}}>
            <Form.Item label="이름" name="name" rules={[
                {required: true, message: "이름은 필수 입력 항목입니다."},
                {max: 5, message: "이름은 5글자 이하 이여야 합니다."},
            ]}>
                <Input />
            </Form.Item>
            <Form.Item label="ID" name="studentId" rules={[
                {required: true, message: "ID는 필수 입력 항목입니다."},
                {max: 45, message: "ID는 45글자 미만이여야 합니다."},
            ]}>
                <Input />
            </Form.Item>
            <Form.Item  label="비밀번호" rules={[{ required: true, message: "비밀번호는 필수 입력 항목입니다."}]} hasFeedback name="password" >
                <Input.Password />
            </Form.Item>
            <Form.Item  label="비밀번호 확인" hasFeedback dependencies={['password']} rules={[
                { required: true, message: "비밀번호 확인은 필수 입력 항목입니다."},
                ({getFieldValue}) => ({
                    validator(_, value) {
                        if(!value || getFieldValue('password') === value){
                            return Promise.resolve();
                        }
                        return Promise.reject(new Error('비밀번호가 일치하지 않습니다.'))
                    }
                })]} name="passwordCheck" >
                <Input.Password />
            </Form.Item>
            <Form.Item label="email" name="email" rules={[
                {required: true, message: "이메일은 필수 입력 항목입니다."},
                {max: 45, message: "이메일은 45글자 이하 이여야 합니다."},
                {type: 'email', message: "이메일 형식으로 입력하여야 합니다."},
            ]}>
                <Input />
            </Form.Item>
            <Form.Item label="핸드폰 번호" name="phoneNumber" extra="-없이 숫자로만 입력해주세요(ex:010-0000-0000)" rules={[
                {required: true, message: "핸드폰 번호 입력은 필수 입력 항목입니다."},
                {validator: (_, value) => value.match(/^[0-9]+$/) !== null ? Promise.resolve() : Promise.reject(new Error('숫자로만 입력해주세요'))},
                {min: 11, max:11, message: "11자리를 입력해주세요"}
            ]} >
                <Input />
            </Form.Item>
            <Form.Item label="학과" name="major">
                <Cascader 
                    options={majorOptions}/>
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={singUpLoading}>가입하기</Button>
        </Form>
    );
}

export default SignupForm;