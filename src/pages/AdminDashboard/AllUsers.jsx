import React, { useState } from 'react';
import useAxiosSecure from '../../utilitis/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import Loading from '../Loading/Loading';

const AllUsers = () => {
    const axiosSecure=useAxiosSecure()
    const [filter,setFilter]=useState('all')
    const [page,setPage]=useState(1)
    const limit=10

    const {data:userData={},refetch,isLoading}=useQuery({
        queryKey:["allUsers",filter,page],
        queryFn:async()=>{
            const res=await axiosSecure.get(`users?status=${filter}&page=${page}&limit=${limit}`)
            return res.data
        },
        
    })

    

    const handleStatusChange=async(id,status)=>{
        try{
            await axiosSecure.patch(`/users/status/${id}`,{status})
            toast.success(`Users ${status === "blocked"?"blocked":"Unbloked "}successfully!`)
            refetch()
        }catch(err){
            toast.error(err.message)
        }
    }


    const handleRoleChange=async(id,role)=>{
        try{
            await axiosSecure.patch(`/users/role/${id}`,{role})
            toast.success('user role change to' ,role)
            refetch()
        }catch(err){
          toast.error(err.message)
        }
    }

    const roles =["donor","volunteer","admin"]
    if(isLoading) {
        return <Loading></Loading>
    }
    return (
        <div className='w-full py-16'>
            <h2 className='text-2xl font-bold mb-4 text-center'>All Users</h2>

            <div className='text-center space-x-2'>

                <button onClick={()=>{
                    setPage(1);
                    setFilter("all")

                }} className={`btn btn-sm ${filter==="all"?"btn-Primary":""}`}>
                    All
                </button>
                <button onClick={()=>{
                    setPage(1);
                    setFilter("active")

                }} className={`btn btn-sm ${filter==="active"?"btn-Primary":""}`}>
                    Active
                </button>
                <button onClick={()=>{
                    setPage(1);
                    setFilter("blocked");

                }} className={`btn btn-sm ${filter==="bloked"?"btn-Primary":""}`}>
                    Blocked
                </button>

                <div className='responsive'>
                    <div className='overflow-x-auto'>
                        <table className='table w-full mt-10 rounded border border-gray-900'>
                            <thead className='bg-red-400 text-white'>
                                <tr>
                                    <th>Avater</th>
                                    <th>Email</th>
                                    <th>Name</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th className='text-center'>Actions</th>
                                </tr>
                            </thead>

                            <tbody>

                                {userData?.users?.map((user)=>(
                                    <tr key={user._id}>
                                        <td>
                                            <img src={user.photoUrl} alt="avatar" className='w-10 h-10 rounded-full'/>
                                        </td>

                                        <td>{user.email}</td>
                                        <td>{user.disPlayName}</td>
                                        <td>{user.role}</td>
                                        <td>{user.status}</td>
                                        <td className='space-x-2 space-y-1 text-center'>
                                            {user.status==="active"?(
                                                <button onClick={()=>handleStatusChange(user._id,"blocked")} className='btn btn-xs btn-warning'>
                                                    Bloked
                                                </button>
                                            ):( <button onClick={()=>handleStatusChange(user._id,"active")} className='btn btn-xs btn-success'>
                                                    Unbloked
                                                </button>)}

                                                {/* role btn */}

                                                {
                                                    roles.map((r)=>(
                                                        <button key={r}
                                                        onClick={()=>handleRoleChange(user._id,r)}
                                                        className={`btn btn-xs ${
                                                            r==="admin"
                                                            ?
                                                            "btn-primary"
                                                            :r==="volunteer"
                                                            ?"btn-info"
                                                            :"btn-secondary"
                                                        }`}
                                                        >
                                                           make {r.charAt(0).toLocaleUpperCase() + r.slice(1)}
                                                        </button>
                                                    ))
                                                }
                                        </td>


                                    </tr>
                                ))}

                            </tbody>
                        </table>
                    </div>

                    {/* pagi nation */}

                    <div className='mt-4 flex gap-2 items-center justify-center'>
                     {Array.from({length: userData?.totalPage || 1},(_,i)=>(
                        <button key={i} onClick={()=>setPage(i+1)} className={`px-3 py-1 ${
                            page===i+1 ? "bg-blue-500 text-white":"bg-gray-200"
                        }`}>

                            {i+1}
                            
                        </button>
                     ))}
                    </div>

                    {/* pagi nation */}


                </div>

            </div>
            
        </div>
    );
};

export default AllUsers;