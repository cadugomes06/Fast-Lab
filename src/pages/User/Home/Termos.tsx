import { useEffect, useContext, useState } from "react";
import Header from "../../../components/Header";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import MenuMobile from "../../../components/MenuMobile";

const Termos = () => {
    const [isMobile, setIsMobile] = useState(false)
    const { state } = useContext(UserContext)

    const navigate = useNavigate()

    useEffect(() => {
        if (state.userOn === false) {
            navigate('../userlogin')
        }
    }, [state.userOn])

    const {innerWidth: width} = window
    useEffect(() => {
      if(width < 600 ) {
        setIsMobile(true)
      }
    }, [width])

    return (
        <>
        {isMobile? <MenuMobile /> : <Header />}

        <section className="grid grid-cols-6 w-full h-[calc(100vh-80px)] py-2 rounded-md max-h-max md:grid-cols-12">
          <div className="bg-white"></div>

          <main className="col-span-4 md:col-span-10 bg-gray-100/50 shadow-md shadow-gray-300 animeLeft rounded-md mb-4">
            <div className="bg-gray-100 h-28 w-full flex justify-center items-center 
            rounded-md sm:pl-4 sm:flex-wrap">
                <h1 className="text-2xl md:text-xl sm:text-md font-bold uppercase textGradient">
                 Condições para o pré cadastramento
                </h1>
            </div>

            <div className="sm:flex sm:flex-col sm:pb-4">
              <div className="w-full h-16 flex items-center pl-4 mt-8 sm:pb-14 ssm:pb-20">
                <h2 className="text-lg sm:text-md font-semibold" style={{color: 'var(--color-main)'}} >Envio da solicitação.</h2>
              </div>

              <div className="h-[5rem] w-full flex items-center px-4 md:mb-2 max-h-max ssm:mb-8">
                <p className="text-md sm:text-sm font-normal" style={{color: 'var(--color-secondary)'}}>Após o envio da sua solicitação. Nossa equipe de atendimento online irá realizar todo <strong>seu cadastramento e autorização</strong> com o respectivo convênio em <strong>até 24 horas</strong>. 
                Ao finalizar a etapa de cadastramento, <strong>será enviado um e-mail para o paciente informando o status do seu processo e preparação para o exame</strong>.
                </p>
              </div>
            </div>

            <div className="mt-8 md:mt-14 ">
              <div className="w-full h-8 flex items-center pl-4 sm:pb-6">
                <h2 className="text-lg sm:text-md font-semibold" style={{color: 'var(--color-main)'}} >Convênios disponíveis para essa modalidade.</h2>
              </div>

                <ul className="w-full max-h-max py-2 pl-4 gap-4 font-semibold sm:text-sm sm:pb-6 ssm:pb-8" style={{color: 'var(--color-secondary)'}}>
                   <li>Petrobras</li> 
                   <li>Sul América</li> 
                   <li>Unimed Intercâmbio</li> 
                   <li>Amil Saúde</li> 
                   <li>Assim Saúde</li> 
                   <li>Mediservice</li> 
                   <li>Gama Saúde</li> 
                   <li>Integral Saúde</li> 
                   <li>Caberj Saúde</li> 
                   <li>Cedae Saúde</li> 
                </ul>

                <div className="h-[5rem] w-full flex items-center px-4 md:mb-4 sm:mb-14">
                <p className="text-md sm:text-sm font-normal" style={{color: 'var(--color-secondary)'}}>
                  Alguns convênios que aceitamos no atendimento presencial, no momento não estão disponíveis para a modalidade de pré cadastramento. Confira os demais convênios aceitos <a href="http://www.hemolabes.com/site/convenios.php" target="_blank" className="font-semibold underline uppercase">aqui</a>.
                </p>
              </div>
            </div>


          </main>

          <div className="bg-white"></div>
        </section>
        </>
    )
}


export default Termos;
