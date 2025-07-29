import React, { useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';

const Welcome = () => {
    const {user}=useContext(AuthContext)
    return (
        <div className='bg-white mx-3 dark:bg-gray-800 shadow-md rounded-md p-6 mb-6 mt-6'>

            <div className='flex items-center gap-4'>

                <img src={user?.photoURL} alt="user avatrr" className='w-16 h-16 rounded-full border-2 border-red-500 object-cover'/>

                <div>
                    <h2 className='text-2xl font-semibold text-gray-800 dark:text-white'>
                        WelCoome, {user?.displayName} 👋
                    </h2>

                    <p className='text-gray-600 dark:text-gray-300 mt-1'> 
                        We appreciate your effort to help save lives.
                    </p>
                </div>

            </div>
            
        </div>
    );
};

export default Welcome;
