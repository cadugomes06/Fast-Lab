import logoHemo2 from '../assets/images/logoHemolabes1.png'
import userIcon from '../assets/icons/usericon.svg';

const Header = () => {


    return (
        <header className='h-20 w-full flex items-center justify-between px-6 md:px-2 border-b-[0.1rem] border-teal-100'
                style={{background: 'var(--background-gradient-main)'}}
                >
             <div className='block h-32- w-48 sm:w-28 '>
                <img src={logoHemo2} 
                     alt="logo-laboratório"
                     />
             </div> 

            <ul className='flex gap-2 sm:gap-1 items-center'>
                <li className='font-medium sm:text-sm	 py-1 px-4 border-2 border-teal-300 cursor-pointer text-[#079E7A] hover:bg-teal-500 hover:text-white ease-linear duration-200 hover:border-none rounded-sm hover:shadow-md hover:shadow-teal-400'
                >
                  Login
                </li>
                <li className='cursor-pointer text-[#6BBFAB] sm:text-sm hover:text-white ease-linear duration-200'
                    >
                  Registrar
                </li>
                <img src={userIcon}
                     alt="icone-de-usuário"
                     className='w-6 h-6' />
            </ul>
        </header>
    )
}

export default Header