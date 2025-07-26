import React from 'react';
import Nav from '../Navbar/Nav';
import { Outlet } from 'react-router';
import Footer from '../Footer/Footer';


const Root = () => {
    return (
        <>
        <Nav></Nav>
        <Outlet></Outlet>
        <Footer></Footer>
        
        </>
    );
};

export default Root;