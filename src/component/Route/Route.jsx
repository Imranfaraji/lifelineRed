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
import DashboardHome from "../DashboardComponent/DashboardHome/DashboardHome";
import PrivateRoute from './PrivateRoute'
import Profile from "../../pages/DashbordPage/Profile/Profile";
import CreateDonationRequest from "../DashboardComponent/DonorDashboard/CreateDonationRequest";
import MyDonationRequests from "../DashboardComponent/DonorDashboard/MyDonationRequests";
import RequestDetails from "../DashboardComponent/DonorDashboard/RequestDetails";


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
        {path:'/funding',element:<PrivateRoute><Funding></Funding></PrivateRoute>},
        {path:'/searchdonor',Component: SearchDonor},
        {path:'/dashboard',element:<PrivateRoute><DashboardLayOut></DashboardLayOut></PrivateRoute>,
          children:[
            {index:true ,Component:DashboardHome},
            {path:'myprofile' , Component:Profile},
            {path:'create-donation-request', Component:CreateDonationRequest},
            {path:'my-donation-requests', Component:MyDonationRequests},
            {
              path:'request-details/:id',
              Component:RequestDetails
            }
          ]
        }
      ]
    },
  ]);