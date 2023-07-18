import { useEffect, useContext } from "react";
import Header from "../../../components/Header";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Termos = () => {
    const { state } = useContext(UserContext)

    const navigate = useNavigate()

    useEffect(() => {
        if (state.userOn === false) {
            navigate('../userlogin')
        }
    }, [state.userOn])

    return (
        <>
        <Header />

        <section className="grid grid-cols-6 w-full h-[calc(100vh-80px)] py-2 rounded-md">
          <div className="bg-white"></div>

          <main className="col-span-4 bg-gray-100/50 shadow-md shadow-gray-300 animeLeft rounded-md mb-4">
            <div className="bg-gray-100 h-28 w-full flex justify-center items-center rounded-md">
                <h1 className="text-2xl font-bold uppercase textGradient">
                 Condições para o pré cadastramento
                </h1>
            </div>

            <div>
              <div className="w-full h-16 flex items-center pl-4 mt-8">
                <h2 className="text-lg font-semibold" style={{color: 'var(--color-main)'}} >Envio da solicitação.</h2>
              </div>

              <div className="h-[5rem] w-full flex items-center px-4">
                <p className="text-md font-normal" style={{color: 'var(--color-secondary)'}}>Após o envio da sua solicitação. Nossa equipe de atendimento online irá realizar todo <strong>seu cadastramento e autorização</strong> com o respectivo convênio em <strong>até 48 horas úteis</strong>. 
                Ao finalizar a etapa de cadastramento, <strong>será enviado um e-mail para o paciente informando o status do seu processo e preparação para o exame</strong>.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <div className="w-full h-8 flex items-center pl-4">
                <h2 className="text-lg font-semibold" style={{color: 'var(--color-main)'}} >Convênios disponíveis para essa modalidade.</h2>
              </div>

                <ul className="w-full max-h-max py-2 pl-4 gap-4 font-semibold" style={{color: 'var(--color-secondary)'}}>
                   <li>Petrobras</li> 
                   <li>Periódico (Petrobras)</li> 
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

                <div className="h-[5rem] w-full flex items-center px-4">
                <p className="text-md font-normal" style={{color: 'var(--color-secondary)'}}>
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