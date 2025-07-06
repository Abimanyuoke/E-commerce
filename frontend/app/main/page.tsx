"use client";
import React from 'react';
import Navbar from '../components/Navbar/page';
import Hero from '../components/Hero/page';
import Products from '../components/Products/page';
import AOS from "aos";
import "aos/dist/aos.css"
import TopProducts from '../components/TopProducts/page';
import Banner from '../components/Banner/page';
import Subscribe from '../components/Subscribe/page';
import Testimonials from '../components/Testimonials/page';
import Footer from '../components/Footer/page';
import Popup from '../components/Popup/page';



const Main = () => {
    const [orderPopup, setOrderPopup] = React.useState(false);
    const handleOrderPopup = () => {
        setOrderPopup(!orderPopup);
    };

    React.useEffect(() => {
        AOS.init({
            offset: 100,
            duration: 800,
            easing: "ease-in-out",
            delay: 100,
        });
        AOS.refresh();
    }, []);


    return (
        <div className='bg-white dark:bg-gray-900 dark:text-white duration-200'>
            <Navbar handleOrderPopup={handleOrderPopup} />
            <Hero handleOrderPopup={handleOrderPopup} />
            <Products />
            <TopProducts handleOrderPopup={handleOrderPopup} />
            <Banner />
            <Subscribe />
            <Products />
            <Testimonials />
            <Footer />
            <Popup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
        </div>
    )
};

export default Main
