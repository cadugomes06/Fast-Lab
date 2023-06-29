import { useState } from "react";
import Header from "../../../components/Header";
import bannerlogin from '../../../assets/images/bannerlogin.png'
import Input from "../../../utils/Input";
import Button from "../../../utils/Button";
import { Link } from "react-router-dom";


const UserLogin = () => {    
  const [emailAtual, setEmailAtual] = useState('');
  const [passwordAtual, setPasswordAtual] = useState('');
   

 

    return (
        <>
        <Header />  
         <div className="w-full h-[calc(100vh-80px)]">
          <section className="grid grid-cols-2 bg-gray-100/20">

            <div className="h-[calc(100vh-80px)]">
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

            <div className="flex items-center justify-center my-8 ml-24 animeLeft">
                <div className="flex flex-col w-full h-[calc(100vh-200px)]">

                   <div className="h-20 flex justify-start items-center relative z-10">
                      <h2 className="text-[2rem] text-gray-400/70 font-normal">
                         Realize seu 
                         <span className="textGradient text-[2.4rem]"> Login</span>
                         <div className="detailAnimation z-0"></div>
                     </h2>
                   </div>

                    <form>
                     <div className="h-96 max-h-max flex flex-col justify-center items-start">

                       <label htmlFor="email"
                              className="justify-start pl-1 w-[350px]"
                              style={{color: "var(--color-secondary)"}}>Email</label>
                        <Input
                           type="email"
                           name=''
                           id='email'
                           placeholder=''
                           width="350px"
                           height="42px"
                           onChange={(e) => setEmailAtual(e.target.value)}
                            />

                      <label htmlFor="password"
                             className="justify-start pl-1 w-[350px]"
                             style={{color: "var(--color-secondary)"}}>Senha</label>
                        <Input
                           type="password"
                           name=''
                           id='password'
                           placeholder=''
                           width="350px"
                           height="42px"
                           onChange={(e) => setPasswordAtual(e.target.value)}
                            />

                           <div className="w-[350px] h-[42px] mt-2">
                            <Button 
                              text="Logar"
                              width="350px"
                              height="42px"
                            />
                            </div>

                            <div className="w-[350px] mt-12 text-sm">
                            <Link to="changepassword"
                               className="text-light underline"
                               style={{color: "var(--color-secondary)"}}>
                              Esqueceu sua senha?
                            </Link>
                            </div>
                        
                            <div className="w-[350px] h-[42px] mt-10">
                            <Link to='register'>  
                            <Button 
                              text="Registrar"
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


export default UserLogin;