//@ts-ignore
import { Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Header from "../../components/Header"
import banner1 from '../../assets/images/banner01.jpg'
import banner2 from '../../assets/images/banner02.jpg'
import banner3 from '../../assets/images/banner03.png'
import mobileBanner from '../../assets/images/homeMobileBanner.png'
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';

const Home = () => {

    const[isMobile, setIsMobile] = useState(false)

    const slides = [banner1, banner2, banner3]

    const { state } = useContext(UserContext)

    useEffect(() => {
        if (state.userOn === true) {
            state.toggleUserLog()
        }
    }, [state.userOn])

    useEffect(() => {
        const {innerWidth: width} = window
        if(width < 600 ) {
            setIsMobile(true)
        }
    }, [])

    return (
        <>
        
        <Header />
        <main className="w-full h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden"
         >
            <div className="w-[78rem] xl:w-[60rem] lg:w-[50rem] md:w-[40rem] sm:w-[20rem] max-w-max h-[32rem] bg-gray-100"
            >
             {!isMobile ? (
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
                         className='h-[32rem] w-full sm:object-contain cursor-grab rounded-md object-auto' />
                </SwiperSlide>
               )
               )}
             </Swiper>
             ) : (
                <div className="sm:w-[20rem] max-w-max sm:h-[28rem] bg-gray-100 rounded-md shadow-md shadow-gray-400"
                >
                    <img src={mobileBanner} alt="" className='h-[32rem] rounded-md' />
                </div>    
             )}
             
            </div>
        </main>
        </>
    )
}

export default Home