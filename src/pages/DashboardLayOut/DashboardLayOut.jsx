import React from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../../component/DashboardComponent/Sidebar';

const DashboardLayOut = () => {
    return (
        <div className='flex  md:flex-row flex-col items-stretch '>
            <title>dashboard</title>

            <aside className='bg-gray-800'>

                <Sidebar></Sidebar>

            </aside>

            <div className='responsive flex-1'>
                <Outlet></Outlet>
            </div>
            
        </div>
    );
};

export default DashboardLayOut;