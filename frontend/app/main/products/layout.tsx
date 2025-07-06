"use client"

import Navbar from "@/app/components/Navbar/page"
import React from "react"
import AOS from "aos";
import "aos/dist/aos.css"


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
            <Navbar handleOrderPopup={handleOrderPopup} />
            {children}
        </div>
    )
}

export default RootLayout