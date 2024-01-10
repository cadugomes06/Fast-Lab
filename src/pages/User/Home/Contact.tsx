import Input from "../../../utils/Input";
import Header from "../../../components/Header";

const Contact = () => {
  return (
    <div>
      <Header />

      <div className="mt-8 pl-8 w-full animeLeft sm:pl-4 sm:mt-6 sm:pr-16">
        <h1 className="text-[1.8rem] font-bold textGradient sm:text-[1.5rem] sm:mb-2">
          Deixe sua opnião!
        </h1>
        <p
          className="text-base font-normal sm:text-sm"
          style={{ color: "var(--color-secondary)" }}
        >
          Seu feedback pode nos ajudar a melhorarmos nossa plataforma.
        </p>
      </div>

      <section className="w-full h-[100vh] flex items-center justify-center">
        <div className="w-[30rem] h-[36rem] animeLeft pb-12 mb-4 max-h-max bg-gray-200 rounded-md shadow-md shadow-gray-400 md:w-[40rem] sm:w-[20rem]">

          <form action="">
            <div className="flex flex-col items-center mt-8">
              <label htmlFor="name" 
                     className="w-[300px] pl-1"
                     style={{color: 'var(--color-secondary)'}}>Nome</label>
              <Input
                type="text"
                name=""
                id="name"
                placeholder="Seu nome..."
                width="300px"
                height="42px"
              />
            </div>

            <div className="flex flex-col items-center">
              <label htmlFor="subject" 
                     className="w-[300px] pl-1"
                     style={{color: 'var(--color-secondary)'}}>Assunto</label>
              <Input
                type="text"
                name=""
                id="subject"
                placeholder="Mudar a página..."
                width="300px"
                height="42px"
              />
            </div>

            <div>
              <label htmlFor="message">Mensagem</label>
              <textarea name="" id="message" cols={30} rows={10}></textarea>
            </div>

            <div>
              <button></button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
