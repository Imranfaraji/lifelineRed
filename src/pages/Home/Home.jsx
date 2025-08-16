import React from 'react';
import Hero from '../../component/HomeComponent/Hero';
import Featured from '../../component/HomeComponent/Featured';
import Contact from '../../component/HomeComponent/Contact';
import AboutUs from '../../component/HomeComponent/AboutUs';

const Home = () => {
    return (
        <div>
            <title>Home</title>
            <Hero></Hero>
            <Featured></Featured>
            <Contact></Contact>
            <AboutUs></AboutUs>
        </div>
    );
};

export default Home;