import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";
import usericon from '../../assets/icons/usericon.svg';
import cardnumber from '../../assets/icons/cardnumber.svg';
import email from '../../assets/icons/email.svg';
import cpf from '../../assets/icons/cpf.svg';
import sexo from '../../assets/icons/sexo.svg';
import birth from '../../assets/icons/birth.svg';
import location from '../../assets/icons/location.svg';
import build from '../../assets/icons/build.svg';
import phone from '../../assets/icons/phone.svg';
import planIcon from '../../assets/icons/plan.svg';
import baloonIcon from '../../assets/icons/baloon-check.svg';
import requestIcon from '../../assets/icons/request-icon.svg';
import cancelsIcon from '../../assets/icons/cancels-icon.svg';
import HeaderAdmin from "../../components/HeaderAdmin";
import { useNavigate } from "react-router-dom";
import Button from "../../utils/Button";
import { doc, updateDoc } from "firebase/firestore";


const AdminHome = () => {
  const [forms, setForms] = useState<TypeUser[]>([]);
  const [filteredForms, setFilteredForms] = useState<TypeUser[]>([]);
  const [indexPac, setIndexPac] = useState(0);
  const [currentStatus, setCurrentStatus] = useState('solicitado')

  const navigate = useNavigate()

  useEffect(() => {
    const adminLogin = window.localStorage.getItem('admin')
    if (adminLogin == '' || adminLogin != 'on') {
      navigate("../admin/login")
    }
  }, [])

  interface TypeUser {
    plan: string;
    cardnumber: string;
    name: string;
    socialname?: string;
    email: string;
    birth: string;
    sexo: string;
    cpf: string;
    phone: string;
    cep: string;
    street: string;
    num: string;
    neighborhood: string;
    unit: string;
    status: string;
    imageUrl: string[];
    id: string;
    responsibleName: string;
    responsibleCPF: string;
    currentDate: string;
  }

  const formsCollectionRef = collection(db, "formulario");
  
  useEffect(() => {
    const getForms = async () => {
      const data = await getDocs(formsCollectionRef);
      const docs: any = data.docs.map((doc) => ({...doc.data(), id: doc.id }));
      setForms(docs);      
    };
    getForms();
  }, []);  
  
  
  const handleShowPacient = (index: number) => {
    setIndexPac(index)
  };
  
  //Atualizando para status PRONTO
  const updateConfirmStatus = async () => {
    const userId =  filteredForms[indexPac].id

    if (filteredForms[indexPac].status == 'pronto') {
      return alert('Essa solicitação já está pronta!')
    } else {
      const updateStatus = doc(db, 'formulario', userId)
      await updateDoc(updateStatus, {
        status: 'pronto'
      })
      alert('Parabéns! Você finalizou o cadastramento desse paciente!')
      window.location.reload()
    }
  }

  //Atualizando para status SOLICITADO
  const updateStatusSolicitation = async () => {
    const userId =  filteredForms[indexPac].id

    if (filteredForms[indexPac].status == 'solicitado') {
      return alert('O paciente já está em estado "solicitado"!')
    } else {
      const updateStatus = doc(db, 'formulario', userId)
      await updateDoc(updateStatus, {
        status: 'solicitado'
      })
      alert('Pronto! O status foi alterado para "solicitado"!')
      window.location.reload()
    }
  }

  //Atualizando para status CANCELADO
  const updateStatusCancel = async () => {
    const userId =  filteredForms[indexPac].id

    if (filteredForms[indexPac].status == 'cancelado') {
      return alert('O paciente já está em estado "cancelado"!')
    } else {
      const updateStatus = doc(db, 'formulario', userId)
      await updateDoc(updateStatus, {
        status: 'cancelado'
      })
      alert('Pronto! O status foi alterado para "cancelado"!')
      window.location.reload()
    }
  }

  //Filtrando por Status
  useEffect(() => {
    if (currentStatus == "solicitado") {
      const solicitateForm = forms.filter((doc: TypeUser) => doc.status == "solicitado")
      setFilteredForms(solicitateForm)

    } else if (currentStatus == "pronto") {
      const solicitateForm = forms.filter((doc: TypeUser) => doc.status == "pronto")
      const firstTemSolicitateForm = solicitateForm.slice(0, 10);
      setFilteredForms(firstTemSolicitateForm)

    } else if (currentStatus == "cancelado") {
      const solicitateForm = forms.filter((doc: TypeUser) => doc.status == "cancelado")
      const firstTemSolicitateForm = solicitateForm.slice(0, 10);
      setFilteredForms(firstTemSolicitateForm)
    }
  }, [forms, currentStatus])



  return (
    <div>
      <HeaderAdmin />

      <div className="h-[calc(100vh-80px)] overflow-hidden flex">

        <aside className="bg-gray-100/50 w-52 h-full max-h-max 
         overflow-y-auto shadow-md shadow-gray-400 flex flex-col relative z-40"
        >
           <div className="w-[12.9rem] fixed rounded-md z-50 bg-white">
            <h1 className="text-center font-semibold pt-6 pb-6 shadow-md shadow-bray-200 textGradient text-lg"
              >
            Solicitações
            </h1>
           </div>

       
           {/*MOSTRANDO SIDEBARMENU ESQUERDO */}
          <div className="mt-[4.6rem] z-0 ">
          {filteredForms?.map((form: any, index: number) => {
            if (filteredForms[index].status === currentStatus) {
              return (
                <div key={index}
                     onClick={() => handleShowPacient(index)}
                     className='pl-2 py-2 border-b-[1px] cursor-pointer hover:bg-teal-100'
                     style={index === indexPac? 
                           {background: "var(--color-third)"} 
                           : {} }>
                  <h3 className="text-gray-500 text-sm">pac: 
                    <span className="pl-1 font-semibold text-md"
                          style={{color: "var(--color-main)"}}>{form.name}</span>
                  </h3>
                  <p className="text-gray-500 text-sm flex items-center">
                    convênio:
                    <span className="font-medium pl-1"
                          style={{color: "var(--color-secondary)"}}>
                      {form.plan}
                    </span>
                  </p>

                  {form.status == 'solicitado'? (
                    <div className="flex justify-between items-center w-[9rem]">
                      <div className="rounded-[50%] w-3 h-3 bg-yellow-300">
                      </div>
                        <p className="text-[12px]" style={{color: 'var(--color-secondary)'}}>{form?.currentDate}</p>
                    </div>
                    ) : '' }

                      {form.status == 'pronto'? (
                      <div className="flex w-[100%] items-center gap-1 h-auto">
                          <div className="rounded-[50%] w-3 h-3 bg-teal-500" />
                        <p className="text-sm flex" style={{color: 'var(--color-secondary)'}}>{form?.currentDate}</p>
                    </div>
                    ): ''}
                      {form.status == 'cancelado'? (
                      <div className="flex w-[100%] items-center gap-1 h-auto">
                      <div className="rounded-[50%] w-3 h-3 bg-red-500">
                      </div>
                    <p className="text-sm flex" style={{color: 'var(--color-secondary)'}}>{form?.currentDate}</p>
                </div>
                    ): ''}
                    
  
                </div>                
              );
              }
              
              })}       

                {filteredForms.length <= 0 ? (
                    <div className="flex justify-center items-center w-full bg-[#eee] h-20 text-center">
                       <p className="font-semibold" style={{color: 'var(--color-secondary)'}}>Não há solicitações no momento.</p>
                    </div>  
                ) : '' }

          </div>
        </aside>


        <section className="w-[calc(100%-200px)] h-full max-h-max overflow-y-auto pb-6 relative">

             <div className={`absolute w-[6rem] h-8 
                            ${currentStatus === 'solicitado' ? 'bg-yellow-300 shadow-yellow-300/60' : ''}
                            ${currentStatus === 'pronto' ? 'bg-teal-400/60 shadow-teal-300/80' : ''}
                            ${currentStatus === 'cancelado' ? 'bg-red-500 shadow-red-300/80' : ''}
                             rounded-xl left-[-10px] top-5 flex justify-center items-center z-40 shadow-lg`}>
              <p className="font-normal text-white text-md">{currentStatus}</p>
             </div>

           <div className="w-full h-[4.6rem] bg-white flex items-center justify-center pt-16 pb-8">
             <h1 className="font-bold text-2xl textGradient"
                 >
                Dados do paciente
             </h1>

           </div>

          {filteredForms ? 
            <div className="pl-12 pt-4 flex flex-col justify-center gap-1 detail animeLeft">
              <h3 className="textBase flex items-center">
               <img src={planIcon} alt='icone-de-saude' className="w-6 h-6 mr-4" /> 
               Convênio: <span className="dataText pl-6">{filteredForms[indexPac]?.plan.toUpperCase()}</span> 

              </h3>

              <h3 className="textBase flex items-center">
                <img src={cardnumber} alt="" className="w-6 h-6 mr-4" />
                carteirinha: <span className="dataText tracking-widest	">{filteredForms[indexPac]?.cardnumber}</span>
              </h3>

              <h3 className="textBase flex items-center">
                <img src={usericon} alt="" className="w-6 h-6 mr-4" />
                nome: <span className="dataText">{filteredForms[indexPac]?.name}</span>
              </h3>

              <h3 className="textBase flex items-center">
                <img src={usericon} alt="" className="w-6 h-6 mr-4" />
                nome social: <span className="dataText">{filteredForms[indexPac]?.socialname || '- - -'}</span>
              </h3>

              <h3 className="textBase flex items-center">
                <img src={usericon} alt="" className="w-6 h-6 mr-4" />
                Responsável: <span className="text-blue-500 font-semibold pl-2 text-lg">{filteredForms[indexPac]?.responsibleName || '- - -'}</span>
              </h3>

              <h3 className="textBase flex items-center">  
              <img src={cpf} alt="" className="w-6 h-6 mr-4" />              
                CPF do Responsável: <span className="text-blue-500 font-semibold pl-2 text-lg"> {filteredForms[indexPac]?.responsibleCPF || '- - -'}</span>
              </h3>

              <h3 className="textBase flex items-center">
                <img src={email} alt="" className="w-5 h-5 mr-4" />
                email: <span className="dataText">{filteredForms[indexPac]?.email}</span>
              </h3>

              <h3 className="textBase flex items-center">
                <img src={birth} alt="" className="w-5 h-5 mr-4" />
                Dt nascimento: <span className="dataText">{filteredForms[indexPac]?.birth}</span>
              </h3>
              <h3 className="textBase flex items-center">
                <img src={sexo} alt="" className="w-6 h-6 mr-4" />
                sexo: <span className="dataText">{filteredForms[indexPac]?.sexo}</span>
              </h3>


              <h3 className="textBase flex items-center">
                <img src={cpf} alt="" className="w-6 h-6 mr-4" />
                CPF: <span className="dataText">{filteredForms[indexPac]?.cpf}</span>
              </h3>
              
              <h3 className="textBase flex items-center">
                <img src={phone} alt="" className="w-5 h-5 mr-4" />
                Telefone: <span className="dataText tracking-wide	">{filteredForms[indexPac]?.phone}</span>
              </h3>

              <h3 className="textBase flex items-center">
                <img src={location} alt="" className="w-6 h-6 mr-4" />
                cep: <span className="dataText">{filteredForms[indexPac]?.cep}</span>
              </h3>

              <h3 className="textBase flex items-center">
                <img src={location} alt="" className="w-6 h-6 mr-4" />
                Rua: <span className="dataText">{filteredForms[indexPac]?.street}</span>
              </h3>

              <h3 className="textBase flex items-center">
                <img src={location} alt="" className="w-6 h-6 mr-4" />
                número: <span className="dataText">{filteredForms[indexPac]?.num}</span>
              </h3>

              <h3 className="textBase flex items-center">
                <img src={location} alt="" className="w-6 h-6 mr-4" />
                Bairro: <span className="dataText">{filteredForms[indexPac]?.neighborhood}</span>
              </h3>

              <h3 className="textBase flex items-center mb-2">
                <img src={build} alt="" className="w-6 h-6 mr-4" />
                unidade: <span className="dataText">{filteredForms[indexPac]?.unit}</span>
              </h3>

                {filteredForms[indexPac]?.imageUrl?.map((url, index) => {
                  return (
                    <div key={index} className="documentLink">
                      <a href={url}
                         target="_blank"
                         >
                        {`Pedido médico: ${index + 1}`}
                      </a>
                      <br />
                    </div>
                  );
                })}

                <div className="flex w-full max-h-max mt-6 gap-8">
                  <Button
                    text='Pronto'
                    height="42px"
                    width="120px"
                    onClick={updateConfirmStatus}
                     />

                <Button
                    text='Solicitado'
                    height="42px"
                    width="120px"
                    background='#a0a0a0'
                    onClick={updateStatusSolicitation}
                     />

                {currentStatus === 'pronto' || currentStatus === 'solicitado' ? (
                  <Button
                  text='Cancelar'
                  height="42px"
                  width="120px"
                  background='rgb(239 68 68)'
                  onClick={updateStatusCancel}
                  />
                  ) : null }

                </div>
             </div>
           : (
            ""
          )}
        </section>

        <div className="absolute w-[3rem] bg-gray-100/80 z-20 h-[calc(100vh-80px)] right-2 shadow-md shadow-gray-300 opacity-50 cursor-pointer animeAsideMenu flex flex-col">

          <div className="py-8 text-center font-semibold text-md textGradient">
            <h3>Menu</h3>            
          </div>

          <div className="flex flex-col w-full h-full justify-center items-center relative">
            <ul className="h-full w-full mb-12 flex flex-col items-center justify-center gap-14">

              <li onClick={() => setCurrentStatus('solicitado')}
                  className="relative hover:after:content-['Solicitados'] after:absolute after:bg-yellow-400 after:text-white hover:after:p-1 after:rounded-md 
                  after:top-0 after:left-[-75px] after:text-sm">
                <img src={requestIcon} alt="" className="w-[2.5rem] h-[2.5rem] "/>
              </li>

              <li onClick={() => setCurrentStatus('pronto')}
                  className="relative hover:after:content-['Prontos'] after:absolute after:bg-teal-700 after:text-teal-100 hover:after:p-1 after:rounded-md 
                  after:top-0 after:left-[-60px] after:text-sm">
                <img src={baloonIcon} alt="" className="w-[2.5rem] h-[2.5rem] " />
              </li>

              <li onClick={() => setCurrentStatus('cancelado')}
                  className="relative hover:after:content-['Cancelados'] after:absolute after:bg-red-500 after:text-white hover:after:p-1 after:rounded-md 
                  after:top-0 after:left-[-80px] after:text-sm">
                <img src={cancelsIcon} alt="" className="w-[2.5rem] h-[2.5rem]"/>
              </li>
            </ul>
          </div>
        </div>


      </div>
    </div>
  );
};

export default AdminHome;
