import {
    createBrowserRouter,
    
  } from "react-router";
import Root from "../Root/Root";
import Home from "../../pages/Home/Home";
import ErrorPage from "../../pages/ErrorPage/errorPage";
import SignUp from "../../pages/SignUp/SignUp";
import Login from "../../pages/Login/Login";
import DonorRequest from "../../pages/DonorRequest/DonorRequest";

import Funding from "../../pages/Funding/Funding";
import SearchDonor from "../../pages/SearchDonor/SearchDonor";
import DashboardLayOut from "../../pages/DashboardLayOut/DashboardLayOut";
import DashboardHome from "../DashboardComponent/DashboardHome/DashboardHome";
import PrivateRoute from './PrivateRoute'
import Profile from "../../pages/DashbordPage/Profile/Profile";
import CreateDonationRequest from "../DashboardComponent/DonorDashboard/CreateDonationRequest";
import MyDonationRequests from "../DashboardComponent/DonorDashboard/MyDonationRequests";
import RequestDetails from "../DashboardComponent/DonorDashboard/RequestDetails";
import DonerRequestDetails from "../../pages/DonorRequest/DonerRequestDetails";
import AllUsers from "../../pages/AdminDashboard/AllUsers";
import AllDonationRequest from "../../pages/AdminDashboard/AllDonationRequest";
import ContentManagement from "../../pages/AdminDashboard/ContentManagement";
import AddBlog from "../../pages/AdminDashboard/AddBlog";
import AllRequest from "../../pages/Volunteer/AllRequest";
import AddBlogs from "../../pages/Volunteer/AddBlogs";
import ContentManagements from "../../pages/Volunteer/ContentManagements";
import Blogs from "../../pages/Blogs/Blogs";
import Blog from "../../pages/Blogs/Blog";
import GiveFundPage from "../../pages/Funding/GiveFundPage";





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
        {path:'/blog',Component: Blogs},
        {path:'/funding',element:<PrivateRoute><Funding></Funding></PrivateRoute>},
        {path:'/searchdonor',Component: SearchDonor},
        {path:'/all-pending-request/:id',element:<PrivateRoute><DonerRequestDetails></DonerRequestDetails></PrivateRoute>},
        {path:"/blogs/:id", Component:Blog},


        {path:'/funding/give', Component:GiveFundPage},

        
        {path:'/dashboard',element:<PrivateRoute><DashboardLayOut></DashboardLayOut></PrivateRoute>,
          children:[
            {index:true ,Component:DashboardHome},
            {path:'myprofile' , Component:Profile},
            {path:'create-donation-request', Component:CreateDonationRequest},
            {path:'my-donation-requests', Component:MyDonationRequests},
            {
              path:'request-details/:id',
              Component:RequestDetails
            },
            {
              path:'allusers',
              Component:AllUsers
            },
            {
              path:'all-blood-donation-requests',
              Component:AllDonationRequest
            },
            {
              path:'content-managements',
              Component:ContentManagement
            },{
              path:'addblog',
              Component:AddBlog
            },
            {
              path:'all-blood-donation-request',
              Component:AllRequest
            },{
              path:'addblogs',
              Component:AddBlogs
            },
            {
              path:'content-management',
              Component:ContentManagements
            }
           
          ]
        }
      ]
    },
  ]);