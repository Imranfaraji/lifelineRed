import React, { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../Context/AuthContext';
import useAxiosPublic from '../../../utilitis/Hooks/useAxiosPublic';
import { toast } from 'react-toastify';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../utilitis/Hooks/useAxiosSecure';
import Loading from '../../../pages/Loading/Loading';


const CreateDonationRequest = () => {

    const {user}=useContext(AuthContext)

    const axiosPublic=useAxiosPublic()

    const axiosSecure=useAxiosSecure()

    


    
    
       const [districts,setDistricts]=useState([])
      const [upajelas,setUpajelas]=useState([])
      const [districtId,setDistrictId]=useState('')
      const [userData,setUserData]=useState({})
    
      const [districtName,setDistrictName]=useState('')
    
     const districtFilter=districts.filter(disFil=>disFil.name===districtName)
    
     useEffect(()=>{
        districtFilter.map(disId=>{
            setDistrictId(disId.id)
        })
     })
    
    
      useEffect(()=>{
        fetch('/districts.json').then(res=>res.json()).then(data=>setDistricts(data))
        fetch('/upajelas.json').then(res=>res.json()).then(data=>{
            const filterUpajela=data.filter(x=>x.district_id==districtId)
            if(filterUpajela){
                setUpajelas(filterUpajela)
            }
        })
      },[setDistricts,setUpajelas,districtId])

      const {data:profile={},isPending}=useQuery({
        queryKey:['user-profile',user?.email],
        enabled:!! user?.email,
        queryFn: async ()=>{
            const res=await axiosSecure.get(`/users-role?email=${user?.email}`);
            setUserData(res.data)
            return res.data
        }
    });

    
    


    

    const handleRequest=e=>{
        e.preventDefault()

        const form=e.target;
        const formData=new FormData(form);
        const requestData=Object.fromEntries(formData.entries())
        requestData.requestStatus="pending";

        const now=new Date()
        requestData.requestTime=now.toISOString()

        if(userData.status !=="active"){
          toast.error('something went wrong')
          return
        }


        axiosPublic.post('/requests',requestData).then(res=>{
            if(res.data.insertedId){
                      toast.success("SuccessFully signUp!")
                      form.reset()
                    }
        })
    }

    if(isPending) return <Loading></Loading>

    

    
    return (
        <div className='w-full bg-red-50 py-16 min-h-screen flex items-center justify-center'>
            

            <div className='responsive'>
                   <h2 className='text-4xl font-bold text-gray-800 text-center'>Create Donation Request</h2>
                <form
            onSubmit={handleRequest}
            className=" flex flex-col gap-3 mt-5 text-white "
          >
            <label className=" text-sm font-bold text-gray-800">Requester name</label>
            <input
              type="text"
              name="requesterName"
              
              className="input text-red-400 text-sm font-medium w-full"
              value={user?.displayName}
              readOnly
            />

            <label className=" text-sm font-bold text-gray-800">Requester Email</label>
            <input
              type="email"
              name="requesterEmail"
              readOnly
              className="input text-red-400 text-sm font-medium w-full"
              value={user?.email}
            />

            <label className=" text-sm font-bold text-gray-800">Recipient name</label>
            <input
              type="text"
              name="recipientName"
              required
              className="input text-red-400 text-sm font-medium w-full"
              placeholder="recipient name"
            />


           
            <label className=" text-sm font-bold text-gray-800">Recipient district</label>
            <select type="text"
              name="recipientDistrict"
              required
              className=" text-red-400 text-sm font-medium bg-white p-2 rounded-sm w-full"
              onChange={(e)=>setDistrictName(e.target.value)}
              
              placeholder="District">
                    <option value="select your district" >select  district</option>
                {
                    districts.map((district)=>
                        <option key={district.id}  value={district.name}>{district.name}</option>
                    )
                }

            </select>

            <label className=" text-sm font-bold text-gray-800">Recipient upazila</label>

            <select type="text"
              name="recipientUpazila"
              required
              className=" text-red-400 text-sm font-medium bg-white p-2 rounded-sm w-full"
              
              placeholder="Upajela">
                    <option value="select your upajela" >select your upajela</option>
                {
                    upajelas.map((district)=>
                        <option key={district.id} value={district.name}>{district.name}</option>
                    )
                }

            </select>

             <label className=" text-sm font-bold text-gray-800">Hospital name</label>
            <input
              type="text"
              name="hospitalName"
              required
              className="input text-red-400 text-sm font-medium w-full"
              placeholder="Hospital name"
            />

             <label className=" text-sm font-bold text-gray-800">Full address line</label>
            <input
              type="text"
              name="fullAddress"
              required
              className="input text-red-400 text-sm font-medium w-full"
              placeholder="full address "
            />

            <label className=" text-sm font-bold text-gray-800">Blood Group</label>
            <select type="text"
              name="bloodGroup"
              required
              className=" text-red-400 text-sm font-medium bg-white p-2 rounded-sm w-full"
              
              
              placeholder="District">
                    <option value="select your Blood Group" >select Blood Group</option>
                    <option value="A+" >A+</option>
                    <option value="A_" >A-</option>
                    <option value="B+" >B+</option>
                    <option value="B-" >B-</option>
                    <option value="AB+" >AB+</option>
                    <option value="AB-" >AB-</option>
                    <option value="O+" >O+</option>
                    <option value="O-" >O-</option>
                

            </select>


             <label className=" text-sm font-bold text-gray-800">Donation date</label>
            <input
              type="date"
              name="donationDate"
              required
              className="input text-red-400 text-sm font-medium w-full"
              
            />
             <label className=" text-sm font-bold text-gray-800">Donation time</label>
            <input
              type="time"
              name="donationTime"
              required
              className="input text-red-400 text-sm font-medium w-full"
              
            />
             <label className=" text-sm font-bold text-gray-800">Request message</label>
            <textarea
              type="time"
              name="requestMessage"
              required
              className="input text-red-400 text-sm font-medium w-full"
              
            />

             

           
           

           

            <button className="btn bg-red-500 text-white border-none w-full mt-4">
              Request
            </button>
          </form>

            </div>

            
            
        </div>
    );
};

export default CreateDonationRequest;