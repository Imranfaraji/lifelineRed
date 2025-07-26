

import React from 'react';
import { Link } from 'react-router';

const ErrorPage = () => {
    return (
        <div className='flex items-center justify-center min-h-screen bg-red-50 px-4'>
            <div className="text-center mx-w-md">

                <h1 className='text-7xl font-bold tex-red-600 '>
                    404
                </h1>

                <h2 className='text-2xl font-semibold mt-4 text-gray-800'>Page Not Found</h2>

                <p className='text-gray-600 mt-2'>Sorry, the page you're looking doesn't or has been moved.</p>

                <div className='mt-6'>

                    <Link to={'/'} className='btn btn-error text-white'>Back to Home</Link>

                </div>

            </div>
            
        </div>
    );
};

export default ErrorPage;
