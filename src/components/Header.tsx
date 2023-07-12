import logoHemo2 from '../assets/images/logoHemolabes1.png'
import userIcon from '../assets/icons/usericon.svg';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useContext, useEffect, useState } from 'react';

const Header = () => {
  const [userStatus, setUserStatus ] = useState(false)
  const [ToggleMenu, setToggleMenu ] = useState(false)

  const { state } = useContext(UserContext)

  useEffect(() => {
    setUserStatus(state.userOn)

  }, [state.userOn])  

  const handleToggleMenu = () => {
    setToggleMenu(!ToggleMenu)

    console.log(ToggleMenu)
  }

    return (
        <header className='h-20 w-full flex items-center justify-between px-6 md:px-2 border-b-[0.1rem] border-teal-100'
                style={{background: 'var(--background-gradient-main)'}}
                >
             <div className='block h-32- w-48 sm:w-28 '>
                <img src={logoHemo2} 
                     alt="logo-laboratório"
                     />
             </div> 

             {userStatus ? (
              
              <ul className='flex gap-4 sm:gap-1 items-center'>

              <Link to='../user/userhome'>
              <li className='cursor-pointer text-[#079E7A] sm:text-sm hover:text-white hover:underline ease-linear duration-200'
              >
                Home
              </li>
              </Link>

              <Link to='../user/solicitacao'>
              <li className='cursor-pointer text-[#079E7A] sm:text-sm hover:text-white hover:underline ease-linear duration-200'
              >
                Agendar
              </li>
              </Link>

              <Link to='../user/termos'>
              <li className='cursor-pointer text-[#079E7A] sm:text-sm hover:text-white hover:underline ease-linear duration-200'
                  >
                Termos
              </li>
              </Link>
              <img src={userIcon}
                   alt="icone-de-usuário"
                   className='w-6 h-6 cursor-pointer' 
                   onClick={handleToggleMenu}/>

                   {userStatus && ToggleMenu ? (
                    <div className='w-[8rem] max-w-max h-[4rem] bg-gray-100 absolute right-1 top-14 rounded-md shadow-md shadow-gray-200'>
                      <ul className='gap-1 flex flex-col justify-center items-start py-2 px-2 cursor-pointer font-regular'
                          style={{color: 'var(--color-main)'}}>
                        <li className='border-b-2 hover:text-teal-700'>Agendamentos</li>
                        <li className='hover:text-teal-700'>Sair</li>
                      </ul>
                    </div>
                   ) : ''}
              </ul>

             ) : (
              <ul className='flex gap-2 sm:gap-1 items-center'>
                <Link to='/userlogin'>
                <li className='font-medium sm:text-sm	 py-1 px-4 border-2 border-teal-300 cursor-pointer text-[#079E7A] hover:bg-teal-500 hover:text-white ease-linear duration-200 hover:border-none rounded-sm hover:shadow-md hover:shadow-teal-400'
                >
                  Login
                </li>
                </Link>

                <Link to='/userlogin/register'>
                <li className='cursor-pointer text-[#6BBFAB] sm:text-sm hover:text-white ease-linear duration-200'
                    >
                  Registrar
                </li>
                </Link>
                <img src={userIcon}
                     alt="icone-de-usuário"
                     className='w-6 h-6' />
            </ul>
             )}

        </header>
    )
}

export default Header