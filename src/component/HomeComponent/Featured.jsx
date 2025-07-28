import React from 'react';
import { FaHandsHelping, FaTint, FaUserPlus } from 'react-icons/fa';

const Featured = () => {
    return (
        <div className='py-16 bg-gray-50 text-gray-800'>

            <div className='responsive'>

                <h2 className='text-3xl md:text-4xl font-bold text-center mb-6'> Why Choose Us? </h2>

                <p className='text-center text-lg max-w-3xl mx-auto'>
                     We are committed to making blood donation easier, safer, and more impactful for donors and recipients alike.
       
                </p>

                <div className='grid gap-8 md:grid-cols-3'>



                    {/* featured-1 */}
                    <div className='bg-white p-8 rounded-lg shadow hover:shadow transition'>

                        <FaTint className='text-red-600 text-4xl mb-4'></FaTint>

                        <h3 className='text-xl font-semibold mb-2'>Easy Blood Request</h3>
                        <p>
                             
                             Request blood in just a few clicks and get matched with verified donors nearby.
            
                        </p>

                    </div>


                    {/* featured-2 */}
                    <div className='bg-white p-8 rounded-lg shadow hover:shadow transition'>

                        <FaUserPlus className='text-blue-600 text-4xl mb-4'></FaUserPlus>

                        <h3 className='text-xl font-semibold mb-2'>Trusted & Veified </h3>
                        <p>
                               
                               
                               Every donor and request is verified to ensure safety and trust in the donation process.
            
                        </p>

                    </div>


                    {/* featured-3 */}
                    <div className='bg-white p-8 rounded-lg shadow hover:shadow transition'>

                        <FaHandsHelping className='text-green-600 text-4xl mb-4'></FaHandsHelping>

                        <h3 className='text-xl font-semibold mb-2'>Easy Blood Request</h3>
                        <p>
                             Request blood in just a few clicks and get matched with verified donors nearby.
            
                        </p>

                    </div>

                    
                </div>

            </div>
            
        </div>
    );
};

export default Featured;