"use client"

import React from "react"
import AOS from "aos";
import "aos/dist/aos.css"
import { Toaster } from "sonner";


type PropsLayout = {
    children: React.ReactNode
}

const RootLayout = ({ children }: PropsLayout) => {

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
        <div className="h-svh">
            <Toaster position="top-right" richColors/>
            {children}
        </div>
    )
}

export default RootLayout