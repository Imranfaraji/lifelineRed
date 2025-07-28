import React, { useContext, useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router";

import { toast } from "react-toastify";
import { AuthContext } from "../../component/Context/AuthContext";
import Lottie from "lottie-react";
import login from '../../Annimations/login.json'




const Login = () => {
  
  const [showPass, setShowPass] = useState(false);
  const { createUserWithGoogle, handleLoginWithEmailPass} =
    useContext(AuthContext);
  const [errore, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const resetPass = (e) => {
    e.preventDefault();

    const emailValue = document.getElementById("email")?.value;
    setError("");
    if (!emailValue) {
      toast.error("plase provide your email");
    } else {
      
      toast.error("This feature is not recommended on assignment 11")
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setError("");
    handleLoginWithEmailPass(email, password)
      .then(() => {
        toast.success("Successfully login!");
        navigate(location?.state || "/");
      })
      .catch((error) => {
        setError(error.message);
        toast.error(errore)
        
      });
  };

  const handleUserWithGoogle = () => {
    setError("");
    createUserWithGoogle()
      .then(() => {
        toast.success("LogIn successfully!");

        navigate(location?.state || "/");
      })
      .catch((error) => {
        setError(error.message);
        toast.error(errore)
      });
  };
  return (
    <div
      className={`w-full bg-red-50 min-h-screen flex items-center justify-center `}
    >
      <title>LogIn</title>
      <div className="md:w-[60%] py-15 md:mx-auto w-full flex items-center justify-center">
        
          <div className="hidden bg-white lg:flex w-1/2 h-[500px] rounded-l-2xl bg-cover bg-center bg-norepeat">
          <Lottie animationData={login} loop={true}></Lottie>
          </div>
        

        <div className="lg:w-1/2 w-11/12 p-2 bg-gray-500 h-[500px] rounded-2xl lg:rounded-none lg:rounded-r-2xl">
          <div className="w-full text-center py-5">
            <h1 className="text-2xl font-extrabold text-white">LogIn Now!</h1>
          </div>
          <form
            onSubmit={handleLogin}
            className=" flex flex-col gap-3 text-white "
          >
            <label className=" text-sm font-bold text-white">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              required
              className="input text-red-400 text-sm font-medium w-full"
              placeholder="Email"
            />
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

            

            <div>
              <a
                onClick={resetPass}
                className="link text-sm font-bold link-hover"
              >
                Forgot password?
              </a>
            </div>
            <button className="btn bg-red-500 text-white border-none w-full mt-4">
              Login
            </button>
          </form>
          <div className="py-3 text-center">
            <h1 className="text-xl text-white text-bold">-OR-</h1>
          </div>
          <button
            onClick={handleUserWithGoogle}
            className="btn bg-white w-full text-black border-[#e5e5e5]"
          >
            <svg
              aria-label="Google logo"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>

          <p className="text-white mt-3">
            Don't have an aacount?{" "}
            <Link className="text-blue-400 underline" to={"/signup"}>
              Registration
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
