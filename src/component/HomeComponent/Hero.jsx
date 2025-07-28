import React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { FaSearch } from "react-icons/fa";

const Hero = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          "url(https://i.ibb.co/DfM8Dm9r/nguy-n-hi-p-ufw-C2cmbaa-I-unsplash.jpg)",
      }}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <motion.h1
            initial={{ scale: 0 }}
            animate={{ scale: 1, transition: { duration: 2 } }}
            className="mb-5 text-5xl font-bold"
          >
           
            Donate Blood,{" "}
            <motion.span
              animate={{
                color: ["#50cc0d", "#33ff33", "#5ff60e"],
                transition: { duration: 4, repeat: Infinity },
              }}
            >
            Save Life
            </motion.span>{" "}
          </motion.h1>
          <motion.p
            className="mb-5"
            

            initial={{opacity:0,y:50}}
            animate={{opacity:1,y:0}}
            transition={{duration:2, ease:'easeOut'}}
          
          >
            
            Thousands need blood every day -your small act can make a big difference. Become a donor and be the hope they're waiting for.
          </motion.p>
          <motion.div
          initial={{opacity:0,y:50}}
            animate={{opacity:1,y:0}}
            transition={{duration:3, ease:'easeOut'}}
          className="flex items-center flex-col space-y-2">
            
           <div className="mt-3">
             <Link
              className="border hover:bg-red-900 px-3 py-2 "
              to={"/searchdonor"}
            >
              Search Donors
            </Link>
            <Link
              className="border  bg-red-700 hover:bg-red-900 px-3 py-2 hover:bg-none"
              to={"/signup"}
            >
              Join as a donor
            </Link>
           </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
