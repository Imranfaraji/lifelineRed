import axios from 'axios';
import React from 'react';

const useAxiosPublic = () => {
    const instance=axios.create({
        baseURL:"https://lifeline-red-server.vercel.app"
    })
    return instance
};

export default useAxiosPublic;