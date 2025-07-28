import React, { useContext, useEffect, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../component/Context/AuthContext";
import Lottie from "lottie-react";

import signup from "../../Annimations/signup.json"
import useAxiosPublic from "../../utilitis/Hooks/useAxiosPublic";


const SignUp = () => {

  const axiosPublic=useAxiosPublic()

  
  const {createUser,UpdateUserProfile} = useContext(AuthContext);

  const [districts,setDistricts]=useState([])
  const [upajelas,setUpajelas]=useState([])
  const [districtId,setDistrictId]=useState('')

  const [districtName,setDistrictName]=useState('')
  

  const [errore, setError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();

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

 

 



  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const userName=e.target.name.value;
    const photoUrl=e.target.photoUrl.value
    const retypepassword=e.target.retypepassword.value;
    const bloodGroup=e.target.bloodGroup.value;
    const district=e.target.district.value;
    const upajela=e.target.upajela.value;
    const user={
      email,userName,photoUrl,bloodGroup,district,upajela,role:'donor',status:"active"
    }
    
       
       setError("")
    const passregex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    if(!passregex.test(password)){
      setError('Password muse be at least 6 characters, and include a capital letter , a number and a special characters.')
      return toast.error(errore)
    }

    if(password!==retypepassword){
        return toast.error('password not match!')
    }


    
      setError("")
    createUser(email,password).then(()=>{
      
      axiosPublic.post('/users',user).then(res=>{
        if(res.data.insertedId){
          toast.success("SuccessFully signUp!")
        }
      })

      setError('')
      UpdateUserProfile(userName,photoUrl).then(()=>{

      }).catch(error=>{
        setError("User update failed :" 
          +error.message
         )
         toast.error(errore)
      })
      navigate(location?.state || "/");
    }).catch(error=>{
       if(error.code==='auth/email-already-in-use'){
        setError('This email is already register.Please try another email!')
      }else if(error.code==='auth/weak-password'){
        setError('Password is too weak. Please use at least 6 chereacters')
      }else{
        setError(error.message)
        toast.error(errore)
      }
    })
  };

  return (
    <div className={`w-full bg-red-50 min-h-screen flex items-center justify-center`}>

      <title>Registration</title>
      <div className="md:w-[60%]  py-15 md:mx-auto w-full flex  ">
        <div className="lg:w-1/2 w-11/12 bg-gray-500 p-2   rounded-2xl lg:rounded-none lg:rounded-l-2xl">
          <div className="w-full text-center py-5">
            <h1 className="text-2xl font-extrabold text-white">SignUp Now!</h1>
          </div>
          <form
            onSubmit={handleSignIn}
            className=" flex flex-col gap-3 text-white "
          >
            <label className=" text-sm font-bold text-white">Name</label>
            <input
              type="text"
              name="name"
              required
              className="input text-red-400 text-sm font-medium w-full"
              placeholder="Name"
            />

            <label className=" text-sm font-bold text-white">Email</label>
            <input
              type="email"
              name="email"
              required
              className="input text-red-400 text-sm font-medium w-full"
              placeholder="Email"
            />

            <label className=" text-sm font-bold text-white">Photo Url</label>
            <input
              type="text"
              name="photoUrl"
              required
              className="input text-red-400 text-sm font-medium w-full"
              placeholder="Photo Url"
            />
            <label className=" text-sm font-bold text-white">Blood Group</label>
            <select type="text"
              name="bloodGroup"
              required
              className=" text-red-400 text-sm font-medium bg-white p-2 rounded-sm w-full"
              
              
              placeholder="District">
                    <option value="select your Blood Group" >select your Blood Group</option>
                    <option value="A+" >A+</option>
                    <option value="A_" >A-</option>
                    <option value="B+" >B+</option>
                    <option value="B-" >B-</option>
                    <option value="AB+" >AB+</option>
                    <option value="AB-" >AB-</option>
                    <option value="O+" >O+</option>
                    <option value="O-" >O-</option>
                

            </select>
            <label className=" text-sm font-bold text-white">District</label>
            <select type="text"
              name="district"
              required
              className=" text-red-400 text-sm font-medium bg-white p-2 rounded-sm w-full"
              onChange={(e)=>setDistrictName(e.target.value)}
              
              placeholder="District">
                    <option value="select your district" >select your district</option>
                {
                    districts.map((district)=>
                        <option key={district.id}  value={district.name}>{district.name}</option>
                    )
                }

            </select>

            <label className=" text-sm font-bold text-white">Upajela</label>

            <select type="text"
              name="upajela"
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

             <div className="relative">
              <label className="text-sm font-bold text-white">Password</label>
              <input
                required
                name="password"
                type={showPass ? "text" : "password"}
                className="input text-red-600 text-sm font-medium w-full"
                placeholder="Password"
              />

              <div
                onClick={() => setShowPass(!showPass)}
                className="absolute z-50 text-lg text-black p-2 cursor-pointer bg right-2 top-7 "
              >
                {showPass ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>
            </div>

            <div className="relative">
              <label className="text-sm font-bold text-white">Re-type Password</label>
              <input
                required
                name="retypepassword"
                type={showPass ? "text" : "password"}
                className="input text-red-600 text-sm font-medium w-full"
                placeholder="Re-type Password"
              />

              <div
                onClick={() => setShowPass(!showPass)}
                className="absolute z-50 text-lg text-black p-2 cursor-pointer bg right-2 top-7 "
              >
                {showPass ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>
            </div>
           

           

            <button className="btn bg-red-500 text-white border-none w-full mt-4">
              SignUp
            </button>
          </form>
          
          

          <p className="text-white mt-3">
            have an aacount?{" "}
            <Link className="text-blue-400 underline" to={"/login"}>
              LogIn
            </Link>
          </p>
        </div>

        <div className="hidden lg:flex bg-white  w-1/2  rounded-r-2xl bg-cover bg-center bg-norepeat">
         <Lottie animationData={signup} loop={true}></Lottie>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
