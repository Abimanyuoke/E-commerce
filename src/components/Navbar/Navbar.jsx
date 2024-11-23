import React from 'react'
import logo from "../../assets/logo.png";
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";

const Navbar = () => {
  return (
    <div className='shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 z-40'>
        {/* upper Navbar */}
        <div className='bg-primary/40 py-2'>
            <div className='container flex justify-between items-center '>
                <div>
                <a href="#" className='font-bold
                text-2xl sm:text-3xl flex gap-2'>
                    <img src={logo} alt="logo" className='w-10 uppercase'/>
                    Shopsy
                </a>
            </div>
        {/* search bar */}
                <div className='flex justify-between items-center gap-4'>
                    <div className='relative group hidden sm:block'>
                        <input type="text" placeholder='search' className='w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-2 focus:border-primary' />
                        <IoMdSearch className='text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3'/>
                    </div>
                {/* order button */}
                <button onClick ={() => alert("Ordering Not Available Yet")} className='bg-gradient-to-r from-primary to-secondary transition-all duration-200 text-white items-center gap-3 group rounded-full flex px-4 py-1'>
                    <span className='group-hover:block hidden transision-all duration-700'>Order
                    </span>
                    <FaCartShopping className='text-xl text-white drop-shadow-sm cursor-pointer'/>
                </button>
                </div>
            </div>
        </div>
        {/* lower Navbar */}
        <div className=""></div>
    </div>
  )
}

export default Navbar
