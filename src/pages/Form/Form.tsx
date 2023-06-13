import Header from "../../components/Header"
import Button from "../../utils/Button";
import Input from '../../utils/Input';

const Form = () => {

    return (
        <>
        <Header />

        <section className="bg-white flex justify-center items-center flex-col h-max-h"
         >
           <div className="mb-16 mt-8 pl-8 w-full">
              <h1 className="text-[1.8rem] font-bold"
                  style={{color: 'var(--color-main)'}}>
                Solicitação
              </h1>
              <p className="text-base font-normal"
                 style={{color: 'var(--color-secondary)'}}>
                Preencha todos os dados corretamente.
              </p>
            </div>

      
            <form action="">
               <div className="w-[52rem] pb-12 max-h-max bg-gray-100 rounded-md shadow-sm shadow-gray-300"
                >     
                <div className="text-center font-medium pt-8 mb-8"
                     style={{color: 'var(--color-main)'}}>
                  <h4>Dados do convênio</h4>
                </div>

                {/* <div className="flex flex-col px-12 justify-center items-center"> */}

                    <div className="flex items-center pl-12 w-[52rem] h-20">
                      <div>

                      <label htmlFor="convenio" 
                           style={{color: 'var(--color-secondary)'}}
                           className='w-[350px] pb-1'>
                            Convênio
                    </label>
                    <select 
                       name="" 
                       id="convenio"
                       defaultValue='convenio'
                       >
                      <option value="convenio" disabled>Convênio</option>
                      <option value="unimed-inter">Unimed intercambio
                      </option>
                      <option value="mediservice">Mediservice</option>
                      <option value="petrobras">Petrobras</option>
                      <option value="sulamerica">Sul América</option>
                      <option value="amil">Amil</option>
                      <option value="assim">Assim</option>
                      <option value="gama">Gama Saúde</option>
                    </select>
                    </div>
                    <div>

                    <label htmlFor="cardnumber"
                           style={{color: 'var(--color-secondary)'}}
                           className='w-[350px] pb-1'>
                             Carteirinha                             
                    </label>
                    <Input type="text" name='' id='cardnumber' width='350px' height="42px" placeholder="111222333444555"
                     />
                     </div>
                     </div>
                    
                    <div className="text-center font-medium py-2 mt-8 mb-8"
                     style={{color: 'var(--color-main)'}}>
                       <h4>Dados do Paciente</h4>
                       <hr></hr>
                    </div>
                     
                   <div className="flex w-full h-60 flex-wrap items-center justify-center"
                   >
                    <label htmlFor="name"
                           style={{color: 'var(--color-secondary)'}}
                           className='w-[350px] pb-1 mr-8'>
                       Nome civil
                    <Input 
                        type="text"
                        name=''
                        id='name'
                        placeholder="João Batista" 
                        width="350px"
                        height="42px"
                         />
                      </label>


                    <label htmlFor="socialname"
                           style={{color: 'var(--color-secondary)'}}
                           className='w-[350px] pb-1'>
                       Nome social
                    <Input 
                        type="text"
                        name=''
                        id='socialname'
                        placeholder="" 
                        width="350px"
                        height="42px"
                         />
                     </label>

                     <label htmlFor="email"
                           style={{color: 'var(--color-secondary)'}}
                           className='w-[350px] pb-1 mr-8'>
                         E-mail
                     <Input 
                        type="email"
                        name=''
                        id='email'
                        placeholder="exemplo@gmail.com" 
                        width="350px"
                        height="42px"
                         />
                      </label>
                      <div className="h-20 w-[350px] flex">
                        <div>
                          <label htmlFor="birth"
                            style={{color: 'var(--color-secondary)'}}
                            className='w-[350px] pb-1'>
                            Nascimento
                          </label>
                          <Input 
                            type="date" 
                            name='' 
                            id="birth" 
                            placeholder="00/00/0000" 
                            height="42px"
                            width="130px"
                            />
                        </div>

                        <div>
                          <label htmlFor="birth"
                            style={{color: 'var(--color-secondary)'}}
                            className='w-[350px] pb-1'>
                             CPF
                          </label>
                          <Input 
                            type="text" 
                            name='' 
                            id="birth" 
                            placeholder="000.000.000-00" 
                            height="42px"
                            width="200px"
                            />
                        </div>
                      </div>

                      <div className="w-full max-h-max flex justify-start pl-12">
                         <div className="flex items-center">
                          <h2 style={{color: 'var(--color-main)'}} className="font-semibold">Sexo:</h2>
                         </div>

                         <div className="flex w-[300px] items-center justify-evenly">
                          <label htmlFor="man" className="text-sm" style={{color: 'var(--color-main)'}}>Masculino
                          <input type="radio" name="sexo" id="man" className="ml-1" />
                          </label>
                          <label htmlFor="woman" className="text-sm" style={{color: 'var(--color-main)'}}>Feminino
                          <input type="radio" name="sexo" id="woman" className="ml-1"/>
                          </label>
                          <label htmlFor="undefined" className="text-sm" style={{color: 'var(--color-main)'}}>Indefinido
                          <input type="radio" name="sexo" id="undefined" className="ml-1" />
                          </label>
                         </div>
                      </div>
                      </div>

                      <div className="text-center font-medium py-2 mt-8 mb-8"
                           style={{color: 'var(--color-main)'}}>
                               <h4>Endereço do Paciente</h4>
                               <hr></hr>
                      </div>

                     <div className="flex flex-wrap gap-8 pl-12 mb-8">
                      <div className="h-20 w-[350px] flex mb-2">
                        <div>
                          <label htmlFor="cep"
                            style={{color: 'var(--color-secondary)'}}
                            className='w-[350px] pb-1'>
                            CEP
                          </label>
                          <Input 
                            type="text" 
                            name='' 
                            id="cep" 
                            placeholder="22333-444" 
                            height="42px"
                            width="100px"
                            />
                        </div>

                        <div>
                          <label htmlFor="street"
                            style={{color: 'var(--color-secondary)'}}
                            className='w-[350px] pb-1'>
                             Rua
                          </label>
                          <Input 
                            type="text" 
                            name='' 
                            id="street" 
                            placeholder="Recanto da Alvorada" 
                            height="42px"
                            width="240px"
                            />
                        </div>
                      </div>

                      
                      <div className="h-20 w-[350px] flex ">
                        <div className="pr-[10px]">
                          <label htmlFor="num"
                            style={{color: 'var(--color-secondary)'}}
                            className='w-[350px] pb-1'>
                            N°
                          </label>
                          <Input 
                            type="text" 
                            name='' 
                            id="num" 
                            placeholder="000" 
                            height="42px"
                            width="100px"
                            />
                        </div>

                        <div>
                          <label htmlFor="neighborhood"
                            style={{color: 'var(--color-secondary)'}}
                            className='w-[350px] pb-1'>
                             Bairro
                          </label>
                          <Input 
                            type="text" 
                            name='' 
                            id="neighborhood" 
                            placeholder="Centro" 
                            height="42px"
                            width="240px"
                            />
                        </div>
                       </div>
                      </div>

                      <div className="text-center font-medium py-2 mt-4 mb-8"
                           style={{color: 'var(--color-main)'}}>
                               <h4>Escolha sua unidade e Anexe seu pedido</h4>
                                <hr></hr>
                      </div>

                     <div className="flex pl-12 gap-4 mb-4">
                      <select defaultValue='unidade'>
                        <option value="unidade" disabled>Unidade de atendimento</option>
                        <option value="cavaleiros">Cavaleiro (Nossa Senhora da Glória)</option>
                        <option value="matriz">Matriz (Rua Conde de Araruama)</option>
                      </select>

                      <label htmlFor="document" className="mt-4"></label>
                      <Input type="file" name="" id="document" placeholder="" />
                      </div>

                      <div className="flex justify-center">
                      <Button 
                          text='agendar'
                          width="350px"
                          height="42px"
                          marginTop="1rem"
                          marginBottom="" />
                      </div>

                </div>              
            </form>
        </section>
        </>
    )
} 

export default Form