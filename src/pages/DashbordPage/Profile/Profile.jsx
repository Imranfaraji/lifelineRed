import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../component/Context/AuthContext';
import useAxiosSecure from '../../../utilitis/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Loading/Loading';

import { toast } from 'react-toastify';

const Profile = () => {

    const {user}=useContext(AuthContext)
    
    const axiosSecure=useAxiosSecure()
    const [isEditable,setIsEditable]=useState(false)
    const [formData,setFormData]=useState({})
    

    const {data:profile={},isPending,refetch}=useQuery({
        queryKey:['user-profile',user?.email],
        enabled:!! user?.email,
        queryFn: async ()=>{
            const res=await axiosSecure.get(`/users-role?email=${user?.email}`);
            setFormData(res.data)
            return res.data
        }
    });
    if(isPending) return <Loading></Loading>

    const handleChange=  (e)=>{
        e.preventDefault();
        const {name,value}=e.target;
        setFormData((prev)=>({...prev,[name]:value}))
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
           const res=await axiosSecure.put(`/update-profile?email=${user?.email}`,formData)

           if(res.data.modifiedCount>0){
            setIsEditable(false)
            refetch()
            toast.success('Profile Update successfullu!')
           }
        }catch(error) {
           toast.error('updade failed :', error.message)
        }
    }
    return (
        <div className='w-full py-16 flex items-center justify-center'>

            <div className=' bg-white shadow rounded'>

                <div className='flex p-4 justify-between items-center mb-4 gap-8'>

                    <h2 className='tex-xl  font-semibold'> Profile information</h2>

                    {
                        !isEditable?(
                            <button className='bg-blue-600 text-white px-4 py-1 rounded' onClick={()=>setIsEditable(true)}>Edit</button>
                        ):(
                            <button className='bg-green-600 text-white px-4 py-1 rounded' onClick={handleSubmit}>
                                Save
                            </button>
                        )
                    }

                </div>

                <form className='grid grid-cols-1 p-4 gap-4'>
                    <div>
                        <label className='block font-medium'>Name</label>

                        <input type="text"
                        name='userName'
                        value={formData?.userName ||''}
                        onChange={handleChange}
                        disabled={!isEditable}
                        className='input border w-full'
                        />
                    </div>

                    <div>
                        <label className='block font-medium'>Photo Url</label>

                        <input type="text"
                        name='photoUrl'
                        value={formData?.photoUrl ||''}
                        onChange={handleChange}
                        disabled={!isEditable}
                        className='input border w-full'
                        />
                    </div>
                    <div>
                        <label className='block font-medium'>Email</label>

                        <input type="text"
                        name='email'
                        value={formData?.email ||''}
                        onChange={handleChange}
                        disabled
                        className='input border w-full'
                        />
                    </div>
                    <div>
                        <label className='block font-medium'>Bllod Group</label>

                        <input type="text"
                        name='bloodGroup'
                        value={formData?.bloodGroup ||''}
                        onChange={handleChange}
                        disabled={!isEditable}
                        className='input border w-full'
                        />
                    </div>
                    <div>
                        <label className='block font-medium'>District</label>

                        <input type="text"
                        name='district'
                        value={formData?.district ||''}
                        onChange={handleChange}
                        disabled={!isEditable}
                        className='input border w-full'
                        />
                    </div>
                    <div>
                        <label className='block font-medium'>Upajela</label>

                        <input type="text"
                        name='upajela'
                        value={formData?.upajela ||''}
                        onChange={handleChange}
                        disabled={!isEditable}
                        className='input border w-full'
                        />
                    </div>
                </form>

            </div>
            
        </div>
    );
};

export default Profile;