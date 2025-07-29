import React from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../../component/DashboardComponent/Sidebar';

const DashboardLayOut = () => {
    return (
        <div className='flex md:flex-row flex-col'>
            <title>dashboard</title>

            <aside >

                <Sidebar></Sidebar>

            </aside>

            <div>
                <Outlet></Outlet>
            </div>
            
        </div>
    );
};

export default DashboardLayOut;