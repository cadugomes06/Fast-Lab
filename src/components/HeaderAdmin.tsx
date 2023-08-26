import { useNavigate, Link } from 'react-router-dom'
import logoHemo2 from '../assets/images/logoHemolabes1.png'
import userIcon from '../assets/icons/usericon.svg'
import { useEffect, useState } from 'react'
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../services/firebaseConfig';


const HeaderAdmin = () => {
    const [adminStatus, setAdminStatus] = useState(false)
    const [signOut, loading, error] = useSignOut(auth);

    const isAdminOn = window.localStorage.getItem('admin')
    const navigate = useNavigate()


    useEffect(() => {
        if(isAdminOn != 'on') {
            navigate('../admin/login')
        } else {
            setAdminStatus(true)
        }

    }, [isAdminOn])

    const handleClickLogout = async () => {
        const success = await signOut();

        if(success) {
            window.localStorage.removeItem('admin')
            navigate('../admin/login')
            return loading
        } else if(error) {
            alert('Error!' + error)
        }

    }
  
    return (
        <>
        <header className='h-20 w-full flex items-center justify-between px-6 md:px-2 border-b-[0.1rem] border-teal-100'
                style={{background: 'var(--background-gradient-main)'}}
                >
             <div className='block h-32- w-48 sm:w-28 '>
                <img src={logoHemo2} 
                     alt="logo-laboratório"
                     />
             </div> 

             {adminStatus? (
                <ul className='flex items-center text-teal-600 gap-4 font-semibold text-sm uppercase'>

                <Link to='../admin/home'>
                 <li className='hover:text-white hover:underline cursor-pointer transition duration-300'>
                    Home
                 </li>  
                 </Link>
                 <Link to='../admin/custumers'>
                 <li className='hover:text-white hover:underline cursor-pointer transition duration-300'>
                    Configurações
                 </li>  
                 </Link>
               
                  <li className='hover:text-white hover:underline cursor-pointer transition duration-300'
                      onClick={handleClickLogout}>
                    Sair
                 </li>  

                  <li>
                    <img src={userIcon} alt="ícone-de-usuário" className='w-[24px] h-[24px]' />
                  </li>
                </ul> 
             ): '' }
      

        </header>
        </>
    )
}
export default HeaderAdmin;
