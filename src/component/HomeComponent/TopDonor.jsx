import React from 'react';
import useAxiosPublic from '../../utilitis/Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../pages/Loading/Loading';

const TopDonor = () => {
    const axiosPublic=useAxiosPublic()
    const {data:fourDonor,isPending,isError}=useQuery({
        queryKey:['fourDonor'],
        queryFn: async ()=>{
            const res= await axiosPublic.get('/four-donors');
            return res.data
        }
    })

    console.log(fourDonor)
    if(isPending){
        return <Loading></Loading>
    }

    if(isError){
        return <p className='text-center text-red-500 bg-red-50 py-16'>Something went wrong!</p>
    }
    return (
        <div className='bg-gray-50 w-full py-16'>

             <div className="text-center px-2 md:px-0 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Recent  <span className="text-red-600">Donors</span>
        </h2>
        <p className="text-gray-600 mt-4">
          Meet our latest heroes who stepped forward to save lives.
        </p>
      </div>

       <div className='responsive grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-stretch gap-8'>

        {
            fourDonor.map(donor=>(
                <div key={donor._id} className="bg-white shadow-md rounded-xl p-4 text-center hover:shadow-lg transition duration-300">
        
        {/* Donor Image */}
        <img 
          src={donor.photoUrl || "https://i.ibb.co/MBtjqXQ/default-avatar.png"} 
          alt={donor.userName} 
          className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-red-500"
        />

        {/* Donor Name */}
        <h3 className="text-lg font-bold text-gray-800 mt-4">{donor.userName}</h3>
        
        {/* Blood Group */}
        <p className="text-red-600 font-semibold">{donor.bloodGroup}</p>
        
        {/* Location */}
        <p className="text-gray-500 text-sm">
          {donor.district}, {donor.upazila}
        </p>

        {/* Button */}
        <button className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
          View Profile
        </button>
      </div>
            ))
        }

       </div>
            
        </div>
    );
};

export default TopDonor;