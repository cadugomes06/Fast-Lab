import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";
import usericon from '../../assets/icons/usericon.svg'
import cardnumber from '../../assets/icons/cardnumber.svg'
import email from '../../assets/icons/email.svg'
import cpf from '../../assets/icons/cpf.svg'
import sexo from '../../assets/icons/sexo.svg'
import birth from '../../assets/icons/birth.svg'
import location from '../../assets/icons/location.svg'
import build from '../../assets/icons/build.svg'
import phone from '../../assets/icons/phone.svg'
import planIcon from '../../assets/icons/plan.svg'
import HeaderAdmin from "../../components/HeaderAdmin";
import { useNavigate } from "react-router-dom";
import Button from "../../utils/Button";
import { doc, updateDoc } from "firebase/firestore";

const AdminHome = () => {
  const [forms, setForms] = useState<TypeUser[]>([]);
  const [indexPac, setIndexPac] = useState(0);

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
  }

  const formsCollectionRef = collection(db, "formulario");
  
  useEffect(() => {
    const getForms = async () => {
      const data = await getDocs(formsCollectionRef);
      const a: any = data.docs.map((doc) => ({...doc.data(), id: doc.id }));
      setForms(a);
    };
    getForms();
  }, []);
  
  
  const handleShowPacient = async (index: number) => {
    setIndexPac(index)
  };
  
  const updateConfirmStatus = async () => {
    const userId =  forms[indexPac].id

    if (forms[indexPac].status == 'pronto') {
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

  const updateStatusSolicitation = async () => {
    const userId =  forms[indexPac].id

    if (forms[indexPac].status == 'solicitado') {
      return alert('O já está em estado "solicitado"!')
    } else {
      const updateStatus = doc(db, 'formulario', userId)
      await updateDoc(updateStatus, {
        status: 'solicitado'
      })
      alert('Pronto! O status foi alterado para "solicitado"!')
      window.location.reload()
    }
  }


  return (
    <div>
      <HeaderAdmin />

      <div className="h-[calc(100vh-80px)] overflow-hidden flex">

        <aside className="bg-gray-100/50 w-52 h-full max-h-max 
         overflow-y-auto shadow-md shadow-gray-400 flex flex-col relative"
        >
           <div className="w-[12.9rem] fixed rounded-md z-50 bg-white">
            <h1 className="text-center font-semibold pt-6 pb-6 shadow-md shadow-bray-200 textGradient text-lg"
              >
            Solicitações
            </h1>
           </div>
       
          <div className="mt-[4.6rem] z-0">
          {forms?.map((form: any, index: number) => {
            if (forms[index].status === 'solicitado') {
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
                      <div className="rounded-[50%] w-2 h-2 bg-yellow-300"></div>
                    ): <div className="rounded-[50%] w-2 h-2 bg-green-400"></div>}
  
                </div>                
              );
            }
           
          })}
        

          </div>
        </aside>


        <section className="w-[calc(100%-200px)] h-full max-h-max overflow-y-auto pb-6 ">

           <div className="w-full h-[4.6rem] bg-white flex items-center justify-center pt-16 pb-8">
             <h1 className="font-bold text-2xl textGradient"
                 >
                Dados do paciente
             </h1>

             <div>
              <ul>
                <li></li>
              </ul>
             </div>
           </div>

          {forms ? (
            <div className="pl-12 pt-4 flex flex-col justify-center gap-1 detail animeLeft">
              <h3 className="textBase flex items-center">
               <img src={planIcon} alt='icone-de-saude' className="w-6 h-6 mr-4" /> 
               Convênio: <span className="dataText pl-6">{forms[indexPac]?.plan.toUpperCase()}</span> 

              </h3>

              <h3 className="textBase flex items-center">
                <img src={cardnumber} alt="" className="w-6 h-6 mr-4" />
                carteirinha: <span className="dataText tracking-widest	">{forms[indexPac]?.cardnumber}</span>
              </h3>

              <h3 className="textBase flex items-center">
                <img src={usericon} alt="" className="w-6 h-6 mr-4" />
                nome: <span className="dataText">{forms[indexPac]?.name}</span>
              </h3>

              <h3 className="textBase flex items-center">
                <img src={usericon} alt="" className="w-6 h-6 mr-4" />
                nome social: <span className="dataText">{forms[indexPac]?.socialname || '- - -'}</span>
              </h3>

              <h3 className="textBase flex items-center">
                <img src={usericon} alt="" className="w-6 h-6 mr-4" />
                Responsável: <span className="text-blue-500 font-semibold pl-2 text-lg">{forms[indexPac]?.responsibleName}</span>
              </h3>

              <h3 className="textBase flex items-center">  
              <img src={cpf} alt="" className="w-6 h-6 mr-4" />              
                CPF do Responsável: <span className="text-blue-500 font-semibold pl-2 text-lg"> {forms[indexPac]?.responsibleCPF}</span>
              </h3>

              <h3 className="textBase flex items-center">
                <img src={email} alt="" className="w-5 h-5 mr-4" />
                email: <span className="dataText">{forms[indexPac]?.email}</span>
              </h3>

              <h3 className="textBase flex items-center">
                <img src={birth} alt="" className="w-5 h-5 mr-4" />
                Dt nascimento: <span className="dataText">{forms[indexPac]?.birth}</span>
              </h3>
              <h3 className="textBase flex items-center">
                <img src={sexo} alt="" className="w-6 h-6 mr-4" />
                sexo: <span className="dataText">{forms[indexPac]?.sexo}</span>
              </h3>


              <h3 className="textBase flex items-center">
                <img src={cpf} alt="" className="w-6 h-6 mr-4" />
                CPF: <span className="dataText">{forms[indexPac]?.cpf}</span>
              </h3>
              
              <h3 className="textBase flex items-center">
                <img src={phone} alt="" className="w-5 h-5 mr-4" />
                Telefone: <span className="dataText tracking-wide	">{forms[indexPac]?.phone}</span>
              </h3>

              <h3 className="textBase flex items-center">
                <img src={location} alt="" className="w-6 h-6 mr-4" />
                cep: <span className="dataText">{forms[indexPac]?.cep}</span>
              </h3>

              <h3 className="textBase flex items-center">
                <img src={location} alt="" className="w-6 h-6 mr-4" />
                Rua: <span className="dataText">{forms[indexPac]?.street}</span>
              </h3>

              <h3 className="textBase flex items-center">
                <img src={location} alt="" className="w-6 h-6 mr-4" />
                número: <span className="dataText">{forms[indexPac]?.num}</span>
              </h3>

              <h3 className="textBase flex items-center">
                <img src={location} alt="" className="w-6 h-6 mr-4" />
                Bairro: <span className="dataText">{forms[indexPac]?.neighborhood}</span>
              </h3>

              <h3 className="textBase flex items-center mb-2">
                <img src={build} alt="" className="w-6 h-6 mr-4" />
                unidade: <span className="dataText">{forms[indexPac]?.unit}</span>
              </h3>

                {forms[indexPac]?.imageUrl?.map((url, index) => {
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
                </div>

             </div>
          ) : (
            ""
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminHome;
