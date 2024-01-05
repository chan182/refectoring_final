import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/home/Header';
import Footer from '../components/home/Footer';

const Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default Layout;
