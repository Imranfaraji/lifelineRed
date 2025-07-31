import React, { useContext, useState } from 'react';
import { useParams } from 'react-router';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from '../../component/Context/AuthContext';
import useAxiosPublic from '../../utilitis/Hooks/useAxiosPublic';
import { toast } from 'react-toastify';

const DonerRequestDetails = () => {

    const {id}=useParams()
    const {user}=useContext(AuthContext)

    const axiosPublic=useAxiosPublic()

    const [details,setDetails]=useState({})

    const {requesterName,requesterEmail,recipientName,recipientDistrict,
recipientUpazila,hospitalName,fullAddress,bloodGroup,donationDate,
donationTime,
requestMessage,
requestStatus}=details
    

    const { data: profile = {}, isPending } = useQuery({
    queryKey: ["user-profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `https://lifeline-red-server.vercel.app/details/${id}`
      );
      setDetails(res.data);
      return res.data;
    },
  });

   const handleStatue=(id)=>{
          axiosPublic.patch(`/updateRequest/${id}`,{status:"inprogress"}).then(res=>{
              if(res.data.modifiedCount>0){
                  toast.success('status update successfully')
                  document.getElementById('my_modal_3').close()
              }
          })
      
        }

    

    if(isPending) return <p>Loading....</p>
    return (
        <div className='w-full min-h-screen flex items-center justify-center'>

          <title>Donate</title>

          

          <div className='space-y-2 text-gray-800'>

            <p><strong>Requester Name : </strong>{requesterName}</p>
            <p><strong>Requester Email : </strong>{requesterEmail}</p>
            <p><strong>Recipient Name : </strong>{recipientName}</p>
            <p><strong>Recipient District : </strong>{recipientDistrict}</p>
            <p><strong>Recipient Upajela : </strong>{recipientUpazila}</p>
            <p><strong>Hospital Name : </strong>{hospitalName}</p>
            <p><strong>Full Adreess : </strong>{fullAddress}</p>
            <p><strong>blood Group : </strong>{bloodGroup}</p>
            <p><strong>Donation date : </strong>{donationDate}</p>
            <p><strong>Donation Time : </strong>{donationTime}</p>
            <p><strong>Message : </strong>{requestMessage}</p>
            <p><strong>Request Status : </strong>{requestStatus}</p>

            <button onClick={()=>document.getElementById('my_modal_3').showModal()} className='btn'>Donate</button>



            

            



          </div>

          {/* You can open the modal using document.getElementById('ID').showModal() method */}

<dialog id="my_modal_3" className="modal">
  <div className="modal-box">
    <form method="dialog">
      
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <h3 className="font-bold text-lg">Confirme Donate!</h3>
  <div className='space-y-2 flex flex-col items-center justify-center'>
      <input readOnly type="text" value={user?.email} className='input'/>
    <input readOnly type="text" value={user?.displayName} className='input'/>

    <button onClick={()=>handleStatue(id)} className='btn'>Confirme</button>
  </div>
  </div>
</dialog>

            
            
        </div>
    );
};

export default DonerRequestDetails;