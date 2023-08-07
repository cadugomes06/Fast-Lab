import logoHemo2 from '../assets/images/logoHemolabes1.png'
import userIcon from '../assets/icons/usericon.svg';
import LoadingCup from '../components/LoadingCup'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { useContext, useEffect, useState } from 'react';
import { useSignOut } from 'react-firebase-hooks/auth';
import { auth } from '../services/firebaseConfig';

const Header = () => {
  const [userStatus, setUserStatus ] = useState(false)
  const [isMobile, setIsMobile ] = useState(false)

  const [signOut, loading, error] = useSignOut(auth);

  const { state } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    setUserStatus(state.userOn)
  }, [state.userOn])  

  const handleClickLogout = async () => {
    const success = await signOut()
    if (success) {
      window.localStorage.removeItem('user')
      window.localStorage.removeItem('UserAccount')
      state.toggleUserLog()

        navigate('/userlogin')
    }
    if(error) {
      alert('Erro inesperado!' + error)
    }
  }

  const { innerWidth: width } = window
  useEffect(() => {
    if(width < 600 ) {
        setIsMobile(true)
    }
}, [width])


    return (
        <>
        {loading ? <LoadingCup /> : null}

        <header className='h-20 w-full flex items-center justify-between px-6 md:px-2 sm:px-4 border-b-[0.1rem] border-teal-100'
                style={isMobile ? {background: 'white'} : {background: 'var(--background-gradient-main)'}}
                >
             <div className='block h-32- w-48 sm:w-28 '>
                <img src={logoHemo2} 
                     alt="logo-laboratório"
                     />
             </div> 

             {userStatus?             

              <ul className='flex gap-4 sm:gap-1 items-center'>

              <Link to='../user/userhome'>
              <li className='cursor-pointer text-sm font-semibold sm:text-sm hover:text-white hover:underline ease-linear duration-200 uppercase text-teal-500'
              >
                Home
              </li>
              </Link>

              <Link to='../user/solicitacao'>
              <li className='cursor-pointer text-sm font-semibold sm:text-sm hover:text-white hover:underline ease-linear duration-200 uppercase text-teal-500'
              >
                Solicitar
              </li>
              </Link>

              <Link to='../user/termos'>
              <li className='cursor-pointer text-sm font-semibold sm:text-sm hover:text-white hover:underline ease-linear duration-200 uppercase text-teal-500'
                  >
                Termos
              </li>
              </Link>

              <li className={`cursor-pointer text-sm font-semibold sm:text-sm text-teal-500 hover:text-white hover:underline ease-linear duration-200 uppercase`}
              
                  onClick={handleClickLogout}>
                Sair
              </li>

              <img src={userIcon}
                   alt="icone-de-usuário"
                   className='w-6 h-6' 
                   />
            </ul>

              : (
              <ul className='flex gap-2 items-center'>
                <Link to='/userlogin'>
                <li className='font-medium sm:text-sm	 py-1 px-4 border-2 border-teal-300 cursor-pointer text-[#079E7A] hover:bg-teal-500 hover:text-white ease-linear duration-200 hover:border-none rounded-sm hover:shadow-md hover:shadow-teal-400'
                >
                  Login
                </li>
                </Link>

                {!isMobile ? (
                  <Link to='/userlogin/register'>
                  <li className='cursor-pointer text-[#6BBFAB] sm:text-sm hover:text-white ease-linear duration-200'
                      >
                    Registrar
                  </li>
                  </Link>
                ) : ''}

                <img src={userIcon}
                     alt="icone-de-usuário"
                     className='w-6 h-6' />
            </ul>
             )}

        </header>
        </>
    )
}

export default Header