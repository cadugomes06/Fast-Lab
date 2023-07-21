import logoHemo2 from '../assets/images/logoHemolabes1.png'


const HeaderAdmin = () => {
  

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
      

        </header>
        </>
    )
}

export default HeaderAdmin