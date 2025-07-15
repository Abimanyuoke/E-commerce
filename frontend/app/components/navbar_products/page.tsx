'use client'

import React, { useRef, useState } from 'react'
import logo from "../../../public/logo.png";
import DarkMode from "."
import Search from "./search";
import search from './search';
import { useEffect } from "react";
import { IProduct } from "@/app/types";
import { getCookies, removeCookie } from "@/lib/client-cookies";
import { BASE_API_URL, } from "../../../global";
import { BASE_IMAGE_PROFILE } from "../../../global"
import { IoMdSearch } from "react-icons/io";
import { get } from "@/lib/bridge";
import { IoMdArrowDropup } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from 'next/navigation';
import { FiLogOut } from 'react-icons/fi';

const Navbar_Products: React.FC = () => {

  const [popup, setPopup] = useState(false);
  const [product, setProduct] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<string>("");
  const [user, setUser] = useState<string>("");
  const [role, setRole] = useState<string>("");
  const router = useRouter();
  const sidebarRef = useRef<HTMLDivElement>(null)
  const [isShow, setIsShow] = useState(false);

  const handleLogout = () => {
    removeCookie("token");
    removeCookie("id");
    removeCookie("name");
    removeCookie("role");
    removeCookie("alamat")
    router.replace(`/auth/login`);
  };


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        handlePopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
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


  const getMenu = async () => {
    try {
      const TOKEN = getCookies("token") || "";
      const url = `${BASE_API_URL}/product?search=${search}`;
      const { data } = await get(url, TOKEN);
      if ((data as { status: boolean; data: IProduct[] }).status) {
        setProduct((data as { status: boolean; data: IProduct[] }).data);
      }
    } catch (error) {
      console.error("Error getmenu menu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMenu();
  }, [search]);

  return (
    <div className='shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 z-40 relative'>
      {/* upper Navbar */}
      <div className='bg-primary/40 py-2'>
        <div className='container flex justify-between items-center '>
          <div>
            <a href="#" className='font-bold text-2xl sm:text-3xl flex gap-2'>
              <img src={logo.src} alt="logo" className='w-10 uppercase' />
              Shopsy
            </a>
          </div>

          {/* search bar */}
          <div className='flex justify-between items-center gap-4'>
            <div className='relative group hidden sm:block'>
              <Search url={`/products`} search={""} />
              <IoMdSearch className='text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3' />
            </div>

            {/* Profile */}
            <button className='cursor-pointer' onClick={() => handlePopup()}>
              <img src={`${BASE_IMAGE_PROFILE}/${profile}`} alt="profile image" width={40} height={40} className="rounded-full" />
            </button>

            {/* DarkMode Switch */}
            <div>
              <DarkMode />
            </div>
          </div>
        </div>
      </div>
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
            {/* // Di dalam popup dropdown */}
            <div className="border-t pt-3 mt-3">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-800 dark:text-red-400 rounded-md transition"
              >
                <FiLogOut className="text-lg" />
                <span>Logout</span>
              </button>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

export default Navbar_Products