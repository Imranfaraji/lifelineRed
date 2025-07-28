import {
    createBrowserRouter,
    
  } from "react-router";
import Root from "../Root/Root";
import Home from "../../pages/Home/Home";
import ErrorPage from "../../pages/ErrorPage/errorPage";
import SignUp from "../../pages/SignUp/SignUp";


 export const router = createBrowserRouter([
    {
      path: "/",
      errorElement:<ErrorPage></ErrorPage>,
      element: <Root></Root>,
      children:[
        {index:true, Component:Home},
        {path:'/signup', Component:SignUp}
      ]
    },
  ]);