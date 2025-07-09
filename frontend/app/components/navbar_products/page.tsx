'use client'

import React, { useState } from 'react'
import logo from "../../../public/logo.png";
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping } from "react-icons/fa6";
import DarkMode from "."


// const Menu = [
//     {
//         id: 1,
//         name: "Home",
//         link: "/#",
//     },
//     {
//         id: 2,
//         name: "Top Rated",
//         link: "/services",
//     },
//     {
//         id: 3,
//         name: "Kids Wear",
//         link: "/#",
//     },
//     {
//         id: 4,
//         name: "Mens Wear",
//         link: "/#",
//     },
//     {
//         id: 5,
//         name: "Electronics",
//         link: "/#",
//     },
// ];

// const DropdownLinks = [
//     {
//         id: 1,
//         name: "Trading Products",
//         link: "/#",
//     },
//     {
//         id: 2,
//         name: "Trading Selling",
//         link: "/#",
//     },
//     {
//         id: 3,
//         name: "Top Rated",
//         link: "/#",
//     },
// ]


// interface NavbarProps {
//     handleOrderPopup: () => void;
// }

// const Navbar_Products: React.FC<NavbarProps> = ({ handleOrderPopup }) => {
//     return (
//         <div className='shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 z-40'>
//             {/* upper Navbar */}
//             <div className='bg-primary/40 py-2'>
//                 <div className='container flex justify-between items-center '>
//                     <div>
//                         <a href="#" className='font-bold
//                 text-2xl sm:text-3xl flex gap-2'>
//                             <img src={logo.src} alt="logo" className='w-10 uppercase' />
//                             Shopsy
//                         </a>
//                     </div>

//                     {/* search bar */}
//                     <div className='flex justify-between items-center gap-4'>
//                         <div className='relative group hidden sm:block'>
//                             <input type="text" placeholder='search' className='w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 pl-4 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-2 focus:border-primary dark:border-gray-500 dark:bg-gray-800' />
//                             <IoMdSearch className='text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3' />
//                         </div>

//                         {/* order button */}
//                         <button onClick={() => handleOrderPopup()} className='bg-gradient-to-r from-primary to-secondary transition-all duration-300 text-white items-center gap-3 group rounded-full flex px-4 py-1'>
//                             <span className='group-hover:block hidden transision-all duration-700'>Order
//                             </span>
//                             <FaCartShopping className='text-xl text-white drop-shadow-sm cursor-pointer' />
//                         </button>

//                         {/* DarkMode Switch */}
//                         <div>
//                             <DarkMode />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             {/* lower Navbar */}
//             <div data-aos="zoom-in" className='flex justify-center'>
//                 <ul className='sm:flex hidden font-medium items-center gap-4'>
//                     {Menu.map((data) => (
//                         <li key={data.id}>
//                             <a href={data.link} className='inline-block px-4 hover:text-primary duration-200'>{data.name}</a>
//                         </li>
//                     ))}
//                     {/* Simple Dropdown and Links */}
//                     <li className='group relative cursor-pointer'>
//                         <a href="#" className='flex items-center gap-[2px] py-2 '>Trending Products
//                             <span>
//                                 <FaCaretDown className='transision-all duration-200 group-hover:rotate-180' />
//                             </span>
//                         </a>
//                         <div className='absolute z-[9999] hidden group-hover:block w-[150px] rounded-md bg-white p-2 text-black shadow-md'>
//                             <ul>
//                                 {DropdownLinks.map((data) =>
//                                     <li key={data.id}>
//                                         <a href={data.link} className='inline-block rounded-md p-2 hover:bg-primary/20 text-sm '>{data.name}</a>
//                                     </li>
//                                 )}
//                             </ul>
//                         </div>
//                     </li>
//                 </ul>
//             </div>
//         </div>
//     )
// }

// export default Navbar_Products



import Link from 'next/link'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'

const categoryList = [
  {
    main: "WANITA",
    subs: ["BLOUSE", "DRESS", "ROK", "HIJAB"],
  },
  {
    main: "PRIA",
    subs: ["KAOS", "KEMEJA", "CELANA", "BATIK"],
  },
  {
    main: "ANAK",
    subs: ["BAJU_ANAK", "CELANA_ANAK"],
  },
  {
    main: "SEPATU",
    subs: ["SEPATU_PRIA", "SEPATU_WANITA"],
  },
  {
    main: "TAS",
    subs: ["TAS_PRIA", "TAS_WANITA"],
  },
  {
    main: "SPORTS",
    subs: ["JERSEY", "TRAINING", "LEGGING"],
  },
]

interface NavbarProps {
  handleOrderPopup: () => void;
}

const Navbar_Products: React.FC<NavbarProps> = ({ handleOrderPopup }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (main: string) => {
    setActiveDropdown(prev => (prev === main ? null : main));
  }

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
              <input
                type="text"
                placeholder='search'
                className='w-[200px] group-hover:w-[300px] transition-all duration-300 pl-4 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-2 focus:border-primary dark:border-gray-500 dark:bg-gray-800'
              />
              <IoMdSearch className='text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3' />
            </div>

            {/* order button */}
            <button
              onClick={() => handleOrderPopup()}
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

      {/* lower Navbar */}
      <nav className='bg-white shadow-md py-3 px-6'>
        <ul className='flex gap-6 relative'>
          {categoryList.map((cat, i) => (
            <li key={i} className='relative'>
              <button
                onClick={() => toggleDropdown(cat.main)}
                className='flex items-center gap-1 cursor-pointer transition-all'
              >
                {cat.main}
                {activeDropdown === cat.main ? (
                  <FaCaretUp className='transition-all duration-300' />
                ) : (
                  <FaCaretDown className='transition-all duration-300' />
                )}
              </button>

              {/* Submenu */}
              {activeDropdown === cat.main && (
                <div className='absolute left-0 top-full mt-2 bg-white border shadow-lg rounded-md p-2 z-50 transition-all duration-300 animate-fade-in'>
                  {cat.subs.map((sub, idx) => (
                    <Link
                      href={`/products?main=${cat.main}&sub=${sub}`}
                      key={idx}
                      className='block whitespace-nowrap px-4 py-2 hover:bg-gray-100 rounded-md text-sm'
                    >
                      {sub.replaceAll("_", " ")}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Navbar_Products

