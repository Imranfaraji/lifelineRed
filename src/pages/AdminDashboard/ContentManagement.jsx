import React, { useState } from 'react';
import useAxiosSecure from '../../utilitis/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { Link } from 'react-router';

const ContentManagement = () => {

    const [status,setStatus]=useState("")
    const axiosSecure=useAxiosSecure()

    const {data:blogs=[],refetch}=useQuery({
        queryKey:['blogs',status],
        queryFn:async()=>{
            const res=await axiosSecure.get(`/blogs?status=${status}`)
            return res.data
        }

    })

    const handleStatusChange=async(id,newStatus)=>{
        const res=await axiosSecure.patch(`/blogs/status/${id}`,{status:newStatus})

        if(res.data.modifiedCount>0){
            toast.success("status update successfully!")
            refetch()
        }
    }

    const handleDelete=async(id)=>{
        const res=await axiosSecure.delete(`/blogs/${id}`)

        if(res.data.deletedCount>0){
            toast.success('Blog deleted!')
            refetch()
        }
    }
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
                    <Link to={'/dashboard/addblog'} className='btn btn-primary'>Add blog</Link>
                </div>

                <div className='grid md:grid-cols-2 gap-6'>

                    {
                        blogs.map(blog=>(
                            <div key={blog._id} className='p-4 border rounded shadow space-y-2'>
                                <img src={blog.thumbnail} alt="" className='w-full h-48 object-cover rounded'/>
                                <h3 className='text-lg font-semibold'>{blog.title}</h3>
                                <p>Status: <span className='capitalize'>{blog.status}</span></p>

                                <div className='flex gap-2 flex-wrap'>

                                    {
                                        blog.status==="draft"&&(
                                            <button onClick={()=>handleStatusChange(blog._id,"published")} className='btn btn-success btn-sm'>Publish</button>
                                        )
                                    }

                                    {
                                        blog.status==="published"&&(
                                            <button onClick={()=>handleStatusChange(blog._id,"draft")} className='btn btn-success btn-sm'>Draft</button>
                                        )
                                    }

                                    <button onClick={()=>handleDelete(blog._id)} className='btn btn-error btn-sm'>delete</button>

                                </div>
                            </div>
                        ))
                    }
                </div>

            </div>
            
        </div>
    );
};

export default ContentManagement;