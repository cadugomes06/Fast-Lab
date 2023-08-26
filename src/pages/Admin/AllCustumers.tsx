import HeaderAdmin from "../../components/HeaderAdmin"
import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";

import trashIcon from '../../assets/icons/trash.svg'
import editIcon from '../../assets/icons/edit.svg'

const AllCustumers = () => {
    const [forms, setForms] = useState<TypeUser[]>([]);

    interface TypeUser {
        plan: string;
        name: string;
        birth: string;
        sexo: string;
        cpf: string;
        unit: string;
        status: string;
        imageUrl: string[];
        id: string;
      }

      const formsCollectionRef = collection(db, "formulario");

      useEffect(() => {
        const getForms = async () => {
          const data = await getDocs(formsCollectionRef);
          const a: any = data.docs.map((doc) => ({...doc.data(), id: doc.id }));
          setForms(a);
          console.log(a)
        };
        getForms();
      }, []);
      

    return (
        <>
        <HeaderAdmin />

        <section className="w-full h-[calc(100vh-80px)] grid grid-cols-12">
           <div className="bg-gray-100/50 "></div> 

           <div className="col-span-10 shadow-md shadow-gray-200 rounded-md flex flex-col animeLeft">
            <div className="h-24 w-full flex justify-center items-center">
                <h1 className="text-2xl textGradient font-semibold">
                    Configurações de Usuários
                </h1>
            </div>
            
            <div className="w-full max-h-max py-6 mt-12 bg-gray-100/20 flex  justify-evenly font-regular text-sm">
                <div><h3>Filtro 1</h3></div>
                <div><h3>Filtro 2</h3></div>
                <div><h3>Filtro 3</h3></div>
                <div><h3>Filtro 4</h3></div>
            </div>

            <div>
                <div className="w-full h-14 flex items-center pl-4">
                    <h5 className="text-md font-regular relative after:content-[''] after:w-[4.5rem] after:h-[2px] after:bg-teal-400 after:absolute after:bottom-0 after:left-0 after:rounded-md" style={{color: 'var(--color-secondary)'}}>
                        Usuários.
                    </h5>
                </div>
            </div>

            <div className="w-full max-h-max bg-gray-100/30 py-4 px-2">
               <div className="w-full h-10 bg-white mb-1 rounded-md shadow-md shadow-gray-300 grid grid-cols-9 items-center px-2 font-semibold text-md" style={{color: 'var(--color-main)'}}>
                        <div className="grid col-span-2 justify-items-center"><p>Nome</p></div>
                        <div><p>Convênio</p></div>
                        <div><p>Dt Nasc.</p></div>
                        <div><p>Sexo</p></div>
                        <div><p>Unidade</p></div>
                        <div><p>Status</p></div>
                        <div className="grid justify-items-center"><p>Editar</p></div>
                        <div className="grid justify-items-center"><p>Excluir</p></div>
              </div>
                {forms.map((form: any, index: number) => (
                    <div key={index} className="w-full h-10 bg-white mb-1 rounded-md shadow-md shadow-gray-300 grid grid-cols-9 self-center items-center px-2 font-regular text-sm overflow-x-auto" style={{color: 'var(--color-secondary)'}}>
                        <div className="col-span-2"><p>
                            {form.name}
                        </p></div>
                        <div><p>{form.plan}</p></div>
                        <div><p>{form.birth}</p></div>
                        <div><p>{form.sexo}</p></div>
                        <div><p>{form.unit}</p></div>
                        <div><p>{form.status}</p></div>
                        <div className="h-8 grid justify-items-center">
                            <img src={editIcon} alt="icone-de-edição" className="w-8 h-8 cursor-pointer" />
                        </div>
                        <div className="h-8 grid justify-items-center">
                            <img src={trashIcon} alt="icone-de-lixeira" className="w-8 h-8 cursor-pointer" />
                        </div>
                    </div>
                ))}
                
            </div>
            
           </div> 

           <div className="bg-gray-100/50"></div> 
        </section>

        </>
    )
}

export default AllCustumers;