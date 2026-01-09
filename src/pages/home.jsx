//compoenente home
import React from 'react';
import Navbar from '../components/layouts/navbar';
import AutoSlider from '../components/layouts/autoSlider';
import Services from '../components/layouts/allServices';
import Contact from '../components/layouts/contact';
import AboutUs from '../components/layouts/aboutUs';
import Gallery from '../components/layouts/gallery';
import Footer from '../components/layouts/footer';


function Home({ language }) {
    return (
        <>
            <Navbar language={language} />
            <AutoSlider />
            <Services />
            <AboutUs />
            <Gallery />
            <Contact /> 
            <Footer language={language} />
            
        </>
    );
 
}
export default Home;
