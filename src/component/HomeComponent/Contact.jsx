import React from 'react';

const Contact = () => {
    return (
        <div className='py-16 bg-white text-gray-800'>

            <div className='responsive'>

                <h2 className='text-3xl md:text-4xl font-bold text-center mb-4'>
                    Contact Us
                </h2>

                <p className='text-center text-lg md-12 max-w-2xl mx-auto'>
                    Have questions, suggestions, or need help? We're here for you. Fill out the form and we'll get back to you shortly.
                </p>

                <div className='grid md:grid-cols-2 mt-10 gap-10'>

                    <form className='space-y-6 bg-gray-50 p-8 rounded-lg shadow'>
                        <div>
                            <label className='block mb-2 font-medium'>Your Name</label>
                            <input type="text" placeholder='Enter your name' className='w-full border py-2 border-gray-300 px-4  rounded focus:outline-none focus:ring-2 focus:ring-red-500'/>
                        </div>

                        <div>
                            <label className='block mb-2 font-medium'>Email</label>
                            <input type="text" placeholder='Enter your Email' className='w-full border py-2 border-gray-300 px-4  rounded focus:outline-none focus:ring-2 focus:ring-red-500'/>
                        </div>

                        <div>
                            <label className='block mb-2 font-medium'>Message</label>
                            
                            <textarea rows='5' type="text" placeholder='Type your message....' className='w-full border py-2 border-gray-300 px-4  rounded focus:outline-none focus:ring-2 focus:ring-red-500'/>
                        </div>

                        <button className='cta w-full' type='submit'> Send message</button>

                    </form>

                    <div className='flex flex-col justify-center bg-gray-100 p-8 rounded-lg shadow space-y-6'>

                        <div>
                            <h3 className='text-xl font-semibold mb-1'>Email</h3>

                            <p>imranfaraji880@gmail.com</p>
                        </div>
                        <div>
                            <h3 className='text-xl font-semibold mb-1'>Phone</h3>

                            <p>+8801918513419</p>
                        </div>
                        <div>
                            <h3 className='text-xl font-semibold mb-1'>Address</h3>

                            <p>Pro. 3 no. word, Borhanuddin Bhola.</p>
                        </div>

                    </div>



                </div>
                
            </div>
            
        </div>
    );
};

export default Contact;