import { useEffect, useState } from "react";
import Header from "../../../components/Header";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../services/firebaseConfig";

import calendarIcon from '../../../assets/icons/calendar.svg'


const UserRequest = () => {
    const [schedules, setSchedules] = useState<typeSchedule[]>([]);

    const formsCollectionRef = collection(db, "formulario");
    const userIDstorage = window.localStorage.getItem('user')
  
    useEffect(() => {
      const getForms = async () => {
        const data = await getDocs(formsCollectionRef);
        const a: any = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const userSchedules = a.filter((id: any) => id.userID == userIDstorage)
        setSchedules(userSchedules)
      };
      getForms();
    }, []);

    interface typeSchedule {
        plan: string;
        unit: string;
    }
    

    return (
        <>
        <Header />

        <section className="grid grid-cols-8 animeLeft">
         <div></div>

         <div className="col-span-6 bg-gray-50 h-[calc(100vh-84px)] shadow-md shadow-gray-300 rounded-md mt-2">
            <div className="w-full h-28  flex justify-center items-center">
              <h1 className="text-2xl font-bold textGradient" >
                Meus agendamentos
             </h1>
            </div>

            <div className="h-[24rem] w-full max-h-max pt-12 px-6">
              {schedules ?
               schedules.map((schedule, index) => (
                <div 
                   key={index} 
                   className="flex justify-between w-full bg-white rounded-lg h-12 mb-2 items-center px-4 shadow-md shadow-gray-300 font-normal text-sm"
                   style={{color: 'var(--color-main)'}}>
                    <img src={calendarIcon} alt="caléndario" className="w-[20px] h-[20px]" />
                    <p>{schedule?.plan}</p> 
                    <p>{schedule?.unit}</p>
                    <p>Status: Indisponível</p>
                </div>
               )) 
               : <h3>Não foram encontrado agendamentos ainda!</h3> }
            </div>


         </div>


         <div></div>
        </section>

        </>
    )
}

export default UserRequest;