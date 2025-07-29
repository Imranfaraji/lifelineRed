import React from 'react';
import useRole from '../../../utilitis/Hooks/useRole';
import Loading from '../../../pages/Loading/Loading';

const DashboardHome = () => {
    const {role,isLoading}=useRole()

    if(isLoading)return <Loading></Loading>
    return (
        <div>
            
        </div>
    );
};

export default DashboardHome;