import React, { useState } from 'react';
import useRole from '../../utilitis/Hooks/useRole';
import Loading from '../../pages/Loading/Loading'
import { NavLink } from 'react-router';

const Sidebar = () => {

    const [isOpen,setIsOpen]=useState(false)

    const {role,isLoading}=useRole()
    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <>
         <div className='md:hidden p-4 bg-gray-800 text-white flex justify-between items-center'>
          <h2 className='text-lg font font-semibold'>Dashboard</h2>

          <button onClick={()=>setIsOpen(!isOpen)} className='text--white focus:outline-none'>
           ☰
          </button>
         </div>

         <div className={
            `${isOpen?'block':'hidden'} md:block bg-gray-800 text-white w-full md:min-h-screen p-4 space-y-3`
         }>

            <NavLink to={'/dashboard'} className={({isActive})=>isActive?'text-red-500 font-bold text-sm':'block text-sm text-white'}>Dashboard Home</NavLink>
            <NavLink to={'/dashboard/myprofile'} className={({isActive})=>isActive?'text-red-500 font-bold text-sm':'block text-sm text-white'}>My Profile</NavLink>


            {
                role==='admin' &&(
                    <>
                     <NavLink to={'/dashboard/allusers'} className={({isActive})=>isActive?'text-red-500 font-bold text-sm':'block text-sm text-white'}>All Users</NavLink>
                     <NavLink to={'/dashboard/all-blood-donation-request'} className={({isActive})=>isActive?'text-red-500 font-bold text-sm':'block text-sm text-white'}>All Blood Donation Request</NavLink>
                     <NavLink to={'/dashboard/content-management'} className={({isActive})=>isActive?'text-red-500 font-bold text-sm':'block text-sm text-white'}>Content management</NavLink>
                    </>
                )
            }
            {
                role==='donor' &&(
                    <>
                     <NavLink to={'/dashboard/my-donation-requests'} className={({isActive})=>isActive?'text-red-500 font-bold text-sm':'block text-sm text-white'}>My Donation Request</NavLink>
                     <NavLink to={'/dashboard/create-donation-request'} className={({isActive})=>isActive?'text-red-500 font-bold text-sm':'block text-sm text-white'}>Creat Donation request</NavLink>
                     
                    </>
                )
            }
            {
                role==='volunteer' &&(
                    <>
                     <NavLink to={'/dashboard/all-blood-donation-request'} className={({isActive})=>isActive?'text-red-500 font-bold text-sm':'block text-sm text-white'}>All Blood Donation Request</NavLink>
                     <NavLink to={'/dashboard/content-management'} className={({isActive})=>isActive?'text-red-500 font-bold text-sm':'block text-sm text-white'}>Content Management</NavLink>
                     
                    </>
                )
            }

         </div>
        
        </>
    );
};

export default Sidebar;