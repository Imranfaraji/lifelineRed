import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from '../../component/Context/AuthContext';

const useAxiosSecure = () => {
    const {user}=useContext(AuthContext)
    const instance=axios.create({
        baseURL:"https://lifeline-red-server.vercel.app",
        headers:{
            Authorization:`Bearer ${user?.accessToken}`

            
        }
    })
    return instance
};

export default useAxiosSecure;