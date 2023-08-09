import Header from "../../../components/Header";
import checkOneIcon from '../../../assets/icons/checkone.svg'
import closeIcon from '../../../assets/icons/close.svg'
import {useState, useEffect } from 'react';
import MenuMobile from "../../../components/MenuMobile";

const FormConfirm = () => {
  const [isMobile, setIsMobile] = useState(false)

  const {innerWidth: width} = window
  useEffect(() => {
    if(width < 600 ) {
      setIsMobile(true)
    }
  }, [width])

    return (
        <>
        {isMobile? <MenuMobile /> : <Header />}
        
        <section className="grid grid-cols-6 w-full h-[calc(100vh-80px)] md:grid-cols-12">
          <div className="bg-white"></div>

          <main className="col-span-4 md:col-span-10 bg-gray-100/30 shadow-md shadow-gray-300 animeLeft rounded-md mt-2">

            <div className="w-full h-36 flex flex-col items-center justify-center bg-emerald-100/60 rounded-md
            ">
              <h1 className="text-[1.6rem] textGradient lg:text-[1.4rem] md:px-8 sm:text-[1.2rem] ssm:px-2">Parabéns! Sua solicitação foi enviada com Sucesso!!!
              </h1>
            </div>

            <div className="flex justify-start w-full max-h-max px-8 mt-8 ssm:px-4">
              <p className="font-normal" 
                 style={{color: 'var(--color-secondary)'}}>Sua solicitação já foi enviado para o nosso time de atendimento online. Estaremos enviando o quanto antes para seu e-mail o <strong>preparo dos seus exames e o status do seu processo de cadastramento.</strong></p>
            </div>

            <div className="flex flex-col justify-start w-full max-h-max px-8 mt-8 ssm:px-4">

              <h2 className="text-lg font-semibold mb-1" style={{color: 'var(--color-main)'}}>
                Atenção
                <span className="text-red-500"> !!!</span>
              </h2>

              <p className="font-normal mb-2" 
                 style={{color: 'var(--color-secondary)'}}> Após receber sua confirmação do seu pré cadastramento,<strong> é indispensável para o atendimento presencial</strong>, cumprir esses requesitos.
              </p>

              <ul className="flex flex-col ">
                <li className="flex text-sm text-gray-600"> Comparecer com documento original com foto ou digital (CNH Digital, Identidade Digital)
                  <img className="w-[22px] h-[22px] pl-1" src={checkOneIcon} alt="" />
                </li>
                <li className="flex text-sm text-gray-600">Levar o pedido médico original (caso o pedido seja digital, não será necessário).
                  <img className="w-[22px] h-[22px] pl-1" src={checkOneIcon} alt="" />
                </li>
                <li className="flex text-sm text-gray-600 pb-1"> Realizar o preparo corretamente que foi enviado pelo time de atendimento online.
                  <img className="w-[22px] h-[22px] pl-1" src={checkOneIcon} alt="" />
                </li>

                <hr></hr>

                <li className="flex text-sm text-gray-600 pt-1"> Não será aceito foto do documento ou copia do documento, sem justificativa jurídica.
                  <img className="w-[22px] h-[22px] pl-1" src={closeIcon} alt="" />
                </li>
               
              </ul>
            </div>

            <div className="flex justify-start w-full max-h-max pl-8 my-12 ssm:pl-4">
              <h3 className="font-normal underline" 
                 style={{color: 'var(--color-main)'}}>
                  <a href="/user/userhome">
                  Voltar para página inicial.
                  </a>
              </h3>
            </div>

        

          </main>          
          <div className="bg-white"></div>
        </section>
        </>
    )
}


export default FormConfirm;