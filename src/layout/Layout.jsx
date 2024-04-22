import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/home/Header';

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            {/* <Footer /> */}
        </>
    );
};

export default Layout;

const StDiv = styled.div`
    /* box-sizing: border-box; */
`;
