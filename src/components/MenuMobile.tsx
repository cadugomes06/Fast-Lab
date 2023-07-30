import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import logoHemo from '../assets/icons/logoHemolabes1.svg'
import menuIcon from '../assets/icons/menuIcon.svg'
import closeIcon from '../assets/icons/closeX.svg'
import { UserContext } from '../context/UserContext';
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../services/firebaseConfig';
import LoadingCup from './LoadingCup';

const MenuMobile = () => {
    const [toggleMenu, setToggleMenu] = useState(false)
    
    const { state } = useContext(UserContext)
    const navigate = useNavigate()
    const [signOut, loading, error] = useSignOut(auth);    

    const handleToggleMenu = () => {
        setToggleMenu(!toggleMenu)
        console.log('funcionou')
    }

    const handleClickLogout = async () => {
        const success = await signOut()
        if (success) {
          window.localStorage.removeItem('user')
          window.localStorage.removeItem('UserAccount')
          state.toggleUserLog()
    
            navigate('/')
        }
        if(error) {
          alert('Erro inesperado!' + error)
        }
      }

    return (
        <>
        {loading? <LoadingCup /> : null}

        <header className="h-[80px] w-full flex items-center border border-teal-100 border-b-[1px] px-4 justify-between transition duration-200 relative">

           <div className='block h-32- w-48 sm:w-28 '>
                <img src={logoHemo} 
                     alt="logo-laboratório"
                     />
             </div> 

            <div className='h-[28px] w-[28px] cursor-pointer z-50'
                 onClick={handleToggleMenu}>
                {!toggleMenu? (
                    <img src={menuIcon} 
                    alt="ícone-de-menu"
                    className='h-[28px] w-[28px]' />
                ) : (
                    <img src={closeIcon} 
                    alt="ícone-de-menu"
                    className='h-[28px] w-[28px]' /> 
                )}
            </div>

            {toggleMenu? (
                 <nav className='absolute z-10 w-[8rem] h-[16rem] bg-gray-200 top-0 right-0 pt-[80px] flex flex-col items-center justify-center rounded-md shadow-md shadow-gray-400 animeLeft'
                 >
                 <ul className='text-md text-teal-600 font-semibold w-full'>
                  <Link to='../user/userhome'>
                    <li className='w-[100%] py-2 border border-gray-100 text-center hover:bg-teal-500 hover:text-white transition duration-200'>Home</li>
                  </Link>
                  <Link to='../user/solicitacao'>
                    <li  className='w-[100%] py-2 border border-gray-100  text-center hover:bg-teal-500 hover:text-white transition duration-200'>Solicitar</li>
                 </Link>
                  <Link to='../user/termos'>
                    <li  className='w-[100%] py-2 border border-gray-100 text-center hover:bg-teal-500 hover:text-white transition duration-200'>Termos</li>
                 </Link>                  
                    <li  className='w-[100%] py-2 border border-gray-100 cursor-pointer text-center hover:bg-teal-500 hover:text-white transition duration-200'
                        onClick={handleClickLogout}>
                            Sair
                   </li>                 
                 </ul>
             </nav>
            ): ''}
           
          
        </header>
    </>
    )
}

export default MenuMobile;