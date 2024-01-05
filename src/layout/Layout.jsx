import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Footer from '../components/home/Footer';
import Header from '../components/home/Header';

const Layout = () => {
    return (
        <StDiv>
            <Header />
            <Outlet />
            <Footer />
        </StDiv>
    );
};

export default Layout;

const StDiv = styled.div`
    min-height: 100vh;
    position: relative;
    box-sizing: border-box;
`;
