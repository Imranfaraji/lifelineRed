import {
    createBrowserRouter,
    
  } from "react-router";
import Root from "../Root/Root";
import Home from "../../pages/Home/Home";
import ErrorPage from "../../pages/ErrorPage/errorPage";
import SignUp from "../../pages/SignUp/SignUp";
import Login from "../../pages/Login/Login";
import DonorRequest from "../../pages/DonorRequest/DonorRequest";
import Blog from "../../pages/Blog/Blog";
import Funding from "../../pages/Funding/Funding";
import SearchDonor from "../../pages/SearchDonor/SearchDonor";
import DashboardLayOut from "../../pages/DashboardLayOut/DashboardLayOut";


 export const router = createBrowserRouter([
    {
      path: "/",
      errorElement:<ErrorPage></ErrorPage>,
      element: <Root></Root>,
      children:[
        {index:true, Component:Home},
        {path:'/signup', Component:SignUp},
        {path:'/login',Component: Login},
        {path:'/donorrequest',Component: DonorRequest},
        {path:'/blog',Component: Blog},
        {path:'/funding',Component: Funding},
        {path:'/searchdonor',Component: SearchDonor},
        {path:'/dashboard',Component:DashboardLayOut}
      ]
    },
  ]);