import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/AuthContext';
import useAxiosSecure from '../../../utilitis/Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../utilitis/Hooks/useAxiosPublic';
import { toast } from 'react-toastify';
import Loading from '../../../pages/Loading/Loading';
import { Link } from 'react-router';

const MyDonationRequests = () => {
    const {user}=useContext(AuthContext)
    const axiosSecure=useAxiosSecure()
    const [status,setStatus]=useState("")
    const [page,setPage]=useState(1)
    const limit=5
    const axiosPublic=useAxiosPublic()

    const  [modalId,setModalId]=useState(null)

    const {data,isPending}=useQuery({
        queryKey:['donation-requests',user?.email,status,page],
        enabled:!!user?.email,
        queryFn: async ()=>{
            const res=await axiosSecure.get(
                `all-donation-requests?email=${user?.email}&page=${page}&limit=${limit}&status=${status}`
            )
            return res.data
        }
    })

    const handleStatue=(id,newStatus)=>{
        axiosPublic.patch(`/updateRequest/${id}`,{status:newStatus}).then(res=>{
            if(res.data.modifiedCount>0){
                toast.success('status update successfully')
            }
        })
    
      }

      const handleDelete=(id)=>{
          axiosPublic.delete(`/requestDelete/${id}`).then(res=>{
              if(res.data.deletedCount){
                  toast.success('Request deleted successfully')
                  document.getElementById('my_modal_3').close()
      
                //   const remainingRequest=topRequest.filter(req=>req._id !== id)
                //   setTopRequest(remainingRequest)
              }
          })
        }

        if(isPending)  {
          return <Loading></Loading>
        }
    return (
        <div>

            <h1 className='text-3xl font-bold text-center my-4'>My Donation Requests</h1>

            <div className='mb-4 text-center'>

                <select onChange={(e)=>{
                    setStatus(e.target.value)
                    setPage(1)
                }} value={status}>
                    <option value="">All</option>
                    <option value="pending">Pending</option>
                    <option value="inprogress">In Progress</option>
                    <option value="canceled">Canceled</option>
                    <option value="done">Done</option>
                </select>

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
                    <th>edit/delete</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {
                    data?.requests?.map((topreq,index)=><tr key={index}>
                        <th>{(page-1) * limit + index + 1}</th>
                        <th>{topreq.recipientName}</th>
                        <th>{topreq.recipientDistrict},{topreq.recipientUpazila}</th>
                        <th>{topreq.donationDate}</th>
                        <th>{topreq.donationTime}</th>
                        <th>{topreq.bloodGroup}</th>
                        <th>{topreq.requestStatus}
                            {
                                topreq.requestStatus=='inprogress' && <div className="mt-1 space-x-1">
                                    <button onClick={()=>handleStatue(topreq._id,'canceled')} className="text-xs p-1 bg-red-600 text-white cursor-pointer rounded">cancel</button>
                                    <button onClick={()=>handleStatue(topreq._id,'done')} className="text-xs p-1 bg-green-600 text-white cursor-pointer rounded">Done</button>
                                </div>
                            }
                        </th>
                        <th className="space-x-1">
                            
                                    <Link to={`/dashboard/request-details/${topreq._id}`} className='text-xs p-1 bg-green-600 text-white cursor-pointer rounded'>Edit</Link>

                                    <button onClick={()=>{
                                        setModalId(topreq._id)
                                        document.getElementById('my_modal_3').showModal()
                                    }}  className="text-xs p-1 bg-red-600 text-white cursor-pointer rounded">Delete</button>
                        </th>
                    </tr>)
                  }
                  
                </tbody>
              </table>

              
            </div>

            

      {/* pagination btn */}

     {
        data?.total>0 &&(
             <div className='flex justify-center gap-2 mt-4 mb-4'>
        {[...Array(Math.ceil(data?.total/limit))].map((_,inx)=>(
            <button
            key={inx}
            onClick={()=>setPage(inx+1)}
            className={`btn btn-sm ${page===inx+1?"btn-primary":""}`}
            >{inx+1}</button>
        ))}

      </div>
        )
     }

            <dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Do you want to delete this request?</p>
    <button className="btn" onClick={()=>handleDelete(modalId)}>Delete</button>
  </div>
</dialog>

            </div>
            
        </div>
    );
};

export default MyDonationRequests;