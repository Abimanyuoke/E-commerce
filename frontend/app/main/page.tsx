"use client";
import React from 'react';
import Navbar from '../components/navbar/page';
import Hero from '../components/hero/page';
import Products from '../components/products/page';
import AOS from "aos";
import "aos/dist/aos.css"
import TopProducts from '../components/topProducts/page';
import Banner from '../components/banner/page';
import Subscribe from '../components/subscribe/page';
import Testimonials from '../components/testimonials/page';
import Footer from '../components/footer/page';
import Popup from '../components/popup/page';



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
            <TopProducts />
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
