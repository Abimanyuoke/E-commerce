'use client'

import React, { useState } from 'react'
import logo from "../../../public/logo.png";
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import DarkMode from "."
import Search from "./search";
import { useEffect } from "react";
import { IProduct } from "@/app/types";
import { getCookies } from "@/lib/client-cookies";
import { BASE_API_URL, } from "../../global";
import { get } from "@/lib/bridge";
import search from './search';

type Props = {
    className?: string
}

const Navbar_Products: React.FC<Props> = ({className}) => {

  const [product, setProduct] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

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
    <div className='shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 z-40'>
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

            {/* order button */}
            <button
              onClick={() => { }}
              className='bg-gradient-to-r from-primary to-secondary transition-all duration-300 text-white items-center gap-3 group rounded-full flex px-4 py-1'
            >
              <span className='group-hover:block hidden transision-all duration-700'>Order</span>
              <FaCartShopping className='text-xl text-white drop-shadow-sm cursor-pointer' />
            </button>

            {/* DarkMode Switch */}
            <div>
              <DarkMode />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar_Products