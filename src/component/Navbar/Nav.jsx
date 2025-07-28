import React, { useContext } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../Context/AuthContext";

const Nav = () => {
  const { user, handlesignOut } = useContext(AuthContext);
  return (
    <div className="w-full bg-white shadow-sm">
      <div className="navbar responsive">
        <div className="navbar-start ">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <Link to={"/"}>
            <h1 className="md:text-4xl text-2xl font-extrabold text-gray-700">
              Lifeline<span className="text-red-700">Red</span>
            </h1>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
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
            user&& <li>
              <NavLink className={({isActive})=>isActive?'text-red-500 font-bold':'text-gray-600'} to={'/funding'}>Funding</NavLink>
            </li>
           }
            
          </ul>
        </div>
        <div className="navbar-end flex gap-2">
          {user ? (
            <>
              {/* change popover-1 and --anchor-1 names. Use unique names for each dropdown */}
              {/* For TSX uncomment the commented types below */}
              <button
                className=""
                popoverTarget="popover-1"
                style={
                  { anchorName: "--anchor-1" } /* as React.CSSProperties */
                }
              >
                <div className="avatar">
                  <div className=" ring-offset-base-100 h-12 w-12 rounded-full ring-2 ring-offset-2">
                    <img src={user?.photoURL} />
                  </div>
                </div>
              </button>

              <ul
                className="dropdown menu mt-3 p-2 space-y-2 rounded-box bg-base-100 shadow-sm"
                popover="auto"
                id="popover-1"
                style={
                  { positionAnchor: "--anchor-1" } /* as React.CSSProperties */
                }
              >
                <li>
                  <Link to={'/dashboard'}>Dashbord</Link>
                </li>
                <li>
                  <button onClick={() => handlesignOut()} className="cta">
                LogOut
              </button>
                </li>
              </ul>
              
            </>
          ) : (
            <>
              <Link className="cta" to={"/login"}>
                Login
              </Link>
              <Link className="cta" to={"/signup"}>
                SignUp
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
