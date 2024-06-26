import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../components/home/Footer';
import Header from '../components/home/Header';

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
