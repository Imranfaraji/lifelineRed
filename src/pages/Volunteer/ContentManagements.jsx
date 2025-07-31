import React, { useState } from 'react';
import useAxiosSecure from '../../utilitis/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

import { Link } from 'react-router';

const ContentManagements = () => {

    const [status,setStatus]=useState("")
    const axiosSecure=useAxiosSecure()

    const {data:blogs=[]}=useQuery({
        queryKey:['blogs',status],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/volunteerblogs?status=${status}`)
            return res.data
        }

    })

    
    return (
        <div className='w-full py-16 '>
            <h2 className='text-center text-4xl font-bold md-4'>All Blogs</h2>

            <div className='responsive'>

                <div className='flex items-center justify-between mb-4'>
                    <select value={status} onChange={(e)=>setStatus(e.target.value)}>
                        <option value="">all</option>
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                    <Link to={'/dashboard/addblogs'} className='btn btn-primary'>Add blog</Link>
                </div>

                <div className='grid md:grid-cols-2 gap-6'>

                    {
                        blogs.map(blog=>(
                            <div key={blog._id} className='p-4 border rounded shadow space-y-2'>
                                <img src={blog.thumbnail} alt="" className='w-full h-48 object-cover rounded'/>
                                <h3 className='text-lg font-semibold'>{blog.title}</h3>
                                <p>Status: <span className='capitalize'>{blog.status}</span></p>

                                
                            </div>
                        ))
                    }
                </div>

            </div>
            
        </div>
    );
};

export default ContentManagements;