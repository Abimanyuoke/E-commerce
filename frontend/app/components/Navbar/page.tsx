'use client'

import React, { useRef, useState } from 'react'
import logo from "../../../public/logo.png";
import DarkMode from "."
import Search from "./search";
import { useEffect } from "react";
import { IProduct } from "@/app/types";
import { getCookies, removeCookie } from "@/lib/client-cookies";
import { BASE_IMAGE_PROFILE } from "../../../global"
import { IoMdSearch } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/navigation';
import { FiLogOut } from 'react-icons/fi';
import { ButtonCart } from '../button';

const Navbar: React.FC = () => {

  const [popup, setPopup] = useState(false);
  const [profile, setProfile] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const router = useRouter();
  const sidebarRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false);

  //   const handleLogout = () => {
  //     removeCookie("token");
  //     removeCookie("id");
  //     removeCookie("name");
  //     removeCookie("role");
  //     removeCookie("alamat")
  //     router.replace(`/auth/login`);
  //   };

  //   useEffect(() => {
  //     const handleScroll = () => {
  //       setScrolled(window.scrollY > 200);
  //     };

  //     window.addEventListener("scroll", handleScroll);
  //     return () => {
  //       window.removeEventListener("scroll", handleScroll);
  //     };
  //   }, []);


  //   useEffect(() => {
  //     const handleClickOutside = (e: MouseEvent) => {
  //       if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
  //         handlePopup(false);
  //       }
  //     };

  //     document.addEventListener("mousedown", handleClickOutside);

  //     return () => {
  //       document.removeEventListener("mousedown", handleClickOutside);
  //     };
  //   }, []);

  //   useEffect(() => {
  //     setProfile(getCookies("profile_picture") || "");
  //     setUser(getCookies("name") || "");
  //     setRole(getCookies("role") || "");
  //   }, []);

  //   const handlePopup = (state?: boolean) => {
  //     if (typeof state === "boolean") {
  //       setPopup(state);
  //     } else {
  //       setPopup((prev) => !prev);
  //     }
  //   };;

  //   return (
  //     <div className={`fixed top-0 z-50 shadow-md bg-white dark:bg-gray-900 dark:text-white duration-300 transition-all ${scrolled ? "mt-2 rounded-xl w-[80%] mx-auto" : "w-full"
  //       }`}>


  //       {/* upper Navbar */}
  //       <div className='bg-primary/40 py-2 '>
  //         <div className='container flex justify-between items-center '>
  //           <div>
  //             <a href="#" className='font-bold text-2xl sm:text-3xl flex gap-2'>
  //               <img src={logo.src} alt="logo" className='w-10 uppercase' />
  //               Shopsy
  //             </a>
  //           </div>

  //           {/* search bar */}
  //           <div className='flex justify-between items-center gap-4'>
  //             <div className='relative group hidden sm:block'>
  //               <Search url={`/main`} search={""} />
  //               <IoMdSearch className='text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3' />
  //             </div>

  //             {/* Profile */}
  //             <button className='cursor-pointer' onClick={() => handlePopup()}>
  //               <img src={`${BASE_IMAGE_PROFILE}/${profile}`} alt="profile image" width={40} height={40} className="rounded-full" />
  //             </button>

  //             {/* DarkMode Switch */}
  //             <div>
  //               <DarkMode />
  //             </div>

  //           </div>
  //         </div>
  //       </div>
  //       <AnimatePresence>
  //         {popup && (
  //           <motion.div
  //             ref={sidebarRef}
  //             key="profile-popup"
  //             initial={{ opacity: 0, y: -10 }}
  //             animate={{ opacity: 1, y: 0 }}
  //             exit={{ opacity: 0, y: -10 }}
  //             transition={{ duration: 0.3 }}
  //             className='absolute top-full right-5 mt-2 w-52 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-4 z-50'>
  //             <div
  //               className='absolute -top-4 right-2 text-gray-700 dark:text-white text-2xl cursor-pointer'
  //               onClick={() => setPopup(false)}>
  //               <IoMdArrowDropup />
  //             </div>
  //             <div className='flex items-center gap-3 mb-3'>
  //               <img
  //                 src={`${BASE_IMAGE_PROFILE}/${profile}`}
  //                 alt='profile'
  //                 className='w-10 h-10 rounded-full object-cover border-2 border-primary' />
  //               <div>
  //                 <p className='text-sm font-semibold text-gray-700 dark:text-white'>{user}</p>
  //                 <p className='text-xs text-gray-500 dark:text-gray-400'>{role}</p>
  //               </div>
  //             </div>

  //             {/* // Di dalam popup dropdown */}
  //             <div className="border-t pt-3 mt-3">
  //               <button
  //                 onClick={handleLogout}
  //                 className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-800 dark:text-red-400 rounded-md transition">
  //                 <FiLogOut className="text-lg" />
  //                 <span>Logout</span>
  //               </button>
  //             </div>
  //           </motion.div>
  //         )}
  //       </AnimatePresence>

  //     </div>
  //   )
  // }

  // export default Navbar 

  const handleLogout = () => {
    removeCookie("token");
    removeCookie("id");
    removeCookie("name");
    removeCookie("role");
    removeCookie("alamat")
    router.replace(`/auth/login`);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        setPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setProfile(getCookies("profile_picture") || "");
    setUser(getCookies("name") || "");
    setRole(getCookies("role") || "");
  }, []);

  const handlePopup = (state?: boolean) => {
    if (typeof state === "boolean") {
      setPopup(state);
    } else {
      setPopup((prev) => !prev);
    }
  };

  return (
    <div className='fixed top-0 z-50 w-full'>
      <div className={`transition-all duration-300 shadow-md bg-white dark:bg-gray-900 dark:text-white ${scrolled ? "mt-4 rounded-xl w-[80%]" : "w-full"} mx-auto`}>

        {/* upper Navbar */}
        <div className={`bg-primary/40 ${scrolled ? "py-3 rounded-xl" : "py-2"} transition-all`}>
          <div className='container flex justify-between items-center'>
            {/* Logo */}
            <a href="#" className={`font-bold text-2xl sm:text-3xl flex gap-2 items-center`}>
              <img src={logo.src} alt="logo" className={`transition-all duration-300 ${scrolled ? "w-12" : "w-10"}`} />
              <span
                className={`transition-all duration-500 ease-in-out transform ${scrolled ? "translate-x-80  absolute text-3xl" : "translate-x-0 opacity-100"} text-2xl`}>
                Shopsy
              </span>
            </a>

            <ButtonCart type="button" onClick={() => router.push(`cart/`)} className="block">
              History Cart
            </ButtonCart>

            {/* Search, Profile, DarkMode */}
            <div className='flex justify-between items-center gap-4'>
              {/* Search */}
              <div className='relative group hidden sm:block'>
                <Search url={`/main`} search={""} />
                <IoMdSearch className='text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3' />
              </div>

              {/* Profile */}
              <button className='cursor-pointer' onClick={() => handlePopup()}>
                <img
                  src={`${BASE_IMAGE_PROFILE}/${profile}`}
                  alt="profile image"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </button>

              {/* Dark Mode */}
              <DarkMode />
            </div>
          </div>
        </div>

        {/* Dropdown Profile */}
        <AnimatePresence>
          {popup && (
            <motion.div
              ref={sidebarRef}
              key="profile-popup"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className='absolute top-full right-5 mt-2 w-52 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg p-4 z-50'>
              <div
                className='absolute -top-4 right-2 text-gray-700 dark:text-white text-2xl cursor-pointer'
                onClick={() => setPopup(false)}>
                <IoMdArrowDropup />
              </div>
              <div className='flex items-center gap-3 mb-3'>
                <img
                  src={`${BASE_IMAGE_PROFILE}/${profile}`}
                  alt='profile'
                  className='w-10 h-10 rounded-full object-cover border-2 border-primary' />
                <div>
                  <p className='text-sm font-semibold text-gray-700 dark:text-white'>{user}</p>
                  <p className='text-xs text-gray-500 dark:text-gray-400'>{role}</p>
                </div>
              </div>

              <div className="border-t pt-3 mt-3">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-800 dark:text-red-400 rounded-md transition">
                  <FiLogOut className="text-lg" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Navbar