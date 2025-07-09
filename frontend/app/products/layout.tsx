"use client"

import React from "react"
import AOS from "aos";
import "aos/dist/aos.css"
import Navbar_Products from "../components/navbar_products/page";
import { Toaster } from "sonner";


type PropsLayout = {
    children: React.ReactNode
}

const RootLayout = ({ children }: PropsLayout) => {

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
            <Toaster position="top-right" richColors/>
            <Navbar_Products handleOrderPopup={handleOrderPopup} />
            {children}
        </div>
    )
}

export default RootLayout