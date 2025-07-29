import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import {
  
  RouterProvider,
} from "react-router";
import { router } from './component/Route/Route.jsx';
import { ToastContainer } from 'react-toastify';
import AuthProvider from './component/Context/AuthProvider.jsx';

import {
  QueryClient,
  QueryClientProvider,
  
} from '@tanstack/react-query'

const queryClient = new QueryClient()



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
     
        <>
         <RouterProvider router={router} />
          <ToastContainer />
        </>
      
    </AuthProvider>
    </QueryClientProvider>
     
  </StrictMode>,
)
