import {
    createBrowserRouter,
    
  } from "react-router";
import Root from "../Root/Root";
import Home from "../../pages/Home/Home";
import ErrorPage from "../../pages/ErrorPage/errorPage";


 export const router = createBrowserRouter([
    {
      path: "/",
      errorElement:<ErrorPage></ErrorPage>,
      element: <Root></Root>,
      children:[
        {index:true, Component:Home},
      ]
    },
  ]);