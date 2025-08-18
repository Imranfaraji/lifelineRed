import React, { useContext } from "react";
import {
  FaFacebook,
  FaInstagramSquare,
  FaLinkedin,
  FaPhone,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { Link } from "react-router";
import { AuthContext } from "../Context/AuthContext";
import { NavLink } from "react-router";

const Footer = () => {
  const {user}=useContext(AuthContext)
  return (
    <div className="bg-neutral w-full">
      <footer className=" w-full px-2 md:px-0 md:w-11/12 md:mx-auto text-neutral-content p-10 flex flex-col md:flex-row md:items-center gap-2 justify-between">
        {/* logo */}
        <div className="space-y-2">
          <Link to={"/"} className="flex items-center  justify-start ">
            
              <h1 className="md:text-4xl text-2xl font-extrabold text-gray-700">Lifeline<span className="text-red-700">Red</span></h1>
            
          </Link>

          <small>
            © {new Date().getFullYear()} ShareBite. All rights reserved.
          </small>
        </div>

        {/* contract information */}

        <div className="md:space-y-2">
          <div className="flex items-center gap-1 font-bold text-lg">
            <ul className="text-white">
            <li>
              <NavLink className={({isActive})=>isActive?'text-red-500 font-bold':'text-gray-600'} to={'/'}>Home</NavLink>
            </li>
            <li>
              <NavLink className={({isActive})=>isActive?'text-red-500 font-bold':'text-gray-600'} to={'/donorrequest'}>Donation requests</NavLink>
            </li>
            <li>
              <NavLink className={({isActive})=>isActive?'text-red-500 font-bold':'text-gray-600'} to={'/blog'}>Blog</NavLink>
            </li>
            {
                       user&& <>
                       <li>
                         <NavLink className={({isActive})=>isActive?'text-red-500 font-bold':'text-gray-600'} to={'/donor'}>All Donor</NavLink>
                       </li>
                       <li>
                         <NavLink className={({isActive})=>isActive?'text-red-500 font-bold':'text-gray-600'} to={'/funding'}>Funding</NavLink>
                       </li>
                       
                       </>
                      }
            
          </ul>
          </div>
        </div>

        {/* social icon */}

        <div>
          <h1 className="text-xl font-bold italic">Follow us on.</h1>

          <div className="flex items-center gap-2 mt-2">
            <a
              target="_blank"
              href="https://www.facebook.com/imranhosen.borhany"
            >
              <FaFacebook />
            </a>
            <a target="_blank" href="https://www.instagram.com/imran_2k20/">
              <FaInstagramSquare />
            </a>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/imran-hosen-a4814b363/"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
