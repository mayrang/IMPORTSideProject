import React from "react";
import PropTypes from "prop-types"
import 'antd/dist/antd.css';
import Head from "next/head";
import wrapper from "../store/configureStore";


const App = ({ Component}) => {
    return(
        <>
        <Head>
            <meta charSet="utf-8" />
            <title>동아리 방 예약</title>
        </Head>
        <Component />
        </>
    );
};

App.propTypes = {
    Component: PropTypes.elementType.isRequired
}

export default wrapper.withRedux(App);