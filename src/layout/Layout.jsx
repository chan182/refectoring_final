import React from 'react';
import Header from './../components/home/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Home/Footer';

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
