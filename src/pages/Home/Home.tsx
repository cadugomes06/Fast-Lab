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
import { useContext, useEffect } from 'react';
import { UserContext } from '../../context/UserContext';
import LoadingCup from '../../components/LoadingCup';

const Home = () => {
    const slides = [banner1, banner2, banner3]

    const { state } = useContext(UserContext)

    useEffect(() => {
        if (state.userOn === true) {
            state.toggleUserLog()
        }
    }, [state.userOn])


    return (
        <>
        <Header />

        <main className="w-full h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden"
         >
            <div className="w-[78rem] xl:w-[70rem] lg:w-full max-w-max h-[32rem] bg-gray-100"
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
                         className='h-[32rem] w-full cursor-grab rounded-md object-auto lg:object-cover' />
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