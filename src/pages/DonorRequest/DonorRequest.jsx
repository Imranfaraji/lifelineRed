import React, { useState } from 'react';
import useAxiosPublic from '../../utilitis/Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

const DonorRequest = () => {
  const axiosPublic=useAxiosPublic()
  const [page,setPage]=useState(1)
  const limit=10

  const {data,isLoading,error}=useQuery({
    queryKey:['pending-request',page],
    queryFn: async()=>{
        const res=await axiosPublic(`/all-pending-request?page=${page}&limit=${limit}`)
        return res.data
    }
  })

  console.log(data)

  if(isLoading) return <p className='tex-center'>Loading......</p>
  if(error) return  <p className='text-center text-red-600'>error fetching data</p>

    return (
        <div className='w-full bg-red-50 py-16'>

          <title>Doner Request</title>

            <h1 className='text-2xl font-bold text-center mb-4'> This Donor Request page</h1>
            <div className='responsive mt-10'>

                     <div className="overflow-x-auto mt-10 rounded-box border border-base-content/5 bg-base-100">
                                 <table className="table ">
                                   {/* head */}
                                   <thead className="bg-red-600 text-white">
                                     <tr>
                                       <th>Index</th>
                                       <th>recipient name</th>
                                       <th>recipient location</th>
                                       <th>donation date</th>
                                       <th>donation time</th>
                                       <th>blood group</th>
                                       <th>donation status</th>
                                       <th>View details</th>
                                       
                                     </tr>
                                   </thead>
                                   <tbody>
                                     {/* row 1 */}
                                     {
                                       data?.result?.map((topreq,index)=><tr key={index}>
                                           <th>{(page-1) * limit + index + 1}</th>
                                           <th>{topreq.recipientName}</th>
                                           <th>{topreq.recipientDistrict},{topreq.recipientUpazila}</th>
                                           <th>{topreq.donationDate}</th>
                                           <th>{topreq.donationTime}</th>
                                           <th>{topreq.bloodGroup}</th>
                                           <th>{topreq.requestStatus}
                                               
                                           </th>
                                           <th >

                                            <Link to={`/all-pending-request/${topreq._id}`} className='btn bg-primary btn-sm text-white'>View</Link>
                                               
                                                       
                                           </th>
                                       </tr>)
                                     }
                                     
                                   </tbody>
                                 </table>

                                 <div className='flex justify-center gap-4 py-2 mt-6'>

                                    <button className='btn' disabled={page<=1} onClick={()=>setPage(page-1)}>
                                        Prev
                                    </button>

                                    <span>page {page}</span>

                                    <button className='btn' onClick={()=>setPage(page+1)}>
                                        Netx
                                    </button>

                                 </div>
                   
                                 
                               </div>

            </div>
            
        </div>
    );
};

export default DonorRequest;