//compoenente home
import React from 'react';
import Navbar from '../components/layouts/navbar';
import AutoSlider from '../components/layouts/autoSlider';
import Services from '../components/layouts/allServices';
import Contact from '../components/layouts/contact';
import AboutUs from '../components/layouts/aboutUs';
import Gallery from '../components/layouts/gallery';
import Footer from '../components/layouts/footer';
import ServiceProcess from '../components/layouts/serviceProcess';
import HelmetSEO from '../components/seo/helmet';

import es from '../locales/es.json';
import en from '../locales/en.json';
import fr from '../locales/fr.json';
import de from '../locales/de.json';

const locales = { es, en, fr, de };

function Home({ language }) {

const t = locales[language] || locales.es;
const seoTexts = t.seo.home;

    return (
        <>
             <HelmetSEO
                title={seoTexts.title}
                description={seoTexts.description}
                lang={language}
                image=''
                url={`https://reformas-integrales.com/${language}`}
      />
            <Navbar language={language} />
            <AutoSlider />
            <Services />
            <AboutUs />
            <Gallery />
            <ServiceProcess lang={language} />
            <Contact id="contact-section-homepage" /> 
            <Footer language={language} />
            
        </>
    );
 
}
export default Home;
