import React from 'react';
import { useParams } from 'react-router';
import Loading from '../Loading/Loading';
import useAxiosPublic from '../../utilitis/Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const Blog = () => {
    const {id}=useParams()

        const axiosPublic=useAxiosPublic()

    const {data:blogs={},isLoading}=useQuery({
        queryKey:['published-blogs'],
        queryFn: async()=>{
            const res=await axiosPublic.get(`/publisedblogs/${id}`)
            return res.data
        }
    })

    

    

    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div className='max-w-4xl mx-auto p-10'>

            <h1 className='text-4xl font-bold mb-6'>{blogs.title}</h1>
            {
                blogs.thumbnail &&(
                    <img src={blogs.thumbnail} alt="" className='w-full h-72 object-cover rounded mb-6'/>
                )
            }

            <div 
            className='prose max-w-none'
            dangerouslySetInnerHTML={{__html:blogs.content}}
            >

            </div>
        </div>
    );
};

export default Blog;