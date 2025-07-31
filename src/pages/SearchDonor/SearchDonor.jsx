import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../utilitis/Hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const SearchDonor = () => {
    
    const axiosPublic=useAxiosPublic()

    const [searchParams,setSearchParams]=useState(null)

    const [districts,setDistricts]=useState([])
          const [upajelas,setUpajelas]=useState([])
          const [districtId,setDistrictId]=useState('')
          
        
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

         

        const {data:donors=[],refetch,isFetching}=useQuery({
            queryKey:["donors",searchParams],
            queryFn:async()=>{
                if(!searchParams) return [];
                const {bloodGroup,district,upajela}=searchParams;
                const encodedBloodGroup=encodeURIComponent(bloodGroup);
                const res=await axiosPublic.get(`/donors?bloodgroup=${encodedBloodGroup}&district=${district}&upajela=${upajela}`)
                return res.data
            },
            enabled:!! searchParams
        })



          

          const handleSearch=(e)=>{
            e.preventDefault()
            const form=e.target 
            const bloodGroup=form.bloodGroup.value;
            const district=form.district.value
            const upajela=form.upajela.value 
            setSearchParams({bloodGroup,district,upajela})
            refetch()
          }


    return (
        <div className='w-full min-h-screen py-16 bg-gray-100'>

            <h1 className='text-3xl text-center font-bold mb-10'>Search Donors</h1>

            <div className='responsive'>

                <form onSubmit={handleSearch} className='grid md:grid-cols-4 gap-4 md-6'>

                    <select name='bloodGroup' className='input'>
                       <option value="" >select Blood Group</option>
                    <option value="A+" >A+</option>
                    <option value="A-" >A-</option>
                    <option value="B+" >B+</option>
                    <option value="B-" >B-</option>
                    <option value="AB+" >AB+</option>
                    <option value="AB-" >AB-</option>
                    <option value="O+" >O+</option>
                    <option value="O-" >O-</option>
                    </select>

                     <select type="text"
              name="district"
              
              className="input"
              onChange={(e)=>setDistrictName(e.target.value)}
              
              >
                    <option value="select your district" >select  district</option>
                {
                    districts.map((district)=>
                        <option key={district.id}  value={district.name}>{district.name}</option>
                    )
                }

            </select>

            <select type="text"
              name="upajela"
              
              className="input"
              
             >
                    <option value="select your upajela" >select your upajela</option>
                {
                    upajelas.map((district)=>
                        <option key={district.id} value={district.name}>{district.name}</option>
                    )
                }

            </select>

            <button type='submit' className='btn btn-primary'>
                Search
            </button>
                </form>


                <div className='grid items-center justify-center gap-4 mt-10 md:grid-cols-4'>

                    
                    {
                    isFetching?(<p>Loading....</p>):(<>
                     
                     {
                        donors.length==0?(
                            <p>Donors Not Found</p>
                        ):(
                            <>
                            
                            {
                                donors.map(donor=><div className='p-5 bg-white rounded-md shadow text-gray-800 font-bold' key={donor._id}>

                            <h1>Donor Name : {donor.userName}</h1>
                            <h1>Blood Group : {donor.bloodGroup}</h1>
                            <h1>District : {donor.district}</h1>
                            <h1>Upajela : {donor.upajela}</h1>
                        </div>)
                            }
                            
                            </>
                        )
                        
                        
                        
                     }
                    
                    </>)
                }
                </div>

            </div>
            
        </div>
    );
};

export default SearchDonor;