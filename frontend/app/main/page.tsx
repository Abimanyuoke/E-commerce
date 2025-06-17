"use client";
import React from 'react';
import Navbar from '../user/Navbar/page';
import Hero from '../user/Hero/page';
import Products from '../user/Products/page';
import AOS from "aos";
import "aos/dist/aos.css"
import TopProducts from '../user/TopProducts/page';
import Banner from '../user/Banner/page';
import Subscribe from '../user/Subscribe/page';
import Testimonials from '../user/Testimonials/page';
import Footer from '../user/Footer/page';
import Popup from '../user/Popup/page';



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
