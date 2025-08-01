import React from 'react';
import useAxiosPublic from '../../utilitis/Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Loading/Loading';
import { Link } from 'react-router';

const Blogs = () => {
    const axiosPublic=useAxiosPublic()

    const {data:blogs=[],isLoading}=useQuery({
        queryKey:['published-blogs'],
        queryFn: async()=>{
            const res=await axiosPublic.get('/publisedblogs')
            return res.data
        }
    })

  

    

    

    if(isLoading){
    
        return <Loading></Loading>
    }

    
    return (
        <div className='w-full bg-gray-50 py-16'>

            <title>Blogs</title>

            <h2 className='text-4xl text-gray-800 font-bold text-center mb-10'>Liefeline<span className='text-red-600'>Red</span> Blogs</h2>
            <div className='responsive grid grid-cols-1 md:grid-cols-3 items-center justify-center gap-3'>
               {
                blogs && blogs.map(blog=>(
                    <div key={blog._id} className='bg-white p-4 rounded space-y-2 shadow'>
                            <img className='w-full h-90 rounded ' src={blog.thumbnail} alt="" />

                        <small className='font-bold mt-4'>author : iefeline<span className='text-red-600'>Red |</span></small> <small>| Published Data : {blog.createdAt}</small>
                        

                        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>{blog.title}</h2>

                        <Link to={`/blogs/${blog._id}`} className='cta mt-10'>Read more..</Link>
                    </div>
                ))
               }

            </div>
            
        </div>
    );
};

export default Blogs;