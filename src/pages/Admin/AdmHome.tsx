import { useEffect, useState } from "react";
import Header from "../../components/Header";
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

const AdmHome = () => {
  const [forms, setForms] = useState<TypeUser[]>([]);
  const [indexPac, setIndexPac] = useState(0);

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
    imageUrl: string[];
  }

  const formsCollectionRef = collection(db, "formulario");
  useEffect(() => {
    const getForms = async () => {
      const data = await getDocs(formsCollectionRef);
      const a: any = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setForms(a);
    };
    getForms();
  }, []);

  const handleShowPacient = (index: number) => {
    setIndexPac(index);
  };

  return (
    <div>
      <Header />

      <div className="h-[calc(100vh-80px)] overflow-hidden flex">

        <aside className="bg-gray-100/50 w-52 h-full max-h-max 
         overflow-y-auto shadow-md shadow-gray-400 flex flex-col relative"
        >
           <div className="w-[12.9rem] fixed rounded-md">
            <h1 className="text-center font-semibold pt-6 pb-6 shadow-md shadow-bray-200 bg-white"
              style={{color: "var(--color-main)"}}>
            Agendamentos
            </h1>
           </div>
       
          <div className="mt-[4.6rem]">
          {forms?.map((form: any, index: number) => {
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
                <p className="text-gray-500 text-sm">
                  convênio:
                  <span className="font-medium pl-1"
                        style={{color: "var(--color-secondary)"}}>
                    {form.plan}
                  </span>
                </p>
              </div>
            );
          })}
          </div>
        </aside>

        <section className="w-[calc(100%-200px)] h-full max-h-max overflow-y-auto pb-6">

           <div className="w-full h-[4.8rem] flex items-center justify-center">
             <h1 className="font-bold text-lg"
                 style={{color: "var(--color-main)"}}>
                Dados do paciente
             </h1>
           </div>

          {forms ? (
            <div className="pl-12 pt-4 flex flex-col justify-center gap-1 detail animeLeft">
              <h3 className="textBase flex items-center">
                convênio: <span className="dataText">{forms[indexPac]?.plan}</span> 
              </h3>

              <h3 className="textBase flex items-center">
                <img src={cardnumber} alt="" className="w-6 h-6 mr-4" />
                carteirinha: <span className="dataText">{forms[indexPac]?.cardnumber}</span>
              </h3>

              <h3 className="textBase flex items-center">
                <img src={usericon} alt="" className="w-6 h-6 mr-4" />
                nome: <span className="dataText">{forms[indexPac]?.name}</span>
              </h3>

              <h3 className="textBase flex items-center">
                <img src={usericon} alt="" className="w-6 h-6 mr-4" />
                nome social?: <span className="dataText">{forms[indexPac]?.socialname}</span>
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
                Telefone: <span className="dataText">{forms[indexPac]?.phone}</span>
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

              <h3 className="textBase flex items-center">
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
            </div>
          ) : (
            ""
          )}
        </section>
      </div>
    </div>
  );
};

export default AdmHome;
