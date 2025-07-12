"use client";

import React from 'react'
import Img1 from "../../../public/shirt/shirt.png"
import Img2 from "../../../public/shirt/shirt2.png"
import Img3 from "../../../public/shirt/shirt3.png"
import { FaStar } from 'react-icons/fa6'
import { useRouter } from 'next/navigation';


const Products = [
    {
        id: 1,
        img: Img1,
        title: "30% off on all Women's Wear",
        description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis exercitationem facere dolore delectus rem architecto ducimus sint necessitatibus ex voluptat."
    },
    {
        id: 2,
        img: Img2,
        title: "Upto 50% off on all Men's Wear",
        description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis exercitationem facere dolore delectus rem architecto ducimus sint necessitatibus ex voluptat."
    },
    {
        id: 3,
        img: Img3,
        title: "70% off on all Product Sale",
        description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis exercitationem facere dolore delectus rem architecto ducimus sint necessitatibus ex voluptat."
    },
]

const TopProducts: React.FC = () => {
    const router = useRouter();

    return (
        <div>
            <div className='container'>
                {/* Header sections */}
                <div className="text-left mb-24">
                    <p data-aos="fade-up" className='text-sm text-primary'>Top Rated Products for you</p>
                    <h1 data-aos="fade-up" className='text-3xl font-bold'>Best Products</h1>
                    <p data-aos="fade-up" className='text-xs text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, laudantium amet nihil soluta minus dolores.</p>
                </div>
                {/* Body sections */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 md:gap-5 place-items-center'>
                    {
                        Products.map((data) => (
                            <div  key={data.id} data-aos="zoom-in" className='rounded-2xl bg-white dark:hover:bg-primary dark:bg-gray-800 hover:bg-black/80 hover:text-white relative shadow-xl duration-300 group max-w-[300px]'>
                                {/* image sections */}
                                <div className='h-[100px]'>
                                    <img src={data.img.src} alt="" className='max-w-[140px] mx-auto block transform -translate-y-20 group-hover:scale-105 duration-300 drop-shadow-md' />
                                </div>
                                {/* details sections */}
                                <div className='p-4 text-center'>
                                    {/* star rating */}
                                    <div className='w-full flex items-center justify-center gap-1'>
                                        <FaStar className='text-yellow-500' />
                                        <FaStar className='text-yellow-500' />
                                        <FaStar className='text-yellow-500' />
                                        <FaStar className='text-yellow-500' />
                                    </div>
                                    <h1 className='text-xl font-bold'>{data.title}</h1>
                                    <p className='text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2'>{data.description}</p>
                                    <button className='bg-primary hover:scale-105 duration-300 text-white py-1 px-4 rounded-full mt-4 group-hover:bg-white group-hover:text-primary' onClick={() => router.push('/products')}>
                                        Order Now
                                    </button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default TopProducts