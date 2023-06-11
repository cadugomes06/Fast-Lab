//@ts-ignore
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Header from "../../components/Header"
import banner1 from '../../assets/images/banner01.png'
import banner2 from '../../assets/images/banner02.png'
import banner3 from '../../assets/images/banner03.png'


const Home = () => {
    const slides = [banner1, banner2, banner3]

    return (
        <>
        <Header />

        <main className="w-full h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden"
         >
            <div className="w-[80rem] h-[32rem] bg-gray-100"
            >
             <Swiper 
                className='h-full rounded-md bg-gray-100 shadow-md shadow-gray-400'
                modules={[Navigation, Pagination]}
                navigation
                pagination
                >
               {slides.map(slide => (
                <SwiperSlide key={slide}>
                    <img src={slide} 
                         alt={slide}
                         className='h-[32rem] w-full cursor-grab rounded-md' />
                </SwiperSlide>
               )
               )}
             </Swiper>
             
            </div>
        </main>
        </>
    )
}

export default Home