import Header from "../../../components/Header";

const FormConfirm = () => {

    return (
        <>
        <Header />
        <section className="grid grid-cols-6 w-full h-[calc(100vh-80px)]">
          <div className="bg-white"></div>

          <main className="col-span-4  bg-gray-100/30 shadow-md shadow-gray-300 animeLeft rounded-md">

            <div className="w-full h-36 flex flex-col items-center justify-center bg-emerald-100/60
            ">
              <h1 className="text-[1.6rem] textGradient">Parabéns! Sua solicitação foi enviada com Sucesso!!!
              </h1>
            </div>

            <div className="flex justify-start w-full max-h-max pl-8 mt-2">
              <p className="font-normal" 
                 style={{color: 'var(--color-secondary)'}}>Seu agendamento já foi enviado para o nosso time de atendimento online. Estaremos enviando para seu e-mail o <strong>preparo dos seus exames e o status do seu processo de cadastramento.</strong></p>
            </div>

            <div className="flex justify-start w-full max-h-max pl-8 mt-12">
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