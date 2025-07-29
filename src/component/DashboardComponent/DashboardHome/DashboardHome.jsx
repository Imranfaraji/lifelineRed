import React from 'react';
import useRole from '../../../utilitis/Hooks/useRole';
import Loading from '../../../pages/Loading/Loading';
import Welcome from '../WelcomeSection/Welcome';

const DashboardHome = () => {
    const {role,isLoading}=useRole()

    if(isLoading)return <Loading></Loading>
    return (
        <div>

            <Welcome></Welcome>
            
        </div>
    );
};

export default DashboardHome;