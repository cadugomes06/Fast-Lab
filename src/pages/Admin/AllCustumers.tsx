import HeaderAdmin from "../../components/HeaderAdmin"
import { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";

import trashIcon from '../../assets/icons/trash.svg'
import editIcon from '../../assets/icons/edit.svg'
import Button from "../../utils/Button";

const AllCustumers = () => {
    const [forms, setForms] = useState<TypeUser[]>([]);
    const [filterCustumers, setFilterCustumers] = useState<TypeUser[]>([]);
    const [currentStatus, setCurrentStatus] = useState<TypeStatus>({status: '0', color: '0'})
    const [deleteModal, setDeleteModal] = useState({state: false, index: -1})

    const formsCollectionRef = collection(db, "formulario");

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
      interface TypeStatus {
        status: string;
        color: string;
      }

      useEffect(() => {
        const getForms = async () => {
          const data = await getDocs(formsCollectionRef);
          const a: any = data.docs.map((doc) => ({...doc.data(), id: doc.id }));
          setForms(a);
        };
        getForms();
      }, []);

      useEffect(() =>  {
        const filtedData: any = forms.filter((form) => form.status === currentStatus.status)
        if (currentStatus.status != '') {
            setFilterCustumers(filtedData)   
        } else {
            setFilterCustumers(forms)
        }
      }, [currentStatus])

      

      const handleOpenModal = (index: number) => {
        setDeleteModal({state: true, index: index})
      }
      const handleCloseModal = () => {
        setDeleteModal({state: false, index: -1})
      }
      const handleDeleteUser = async () => {
        try {
          await deleteDoc(doc(db, 'formulario', filterCustumers[deleteModal.index]?.id))
          filterCustumers.splice(deleteModal.index)
          setCurrentStatus({status: '0', color: '0'})
          setDeleteModal({state: false, index: -1})
          window.location.reload()      
     } catch (error) {
          window.alert('Erro inesperado' + error)
      }
      }
      

    return (
        <>
        
        {deleteModal.state ? (
          <div className="w-full h-[100vh] z-[100] bg-black/70 fixed flex 
          justify-center items-center">
             <div className="w-[38rem] h-[20rem] bg-white rounded-md">
                 <div className="w-full h-24 flex justify-center items-center bg-gray-100 rounded-md">
                   <h2 className="text-xl font-semibold textGradient">
                      Excluir Usuário
                   </h2>
                   </div>
  
                    <div className="py-8 px-8 text-md font-normal">
                      <p style={{color: 'var(--color-secondary)'}}>Os dados de solicitação desse usuário serão <strong>permanentemente deletados</strong>, 
                         deseja continuar com está ação ?
                      </p>
                   </div>
  
                   <div className="w-full h-24 flex justify-center items-center gap-12">
                      <Button 
                        text="Confirmar"
                        width="120px"
                        height="38px"
                        background='#AFACAF'
                        borderColor='#9B979B'
                        onClick={() => handleDeleteUser()}
                        />
  
                      <Button 
                        text="Cancelar"
                        width="120px"
                        height="38px"
                        background='#E0433E'
                        borderColor='#D32822'
                        onClick={() => handleCloseModal()}
                        />
                   </div>
                </div>                  
          </div>
        ) : ''}

        <HeaderAdmin />

        <section className="w-full h-[calc(100vh-80px)] grid grid-cols-12 relative">
           <div className="bg-gray-100/50 "></div> 

           <div className="col-span-10 shadow-md shadow-gray-200 rounded-md flex flex-col animeLeft">
            <div className="h-24 w-full flex justify-center items-center">
                <h1 className="text-2xl textGradient font-semibold">
                    Configurações de Usuários
                </h1>
            </div>
            
            <div className="w-full max-h-max mt-12 bg-gray-100/20 flex  justify-evenly items-center font-semibold text-sm text-teal-600">
                <div>
                    <button className={`w-28 h-14 rounded-md hover:text-white hover:bg-gray-400/80 cursor-pointer focus:text-white tracking-wider focus:shadow-md duration-300 transition ${currentStatus.status === '' ? 'bg-gray-500/80 text-white' : ''}`}
                      onClick={() => setCurrentStatus(
                        {status:'', color: ''})}>
                        Todos
                    </button>
                </div>
                <div>
                    <button className={`w-28 h-14 rounded-md hover:text-white hover:bg-teal-400/80 cursor-pointer tracking-wider focus:shadow-md focus:shadow-gray-300 duration-300 transition ${currentStatus.status === 'pronto' ? 'bg-teal-500/80 text-white' : ''}`}
                     onClick={() => setCurrentStatus(
                        {status:'pronto', color: 'teal'})}>
                        Prontos
                    </button>
                </div>
                <div>
                     <button className={`w-28 h-14 rounded-md hover:text-white hover:bg-yellow-300/90 cursor-pointer tracking-wider focus:shadow-md focus:shadow-gray-300 duration-300 transition ${currentStatus.status === 'solicitado' ? 'bg-yellow-500/80 text-white' : ''} `}
                       onClick={() => setCurrentStatus(
                        {status:'solicitado', color: 'yellow'})}>
                        Solicitados
                    </button>   
                </div>
                <div>
                    <button className={`w-28 h-14 rounded-md hover:text-white hover:bg-red-300 cursor-pointer focus:text-white focus:bg-red-500/80 tracking-wider focus:shadow-md focus:shadow-gray-300 duration-300 transition ${currentStatus.status === 'cancelado' ? 'bg-red-500/80 text-white' : ''} `}
                      onClick={() => setCurrentStatus(
                        {status:'cancelado', color: 'red'})}>
                        Cancelados
                    </button>   

                </div>
                
            </div>           

            
                <div className="w-full h-20 flex items-center pl-4">
                    <h5 className="text-md font-regular relative after:content-[''] after:w-[4.5rem] after:h-[2px] after:bg-teal-400 after:absolute after:bottom-0 after:left-0 after:rounded-md" style={{color: 'var(--color-secondary)'}}>
                        Usuários.
                    </h5>
                </div>
            

            <div className="w-full max-h-max bg-gray-100/30 py-4 pb-2 px-2">
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
                {filterCustumers.map((form: any, index: number) =>  (                 
                    <div key={index} className="animeLeft w-full h-10 bg-white mb-1 rounded-md shadow-md shadow-gray-300 grid grid-cols-9 self-center items-center px-2 font-regular text-sm overflow-x-auto" style={{color: 'var(--color-secondary)'}}>
                        <div className="col-span-2"><p>
                            {form.name}
                        </p></div>
                        <div><p>{form.plan}</p></div>
                        <div><p>{form.birth}</p></div>
                        <div><p>{form.sexo}</p></div>
                        <div><p>{form.unit}</p></div>
                        <div><p>{form.status}</p></div>
                        <div className="h-8 grid justify-items-center items-center">
                            <img src={editIcon} alt="icone-de-edição" className="w-6 h-6 cursor-pointer" />
                        </div>
                        <div className="h-8 grid justify-items-center items-center">
                            <img src={trashIcon} 
                                 alt="icone-de-lixeira" 
                                 className="w-6 h-6 cursor-pointer" 
                                 onClick={() => handleOpenModal(index)}/>
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