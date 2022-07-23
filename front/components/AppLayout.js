import React, { useCallback } from "react";
import {Menu, Button} from "antd";
import Link from "next/link";
import PropTypes from "prop-types";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

const menuItems = [
    {
        label: <Link href={"/"} passHref><a>예약 보기</a></Link>,
        key: "home",
    },
    {
        label: (<Link href={"/profile"} passHref><a>프로필</a></Link>),
        key: "profile",
    },
    {
        label: (<Link href={"/logout"} passHref><a>로그아웃</a></Link>),
        key: "logout",
    },
    {
        label: (<Link href={"/signup"} passHref><a>회원가입</a></Link>),
        key: "signup",
    },
];

const AppLayout = ({children}) => {
    const clickLogout = useCallback(() => {
        console.log("click logout")
    }, []);

    return (
        <div>
          <Navbar bg="light" expand="lg">
            <Container fluid >
                <Navbar.Brand href="/">동아리방 예약 시스템</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                    <Nav.Link href="/profile">프로필</Nav.Link>
                    <Nav.Link onClick={clickLogout}>로그아웃</Nav.Link>
                    <Nav.Link href="/signup">회원가입</Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        {children}
        </div>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AppLayout;