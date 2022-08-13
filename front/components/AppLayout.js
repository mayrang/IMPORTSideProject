import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import { useDispatch, useSelector } from "react-redux";
import { LOG_OUT_REQUEST } from "../reducers/user";
import { useRouter } from "next/router";



const AppLayout = ({children}) => {
    const {me, logOutDone} = useSelector((state) => state.user);
    const [checkLogout, setCheckLogout] = useState(false); 
    const dispatch = useDispatch();
    const router = useRouter()

    const clickLogout = useCallback(() => {
        dispatch({
            type: LOG_OUT_REQUEST
        })
        setCheckLogout(true);
    }, []);

    useEffect(() => {
        if(logOutDone&&checkLogout){
            setCheckLogout(false)
            router.replace('/');
        }
    }, [logOutDone, checkLogout])

    return (
        <div>
          <Navbar bg="light" expand="lg">
            <Container fluid >
                <Navbar.Brand href="/">동아리방 예약 시스템</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    {me&&me.id? 
                    <>
                    <Nav.Link href="/profile">프로필</Nav.Link>
                    <Nav.Link onClick={clickLogout}>로그아웃</Nav.Link>
                    </>:<>
                    <Nav.Link href="/login">로그인</Nav.Link>
                    <Nav.Link href="/signup">회원가입</Nav.Link></>}
                    
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        {children}
        </div>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node,
};

export default AppLayout;