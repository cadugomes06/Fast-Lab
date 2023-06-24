import Header from "../../../components/Header";
import bannerlogin from '../../../assets/images/bannerlogin.png'
import Input from "../../../utils/Input";


const UserLogin = () => {
    

    return (
        <>
        <Header />  
         <div className="w-full h-[calc(100vh-80px)]">
          <section className="grid grid-cols-2 ">

            <div className="h-[calc(100vh-80px)]">
                <div className="h-[calc(100vh-80px)] flex justify-center items-center relative"
                     style={{background: "var(--background-gradient-main)"}}>
                    <img src={bannerlogin} 
                         alt="imagem-laboratório-clinico"
                         className="h-full object-contain" />
                    <a href="https://storyset.com/medical"
                       className="text-[4px] absolute bottom-0 left-0">
                        Medical illustrations by Storyset</a>
                </div>
            </div>

            <div className="flex items-center justify-center bg-gray-100/10">
                <div className="flex flex-col w-full h-[calc(100vh-200px)]">

                   <div className="h-20 flex justify-center items-end">
                      <h2 className="text-[2rem]">
                         Realize seu <span>Login</span>
                     </h2>
                   </div>

                    <form>
                     <div className="h-80 flex flex-col justify-center items-center ">

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
                            />
                        
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