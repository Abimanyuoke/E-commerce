import React from 'react'
import Image1 from "../../../public/hero/shopping.png";
import Image2 from "../../../public/hero/women.png";
import Image3 from "../../../public/hero/sale.png";
import Slider from "react-slick"

const ImageList = [
    {
        id: 1,
        img: Image2,
        title: "30% off on all Women's Wear",
        description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis exercitationem facere dolore delectus rem architecto ducimus sint necessitatibus ex voluptat."
    },
    {
        id: 2,
        img: Image1,
        title: "Upto 50% off on all Men's Wear",
        description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis exercitationem facere dolore delectus rem architecto ducimus sint necessitatibus ex voluptat."
    },
    {
        id: 3,
        img: Image3,
        title: "70% off on all Product Sale",
        description:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis exercitationem facere dolore delectus rem architecto ducimus sint necessitatibus ex voluptat."
    },
]

interface HeroProps {
    handleOrderPopup: () => void;
}

const Hero = ({ handleOrderPopup }: HeroProps) => {
    var settings = {
        dots: false,
        arrows: false,
        speed: 800,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        cssEase: "ease-in-out",
        pauseOnHover: false,
        pauseOnFocus: true,
    };

    return (
        <div className='relative overflow-hidden min-h-[550px] sm:min-h-[650px] bg-gray-100 flex justify-center items-center dark:bg-gray-950 dark:text-white duration-200'>
            {/* background pattern */}
            <div className='h-[700px] w-[700px] bg-primary/40 absolute -top-1/2 right-0 rounded-3xl rotate-45 z-0'></div>
            {/* hero section */}
            <div className='container pb-8 sm:pb-0 '>
                <Slider {...settings}>
                    {ImageList.map((data) => (
                        <div>
                            <div className='grid grid-cols-1   sm:grid-cols-2'>
                                {/* text content section */}
                                <div className='flex flex-col justify-center gap-4 pt-12 sm:pt-0 text-center sm:text-left order-2 sm:order-1 relative z-10'>
                                    <h1
                                        data-aos="zoom-out"
                                        data-aos-duration="500"
                                        data-aos-once="true"
                                        className='text-5xl sm:text-6xl lg:text-7xl font-bold'>{data.title}</h1>
                                    <p
                                        data-aos="fade-up"
                                        data-aos-duration="500"
                                        data-aos-delay="100"
                                        className='text-sm'>{data.description}</p>
                                    <div
                                        data-aos="fade-up"
                                        data-aos-duration="500"
                                        data-aos-delay="300"
                                    >
                                        <button onClick={handleOrderPopup} className='bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-2 px-4 ml-1 rounded-full'>Order Now</button>
                                    </div>
                                </div>
                                {/* Image section */}
                                <div className='order-1 sm:order-2'>
                                    <div
                                        data-aos="zoom-in"
                                        data-aos-once="true"
                                        className='relative z-10'>
                                        <img src={data.img.src} alt="" className='w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] sm:scale-105 lg:scale-120 object-contain mx-auto' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
}

export default Hero