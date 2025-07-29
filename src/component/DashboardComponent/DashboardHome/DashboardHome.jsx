import React from 'react';
import useRole from '../../../utilitis/Hooks/useRole';
import Loading from '../../../pages/Loading/Loading';

const DashboardHome = () => {
    const {role,isLoading}=useRole()

    if(isLoading)return <Loading></Loading>
    return (
        <div>
            <h1>This is {role} page</h1>
        </div>
    );
};

export default DashboardHome;