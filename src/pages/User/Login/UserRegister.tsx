import Header from "../../../components/Header";
import bannerlogin from '../../../assets/images/bannerlogin.png'
import Input from "../../../utils/Input";
import Button from "../../../utils/Button";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from '../../../services/firebaseConfig';
import { UserContext } from "../../../context/UserContext";

const UserRegister = () => {
  const [emailAtual, setEmailAtual] = useState('');
  const [passwordAtual, setPasswordAtual] = useState('');
  const [errorRegister, setErrorRegister] = useState('');
  const [successRegister, setSuccessRegister] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  const { state } = useContext(UserContext)
  
  if (state.userOn === true) {
    state.toggleUserLog()
  }
  
  const [createUserWithEmailAndPassword, loading] =
    useCreateUserWithEmailAndPassword(auth);

  const navigate = useNavigate()

  const handleClickRegister = async (event: any) => {
    event.preventDefault()
    setErrorRegister('')
    setSuccessRegister('')
    
    if (emailAtual === '' || passwordAtual === '') {
      setErrorRegister('Preencha todos os campos corretamente.')
    } else if (passwordAtual.length < 8 ) {
      setErrorRegister('A senha deve conter no mínimo 8 caracteres!')
    } else {
      const res = await createUserWithEmailAndPassword(emailAtual, passwordAtual)

      if(res) {
        setSuccessRegister('Conta criada com sucesso!')
        // setUserAccount(res.user.uid)
        
        setTimeout(() => {
        navigate('../userlogin')        
      }, 2000)
     } else {
      return setErrorRegister('email já está em uso!')
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
         <div className="w-full h-[calc(100vh-80px)]">
          <section className="grid grid-cols-2 bg-gray-100/30 md:grid-cols-1 h-[calc(100vh-80px)]">

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

            <div className="flex items-center justify-center my-8 ml-24 lg:ml-8 animeLeft sm:ml-0">
                <div className="flex flex-col w-full h-[calc(100vh-200px)] md:justify-center md:items-center">

                   <div className="h-20 flex justify-start items-center relative sm:max-w-max">
                      <h2 className="text-[2rem] sm:text-[1.5rem] text-gray-400/70 font-normal sm:w-[300px]">
                         Criar minha 
                         <span className="textGradient text-[2.4rem] sm:text-[1.8rem]"> Conta</span>
                     </h2>
                   </div>

                    <form onSubmit={handleClickRegister}>
                     <div className="h-96 max-h-max flex flex-col justify-center items-start md:items-center">

                       <label htmlFor="email"
                              className="justify-start pl-1 w-[350px] sm:w-[300px]"
                              style={{color: "var(--color-secondary)"}}>Email</label>
                        <Input
                           type="email"
                           name=''
                           id='email'
                           placeholder='exemplo@email.com'
                           width={isMobile? '300px' : "350px"}
                           height="42px"
                           onChange={(e) => setEmailAtual(e.target.value)}
                            />

                      <label htmlFor="password"
                             className="justify-start pl-1 w-[350px] sm:w-[300px]"
                             style={{color: "var(--color-secondary)"}}>Senha</label>
                        <Input
                           type="password"
                           name=''
                           id='password'
                           placeholder='**********'
                           width={isMobile? '300px' : "350px"}
                           height="42px"
                           onChange={(e) => setPasswordAtual(e.target.value)}
                            />

                           <div className="w-[350px] sm:w-[300px] h-[42px] mt-2">
                            {loading? (
                              <Button 
                              text="Registrando..."
                              width={isMobile? '300px' : "350px"}
                              height="42px"
                              disabled
                            />
                            ) : 
                            <Button 
                              text="Criar"
                              width={isMobile? '300px' : "350px"}
                              height="42px"
                            />}
                            </div>
                            
                            {errorRegister? <p className="text-red-500 pt-1">{errorRegister}</p> : ''}
                            {successRegister? <p className="text-teal-500 pt-1">{successRegister}</p>  : ''}

                            <div className="w-[350px] sm:w-[300px] mt-12 text-sm">
                            <p 
                               className="text-light"
                               style={{color: "var(--color-secondary)"}}>
                              Já tenho uma conta.
                            </p>
                            </div>
                        
                            <div className="w-[350px] sm:w-[300px] h-[42px] mt-2">
                            <Link to='/userlogin'> 
                            <Button 
                              text="Login"
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


export default UserRegister;