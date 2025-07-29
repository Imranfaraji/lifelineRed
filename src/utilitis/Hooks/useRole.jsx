import React, { useContext } from 'react';
import useAxiosSecure from './useAxiosSecure';
import { AuthContext } from '../../component/Context/AuthContext';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
    const axiosSecure=useAxiosSecure();
    const {user}=useContext(AuthContext)

    const {data:roleData={},isPending:isLoading,isError}=useQuery({
        queryKey:['user-role',user?.email],
        enabled:!!user?.email,
        queryFn: async()=>{
            const res=await axiosSecure.get(`/users-role?email=${user?.email}`)
            return res.data
        }
    })
    return {role:roleData?.role,isLoading,isError}
       
};

export default useRole;