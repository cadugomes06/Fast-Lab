import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../services/firebaseConfig";

import calendarIcon from '../../../assets/icons/calendar.svg'
import notDocumentIcon from '../../../assets/images/notDocument.jpg'
import MenuMobile from "../../../components/MenuMobile";


const UserRequest = () => {
    const [schedules, setSchedules] = useState<typeSchedule[]>([]);
    const [ errorSchedule, setErrorSchedule] = useState(false)
    const [ isMobile, setIsMobile] = useState(false)

    const formsCollectionRef = collection(db, "formulario");
    const userIDstorage = window.localStorage.getItem('user')
  
    useEffect(() => {
      const getForms = async () => {
        const data = await getDocs(formsCollectionRef);
        const a: any = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const userSchedules = a.filter((id: any) => id.userID == userIDstorage)
        
        if(userSchedules) {
          setSchedules(userSchedules)
        } else {
          setErrorSchedule(true)
        }
      };
      getForms();
    }, []);

    interface typeSchedule {
        plan: string;
        unit: string;
        status: string
    }

    const {innerWidth: width} = window
    useEffect(() => {
      if(width < 600 ) {
        setIsMobile(true)
      }
    }, [width])

    return (
        <>
        {isMobile? <MenuMobile /> : <Header />}

        <section className="grid grid-cols-8 animeLeft sm:grid-cols-12">
         <div></div>

         <div className="col-span-6 md:col-span-10 bg-gray-50/50 h-[calc(100vh-100px)] shadow-md shadow-gray-300 rounded-md my-2 overflow-y-auto">
            <div className="w-full h-28  flex justify-center items-center">
              <h1 className="text-2xl font-bold textGradient" >
                Minhas Solicitações
             </h1>
            </div>

            <div className=" w-full max-h-max pt-12 px-6 sm:px-2 pb-4 overflow-y-auto ">
              {schedules[0] && !errorSchedule ?
               schedules.map((schedule, index) => (
                <div 
                   key={index} 
                   className={`${schedule.status === 'solicitado' ? `bg-yellow-400/60` : `bg-teal-400/50`} flex justify-between w-full rounded-lg h-12 mb-2 items-center px-4 shadow-md shadow-gray-300 font-normal text-sm`}
                   style={{color: 'var(--color-main)'}}>
                    <img src={calendarIcon} alt="caléndario" className="w-[20px] h-[20px]" />
                    <p className="ssm:hidden">{schedule?.plan}</p> 
                    <p>{schedule?.unit}</p>
                    <p>Status: {schedule?.status}</p>
                </div>
               )) 
               : 
                <div className="h-[24rem] w-full max-h-max px-4 flex flex-col">
                  <h3 className="text-md font-semibold z-10" style={{color: 'var(--color-secondary)'}}>Você ainda não possui solicitações disponíveis no momento. Navegue até a sessão de solicitação.
                  </h3> 

                  <div className="w-[100%] max-h-max flex justify-center">
                    <img src={notDocumentIcon} alt="nenhum-documento" className="object-contain w-[24rem] h-[20rem]" />
                  </div>
                  
                </div>
                }
            </div>

         </div>

         <div></div>
        </section>

        </>
    )
}

export default UserRequest;