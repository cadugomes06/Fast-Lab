import { useState, useEffect } from "react";
import Header from "../../components/Header"
import Button from "../../utils/Button";
import Input from '../../utils/Input';
import { collection, getDocs, addDoc } from "firebase/firestore";
import { db } from '../../services/firebaseConfig';

const Form = () => {
  const [plan, setPlan ] = useState('');
  const [cardNumber, setCardNumber ] = useState('');
  const [name, setName ] = useState('');
  const [socialName, setSocialName ] = useState('');
  const [email, setEmail ] = useState('');
  const [birth, setBirth ] = useState('');
  const [CPF, setCPF ] = useState('');
  const [sexo, setSexo] = useState('')
  const [CEP, setCEP] = useState('')
  const [street, setStreet] = useState('')
  const [number, setNumber] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [unit, setUnit] = useState('')

  const [ planRule, setPlanRule ] = useState('')
  const [ forms, setForms ] = useState([])

  const [ cardnumberError, setCardnumberError ] = useState('')



  const formsCollectionRef = collection(db, 'formulario')

  useEffect(() => {
    const getForms = async () => {
      const data = await getDocs(formsCollectionRef)
      const a: any = data.docs.map((doc) => ({ ...doc.data(), id: doc.id}))
      setForms(a)
    }
    getForms()
  }, [])


  const createRequest = async (e: any) => {
    e.preventDefault()
    // const regexNocaracter = /[^a-zA-Z0-9]/g  //Remove tudo que não for letra ou número
   
    // if (plan === 'convenio' || cardNumber === '' || name === '' ||
    //    email === '' || birth === '' || sexo === '' || 
    //    CPF === '' || CEP === '' || street === '' ||
    //    number === '' || neighborhood === '' || unit === '') 
    //    {
    //     alert('preencha todos os campos')
    // } else 
    if ((plan === 'unimed-inter' || plan === 'sulamerica') 
       && cardNumber.length < 17) {
      console.log('error unimed ou sul america')
    } else if (plan === 'mediservice' && cardNumber.length < 15) {
      console.log('error mediservice')
      return;
    } else if (plan === 'petrobras' && cardNumber.length < 11) {
      console.log('error petrobras')
      return;
    } else if (plan === 'amil' && cardNumber.length < 9) {
      console.log('error amil')
      return;
    } else if (plan === 'assim' && cardNumber.length < 18) {
      console.log('error assim')
      return;
    } else if (plan === 'gama' && cardNumber.length < 7) {
      console.log('error gama')
      return;
    } else {   
    // await addDoc(formsCollectionRef, {
    //   plan: plan,
    //   cardnumber: cardNumber,
    //   name: name,
    //   socialname: socialName,
    //   email: email,
    //   sexo: sexo,
    //   birth: birth,
    //   cpf: CPF,
    //   cep: CEP,
    //   street: street,
    //   num: number,
    //   neighborhood: neighborhood,
    //   unit: unit
    // })
    console.log('form enviado!')
  }
  }  


  useEffect(() => {
    if(plan === 'unimed-inter') {
      setPlanRule('00371111112223334')
      if (plan === 'unimed-inter' && cardNumber.length != 17) {
      setCardnumberError('formato incorreto.')
       } else {
        setCardnumberError('')
       }
    } else if (plan === 'mediservice') {
      setPlanRule('774000000000')
      if (plan === 'mediservice' && cardNumber.length != 15) {
        setCardnumberError('formato incorreto.')
      } else {
        setCardnumberError('')
      }
    } else if (plan === 'petrobras') {
      setPlanRule('01020000000')
      if (plan === 'petrobras' && cardNumber.length != 11) {
        setCardnumberError('formato incorreto.')
      } else {
        setCardnumberError('')
      }
    } else if (plan === 'sulamerica') {
      setPlanRule('8888804350000000')
      if (plan === 'sulamerica' && cardNumber.length != 17) {
        setCardnumberError('formato incorreto.')
      } else {
        setCardnumberError('')
      }
    } else if (plan === 'amil') {
      setPlanRule('111222333')
      if (plan === 'amil' && cardNumber.length != 9) {
        setCardnumberError('formato incorreto.')
      } else {
        setCardnumberError('')
      }
    } else if (plan === 'assim') {
      setPlanRule('000011112222333344')
      if (plan === 'assim' && cardNumber.length != 18) {
        setCardnumberError('formato incorreto.')
      } else {
        setCardnumberError('')
      }
    } else if (plan === 'gama') {
      setPlanRule('0001112')
      if (plan === 'gama' && cardNumber.length != 7) {
        setCardnumberError('formato incorreto.')
      } else {
        setCardnumberError('')
      }
    }
  }, [plan, cardNumber])
  
  const handleSexoChange = (event: any) => {
    setSexo(event.target.value)
  }

  const handleFile = (e: any) => {
    console.log(e.target.files[0])
  }


    return (
        <>
        <Header />

        <section className="bg-white flex justify-center 
                 items-center flex-col h-max-h"
         >
           <div className="mb-12 mt-8 pl-8 w-full">
              <h1 className="text-[1.8rem] font-bold"
                  style={{color: 'var(--color-main)'}}>
                Solicitação
              </h1>
              <p className="text-base font-normal"
                 style={{color: 'var(--color-secondary)'}}>
                Preencha todos os dados corretamente. <br />
                Seu agendamento estará <strong>disponível em até 48 horas.</strong>
              </p>
            </div>
      
            <form action="">
               <div className="w-[52rem] pb-12 mb-4 max-h-max bg-gray-200 rounded-md shadow-sm shadow-gray-300"
                >     
                <div className="text-center font-medium pt-8 mb-8"
                     style={{color: 'var(--color-main)'}}>
                  <h4>Dados do convênio</h4>
                </div>

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
                       onChange={(e) => setPlan(e.target.value)}
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
                    <Input 
                       type="text" 
                       name='' 
                       id='cardnumber'
                       width='350px' 
                       height="42px" 
                       placeholder={planRule}
                       value={cardNumber}
                       onChange={(e) => setCardNumber(e.target.value)}
                     />
                     {cardnumberError? <p className="absolute mt-[-14px] pl-2 text-red-500">{cardnumberError}</p> : ''}
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
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        value={socialName}
                        onChange={(e) => setSocialName(e.target.value)}
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                         />
                      </label>
                      <div className="h-20 w-[350px] flex">
                        <div>
                          <label htmlFor="birth"
                            style={{color: 'var(--color-secondary)'}}
                            className='w-[350px] pb-1'>
                            Dt Nascimento
                          </label>
                          <Input 
                            type="date" 
                            name='' 
                            id="birth" 
                            placeholder="00/00/0000" 
                            height="42px"
                            width="130px"
                            value={birth}
                            onChange={(e) => setBirth(e.target.value)}
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
                            value={CPF}
                            onChange={(e) => setCPF(e.target.value)}
                            />
                        </div>
                      </div>

                      <div className="w-full max-h-max flex justify-start pl-12">
                         <div className="flex items-center">
                          <h2 style={{color: 'var(--color-main)'}} className="font-semibold">Sexo:</h2>
                         </div>

                         <div className="flex w-[300px] items-center justify-evenly">
                          <label htmlFor="man" className="text-sm cursor-pointer" style={{color: 'var(--color-main)'}}>Masculino
                          <input 
                             type="radio" 
                             name="sexo"
                             id="man" 
                             className="ml-1 cursor-pointer"
                             value='masculino'
                             onChange={handleSexoChange} 
                             />
                          </label>
                          <label htmlFor="woman" className="text-sm cursor-pointer" style={{color: 'var(--color-main)'}}>Feminino
                          <input 
                            type="radio"
                            name="sexo" 
                            id="woman"
                            className="ml-1 cursor-pointer"
                            value='feminino'
                            onChange={handleSexoChange}
                            />
                          </label>
                          <label htmlFor="undefined" className="text-sm cursor-pointer" style={{color: 'var(--color-main)'}}>Indefinido
                          <input 
                            type="radio" 
                            name="sexo" 
                            id="undefined" 
                            className="ml-1 cursor-pointer" 
                            value='indefinido'
                            onChange={handleSexoChange}
                            />
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
                            value={CEP}
                            onChange={(e) => setCEP(e.target.value)}
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
                            value={street}
                            onChange={(e) => setStreet(e.target.value)}
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
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
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
                            value={neighborhood}
                            onChange={(e) => setNeighborhood(e.target.value)}
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
                      <select 
                         defaultValue='unidade'
                         onChange={(e) => setUnit(e.target.value)}>
                        <option value="unidade" disabled>Unidade de atendimento</option>
                        <option value="cavaleiros">Cavaleiros (Nossa Senhora da Glória)</option>
                        <option value="matriz">Matriz (Rua Conde de Araruama - Centro)</option>
                      </select>

                      <label htmlFor="document" className="mt-4"></label>
                      <Input 
                        type="file" 
                        name="" 
                        id="document"
                        placeholder=""
                        onChange={(e) => handleFile(e)}
                       />
                      </div>

                      <div className="flex justify-center">
                      <Button 
                          text='agendar'
                          width="350px"
                          height="42px"
                          marginTop="1rem"
                          marginBottom=""
                          onClick={createRequest} />
                      </div>

                </div>              
            </form>
        </section>
        </>
    )
} 

export default Form