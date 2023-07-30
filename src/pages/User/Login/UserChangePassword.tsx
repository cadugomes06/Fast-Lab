import Header from "../../../components/Header";
import bannerlogin from '../../../assets/images/bannerlogin.png'
import Input from "../../../utils/Input";
import Button from "../../../utils/Button";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../context/UserContext";

import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { auth } from '../../../services/firebaseConfig'

const UserCrangePassword = () => {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [messageError, setMessageError] = useState('')
  const [isMobile, setIsMobile] = useState(false)

  const { state } = useContext(UserContext)

  const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(
    auth
  );
  
  if (state.userOn === true) {
    state.toggleUserLog()
  }

  const handleChangePasssword = async (e: any) => {
    e.preventDefault()
    setMessage('')
    setMessageError('')
    if(sending || error ){
      console.log(sending, error)
    }
   
    if (email === '') {
      setMessageError('Preencha um e-mail.')
    } else {
      const success = await sendPasswordResetEmail(email)
      if (success) {
        setMessage('Solicitado com sucesso!')
      } else {
        setMessage('Houve um error inesperado.')
      }
    }
  }

  const {innerWidth: width} = window
  useEffect(() => {
    if (width < 600 ) {
      setIsMobile(true)
    }
  }, [width])

    return (
        <>
        <Header />  

         <div className="w-full h-[calc(100vh-80px)] sm:flex sm:justify-center">
          <section className="grid grid-cols-2 bg-gray-100/20 md:grid-cols-1 ">

            <div className="h-[calc(100vh-80px)] md:hidden">
                <div className="h-[calc(100vh-80px)] flex justify-center items-center relative border-r-[1px] border-teal-100"
                     style={{background: "var(--background-gradient-secondary)"}}>
                    <img src={bannerlogin} 
                         alt="imagem-laboratório-clinico"
                         className="h-full object-contain" />
                    <a href="https://storyset.com/medical"
                       className="text-[4px] absolute bottom-0 left-0">
                        Medical illustrations by Storyset</a>
                </div>
            </div>

            <div className="flex items-center justify-center my-8 ml-24 md:ml-8 sm:ml-0 animeLeft">
                <div className="flex flex-col w-full h-[calc(100vh-200px)] md:justify-center md:items-center">

                   <div className="h-20 flex justify-start items-center relative md:w-[300px]">
                      
                   </div>

                    <form onSubmit={handleChangePasssword}>
                     <div className="h-96 max-h-max flex flex-col justify-start items-start md:items-center">

                     <h2 className="text-[2rem] text-gray-400/70 font-normal pb-8">
                         Alterar sua 
                         <span className="textGradient text-[2.4rem]"> Senha</span>
                     </h2>

                       <label htmlFor="email"
                              className="justify-start pl-1 w-[350px] sm:w-[300px]"
                              style={{color: "var(--color-secondary)"}}>Email</label>
                        <Input
                           type="email"
                           name=''
                           id='email'
                           placeholder=''
                           width={isMobile? '300px' : "350px"}
                           height="42px"
                           onChange={(e: any) => setEmail(e.target.value)}
                            />

                           <div className="w-[350px] sm:w-[300px] h-[42px] mt-2">
                            <Button 
                              text="Solicitar"
                              width={isMobile? '300px' : "350px"}
                              height="42px"
                              onClick={handleChangePasssword}
                            />
                            {messageError? <p className="text-red-500">{messageError}</p> : ''}
                            {message? <p className="text-green-500">{message}</p> : ''}
                            </div>
                        
                            <div className="w-[350px] sm:w-[300px] h-[42px] mt-14">
                            <Link to='/userlogin'>
                            <Button 
                              text="Voltar"
                              width="150px"
                              height="42px"
                              background='white'
                              borderColor='teal'
                              color='teal'
                            />
                            </Link>
                            </div>
                     </div> 
                    </form>
                </div>
            </div>            
            
          </section>  
        </div>
        </>
    )
}


export default UserCrangePassword;