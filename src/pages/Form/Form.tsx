import Header from "../../components/Header"
import Button from "../../utils/Button";
import Input from '../../utils/Input';

const Form = () => {

    return (
        <>
        <Header />

        <section className="bg-gray-100 h-[calc(100vh-80px)] flex justify-center items-center flex-col"
         >
           <div className="mb-4 pl-8 w-full">
              <h1 className="text-[1.8rem] font-bold"
                  style={{color: 'var(--color-main)'}}>
                Solicitação
              </h1>
              <p className="text-base font-normal"
                 style={{color: 'var(--color-secondary)'}}>
                Preencha todos os dados corretamente e avançe até o fim.
              </p>
            </div>

      
            <form action="">
               <div className="w-[38rem] h-[26rem] max-h-max bg-white rounded-md shadow-sm shadow-gray-300"
                >     
                <div className="text-center font-medium py-2 mb-12"
                     style={{color: 'var(--color-main)'}}>
                  <h4>Dados do convênio</h4>
                </div>

                <div className="flex flex-col px-12 justify-center items-center">
                    <label htmlFor="convenio" 
                           style={{color: 'var(--color-secondary)'}}
                           className='w-[350px] pb-1'>
                            Convênio
                    </label>
                    <select 
                       name="" 
                       id="convenio"
                       >
                      <option value="" selected disabled>Convênio</option>
                      <option value="unimed-inter">Unimed intercambio
                      </option>
                      <option value="mediservice">Mediservice</option>
                      <option value="petrobras">Petrobras</option>
                      <option value="sulamerica">Sul América</option>
                      <option value="amil">Amil</option>
                      <option value="assim">Assim</option>
                      <option value="gama">Gama Saúde</option>
                    </select>

                    <label htmlFor="cardnumber"
                           style={{color: 'var(--color-secondary)'}}
                           className='w-[350px] pb-1'>
                             Carteirinha                             
                    </label>
                    <Input type="text" name='' id='cardnumber' width='350px' height="42px" placeholder="018000000000000"
                     />

                     <Button 
                         text="Avançar" 
                         width="350px" 
                         height="42px"
                         marginBottom="10px"
                         marginTop="4rem"
                         onClick={() => {}}
                         />
                </div>

              </div>
            </form>
        </section>
        </>
    )
} 

export default Form