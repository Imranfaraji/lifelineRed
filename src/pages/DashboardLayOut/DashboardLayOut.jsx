import React from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../../component/DashboardComponent/Sidebar';

const DashboardLayOut = () => {
    return (
        <div className='flex md:flex-row flex-col'>
            <title>dashboard</title>

            <aside className='w-'>

                <Sidebar></Sidebar>

            </aside>

            <div className='responsive flex-1'>
                <Outlet></Outlet>
            </div>
            
        </div>
    );
};

export default DashboardLayOut;