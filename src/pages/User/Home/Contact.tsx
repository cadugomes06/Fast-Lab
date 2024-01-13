import emailjs from '@emailjs/browser'
import { useState, useRef } from 'react';
import Input from "../../../utils/Input";
import Button from "../../../utils/Button";
import Header from "../../../components/Header";

const Contact = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const form: any = useRef()

  const sendForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (name === '' || email === '' || message === '') {
      return alert('preencha todos os campos corretamente!')
    }

    emailjs.sendForm('gmailMessage', 'template_qciiihp', form.current, '0V_vLrWglpX2kkb4P')
      .then(() => {
        alert('Feedback enviado com sucesso!')
      }, (error: any) => {
        alert('Error ao enviar formulário!' + error.text);
      });
      
      setName('')
      setEmail('')
      setMessage('')
  }

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
          Seu feedback pode ajudar a melhorar nossa plataforma.
        </p>
      </div>

      <section className="w-full h-[100vh] flex items-center justify-center">
        <div className="w-[30rem] h-[36rem] animeLeft pb-12 mb-4 max-h-max bg-gray-200 rounded-md shadow-md shadow-gray-400 md:w-[40rem] sm:w-[20rem]">

          <form ref={form} onSubmit={sendForm}>
            <div className="flex flex-col items-center mt-8">
              <label htmlFor="name" 
                     className="w-[300px] pl-1"
                     style={{color: 'var(--color-secondary)'}}>Nome</label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Seu nome..."
                width="300px"
                height="42px"
                onChange={({target}) => setName(target.value)}
              />
            </div>

            <div className="flex flex-col items-center">
              <label htmlFor="email" 
                     className="w-[300px] pl-1"
                     style={{color: 'var(--color-secondary)'}}>E-mail</label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="exemplo@gmail.com"
                width="300px"
                height="42px"
                onChange={({target}) => setEmail(target.value)}
              />
            </div>

            <div className="mt-4 flex flex-col items-center">
              <label htmlFor="message" className="w-[300px] pl-1"
                     style={{color: 'var(--color-secondary)'}}>Mensagem</label>
              <textarea name="message" 
                        id="message" 
                        cols={20} 
                        rows={10}
                        maxLength={150}
                        className="w-[300px] h-[160px] border-none outline-none py-2 px-2 text-[16px] font-semibold resize-none rounded-md shadow-md"
                        style={{color: 'var(--color-main)'}}
                        onChange={({target}) => setMessage(target.value)}
                        >

              </textarea>
            </div>

            <div className="w-full h-[160px] flex items-center justify-center">
              <Button 
                  text="Enviar"
                  type='submit'
                  width="300px"
                  height="50px"
                  background='teal'
                  color='white'
                  boxShadow='1px 1px 6px 1px'
              />
            </div>

          </form>
        </div>
      </section>

    </div>
  );
};

export default Contact;
