import React from 'react';
import Img1 from "../../assets/women/1.jpg";
import Img2 from "../../assets/women/2.jpeg";
import Img3 from "../../assets/women/3.jpeg";
import Img4 from "../../assets/women/4.jpeg";
import Img5 from "../../assets/women/5.jpeg";
import { FaStar } from 'react-icons/fa6';

const ProductsData = [
  {
    id: 1,
    img: Img1,
    title: "Women Ethnic",
    rating: 5.0,
    author: "White",
    aosDelay: "0",
  },
  {
    id: 2,
    img: Img2,
    title: "Women Western",
    rating: 4.0,
    author: "Red",
    aosDelay: "200",
  },
  {
    id: 3,
    img: Img3,
    title: "Googles",
    rating: 4.7,
    author: "Brown",
    aosDelay: "400",
  },
  {
    id: 4,
    img: Img4,
    title: "Printed T-Shirt",
    rating: 4.4,
    author: "Yellow",
    aosDelay: "600",
  },
  {
    id: 5,
    img: Img5,
    title: "Fashin T-Shirt",
    rating: 4.5,
    author: "Pink",
    aosDelay: "800",
  },
]

const Products = () => {
  return (
    <div className='mt-14 mb-12'>
      <div className='container'>
        {/* Header sections */}
        <div className='text-center mb-10 max-w-[600px] mx-auto'>
          <p data-aos="fade-up" className='text-sm text-primary'>Top Selling Products for you</p>
          <h1 data-aos="fade-up" className='text-3xl font-bold'>Products</h1>
          <p data-aos="fade-up" className='text-xs text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, laudantium amet nihil soluta minus dolores.</p>
        </div>
        {/* Body sections */}
        <div>
          <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5'>
            {/* card sections */}
            {
              ProductsData.map((data) => (
                <div 
                data-aos="fade-up"
                data-aos-delay={data.aosDelay}
                key={data.id} className='space-y-3'>
                  <img src={data.img.src} alt="" className='h-[220px] w-[150px] object-cover rounded-md' />
                  <div>
                    <h3 className='font-semibold'>{data.title}</h3>
                    <p className='text-sm text-gray-600'>{data.author}</p>
                    <div className='flex gap-1 items-center'>
                      <FaStar className= "text-yellow-400"/>
                      <span>{data.rating}</span>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
          {/* view all button*/}
          <div className='flex justify-center'>
            <button className='text-center mt-10 cursor-pointer bg-primary text-white py-1 px-5 rounded-md'>
              View All Button
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
