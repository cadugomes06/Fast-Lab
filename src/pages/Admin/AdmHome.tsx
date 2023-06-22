import { useEffect, useState } from 'react'
import Header from "../../components/Header";
import { getDocs, collection } from "firebase/firestore";
import { listAll } from "firebase/storage";
import { db } from "../../services/firebaseConfig";


const AdmHome = () => {
    const [forms, setForms] = useState([]);
    const [indexPac, setIndexPac] = useState(0)

    const formsCollectionRef = collection(db, "formulario");
    useEffect(() => {
        const getForms = async () => {
          const data = await getDocs(formsCollectionRef);
          const a: any = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          setForms(a)
        };
        getForms();
      }, []);

    const handleShowPacient = (index: any) => {
        setIndexPac(index)
    }

    return (
        <div>
        <Header />

          <div className="h-[calc(100vh-80px)] overflow-hidden flex">
            
           <aside className="bg-gray-100/50 w-52 h-full max-h-max py-4 overflow-y-auto shadow-md shadow-gray-400">
                <h1>Agendados</h1>
                <hr></hr>
                <br />

                {forms?.map((form: any, index) => {
                    return (
                        <div key={index}
                             onClick={() => handleShowPacient(index)}>
                          <h3>pac: {form.name}</h3>
                          <p>convenio: <span className='text-green-600 font-semibold'>{form.plan}</span></p>
                          <br></br>
                        </div>
                    )    
                })}
           </aside> 


           <section className='w-[calc(100%-200px)] h-full bg-gray-100 pl-8 max-h-max'>
                <h1>Dados do paciente</h1>
                <br></br>

                {forms? (
                    <div>
                        <h3>convênio: {forms[indexPac]?.plan}</h3>
                        <h3>carteirinha: {forms[indexPac]?.cardnumber}</h3>
                        <h2>nome: {forms[indexPac]?.name}</h2>
                        <h2>nome social?: {forms[indexPac]?.socialname}</h2>
                        <h3>email: {forms[indexPac]?.email}</h3>
                        <h3>Data de nascimento: {forms[indexPac]?.birth}</h3>
                        <h3>sexo: {forms[indexPac]?.sexo}</h3>
                        <h3>CPF: {forms[indexPac]?.cpf}</h3>
                        <h3>cep: {forms[indexPac]?.cep}</h3>
                        <h3>Rua: {forms[indexPac]?.street}</h3>
                        <h3>número: {forms[indexPac]?.num}</h3>
                        <h3>Bairro: {forms[indexPac]?.neighborhood}</h3>
                        <h3>unidade: {forms[indexPac]?.unit}</h3>
                        {forms[indexPac]?.imageUrl.map((form: any, index: any)  => {
                                return (
                                <img key={index} 
                                     src={form.imageUrl} 
                                     alt=""
                                     width='250px'
                                     height='250px' />
                                )
                            
                            })}
                    </div>
              
                ) : ''}

           </section>
            
           </div>
        </div>
    )
}

export default AdmHome;