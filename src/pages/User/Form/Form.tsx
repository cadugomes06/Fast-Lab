import { useState, useEffect, useContext } from "react";
import Header from "../../../components/Header";
import Button from "../../../utils/Button";
import Input from "../../../utils/Input";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../../../services/firebaseConfig";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import LoadingCup from "../../../components/LoadingCup";
import MenuMobile from "../../../components/MenuMobile";
import closeIcon from '../../../assets/icons/closeX.svg'
import iconAmil from '../../../assets/icons/amilSaude.svg'
import iconUnimed from '../../../assets/icons/unimedSaude.svg'

const Form = () => {
  const [plan, setPlan] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [name, setName] = useState("");
  const [socialName, setSocialName] = useState("");
  const [email, setEmail] = useState("");
  const [birth, setBirth] = useState("");
  const [CPF, setCPF] = useState("");
  const [phoneNumber, setPhoneNumber] = useState('');
  const [sexo, setSexo] = useState("");
  const [CEP, setCEP] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [unit, setUnit] = useState("");

  const [fileUrl, setFileUrl] = useState<FileList[]>([]);
  const [imageURL, setImageURL] = useState<{urls: string[]}>({urls: []});
  const [loading, setLoading] = useState(false);
  const [planRule, setPlanRule] = useState("");
  const [cardnumberError, setCardnumberError] = useState("");
  const [cpfError, setCpfError] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [typeNavigator, setTypeNavigator] = useState('');
  const [progress, setProgress] = useState(0);
  const [conditionTerms, setConditionTerms] = useState(false);
  const [modalCondition, setModalCondition] = useState(false);
  const [isYounger, setIsYounger] = useState(false);

  interface FileList {
    name: string;
  }

  const formsCollectionRef = collection(db, "formulario");  
  const navigate = useNavigate()
  const { state } = useContext(UserContext)

  useEffect(() => {
      if (state.userOn === false) {
          navigate('../userlogin')
      }
  }, [state.userOn])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
  
    if (files) {
      const fileArray: any = Array.from(files)
      setFileUrl(fileArray);
    }
  };

  useEffect(() => {
    let imgs: any = fileUrl;
    const urls: string[] = [];
    setImageURL({urls: []})
    
    const uploadPromises = imgs.map(async (file: any) => {
      const docRef = ref(storage, `documentos/${file?.name}`);

      const uploadTask = uploadBytesResumable(docRef, file)
      uploadTask.on(
        'state_changed',
        snapshot => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setProgress(progress)
        },
        error => {
          alert('Error!' + error)
        }
      )

      try {
        await uploadBytes(docRef, file);
        const url = await getDownloadURL(docRef);
        return urls.push(url);
      } catch (error) {
        return alert(error);
      }
      });
            
      Promise.all(uploadPromises).then(() => {
        setImageURL((prevImageURL) => ({
          ...prevImageURL,
          urls: prevImageURL.urls.concat(urls),
        }));
      })
}, [fileUrl]);


  const createRequest = async (e: any) => {
    e.preventDefault();
    const userID = window.localStorage.getItem('user')

    if (fileUrl.length > 8) {
      alert('Você ultrapassou o limite de pedidos!')
      setImageURL({urls: []})
      setFileUrl([])
    }

    if (
      plan === "convenio" ||
      cardNumber === "" ||
      name === "" ||
      email === "" ||
      birth === "" ||
      sexo === "" ||
      CPF === "" ||
      CEP === "" ||
      street === "" ||
      number === "" ||
      neighborhood === "" ||
      unit === "" ||
      phoneNumber === ''
      ) {
      alert("preencha todos os campos corretamente.");
    } else if (
      (plan === "unimed" || plan === "sulamerica") &&
      cardNumber.length < 17
    ) {
      alert("Numeração do convênio incorreta!");
    } else if (plan === "mediservice" && cardNumber.length < 15) {
      alert("Numeração do convênio incorreta!");
    } else if (plan === "petrobras" && cardNumber.length < 11) {
      alert("Numeração do convênio incorreta!");
    } else if (plan === "amil" && cardNumber.length < 9) {
      alert("Numeração do convênio incorreta!");
    } else if (plan === "assim" && cardNumber.length < 18) {
      alert("Numeração do convênio incorreta!");
    } else if (plan === "gama" && cardNumber.length < 7) {
      alert("Numeração do convênio incorreta!");
    } else if (plan === "tlife" && cardNumber.length < 7) {
      alert("Numeração do convênio incorreta!");
    } else if (CPF && CPF.length < 11) {
      alert("CPF incorreto!");
   } else if (imageURL.urls.length === 0) {
    alert("Selecione seu pedido médico primeiro!");
  } else if (conditionTerms === false) {
    alert("Leia os termos e confirme!");
  } else {
    await addDoc(formsCollectionRef, {
            plan: plan,
            cardnumber: cardNumber,
            name: name,
            socialname: socialName,
            email: email,
            sexo: sexo,
            birth: birth,
            phone: phoneNumber,
            cpf: CPF,
            cep: CEP,
            street: street,
            num: number,
            neighborhood: neighborhood,
            unit: unit,
            imageUrl: imageURL.urls,
            userID: userID,
            status: 'solicitado'
          }
          )
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          })
          setLoading(true)
      setTimeout(() => {
        document.documentElement.style.overflow = 'hidden';
      }, 1000)
      setTimeout(() => {
        document.documentElement.style.overflow = 'auto';
        navigate('/user/feedback')
      }, 4000)
    }  
  }

  useEffect(() => {
    if (plan === "unimed") {
      setPlanRule("00371111112223334");
      if (
        plan === "unimed" &&
        cardNumber.length != 17 &&
        cardNumber.length != 0
      ) {
        setCardnumberError("formato incorreto.");
      } else {
        setCardnumberError("");
      }
    } else if (plan === "mediservice") {
      setPlanRule("774000000000");
      if (
        plan === "mediservice" &&
        cardNumber.length != 15 &&
        cardNumber.length != 0
      ) {
        setCardnumberError("formato incorreto.");
      } else {
        setCardnumberError("");
      }
    } else if (plan === "petrobras") {
      setPlanRule("01020000000");
      if (
        plan === "petrobras" &&
        cardNumber.length != 11 &&
        cardNumber.length != 0
      ) {
        setCardnumberError("formato incorreto.");
      } else {
        setCardnumberError("");
      }
    } else if (plan === "sulamerica") {
      setPlanRule("8888804350000000");
      if (
        plan === "sulamerica" &&
        cardNumber.length != 17 &&
        cardNumber.length != 0
      ) {
        setCardnumberError("formato incorreto.");
      } else {
        setCardnumberError("");
      }
    } else if (plan === "amil") {
      setPlanRule("111222333");
      if (plan === "amil" && cardNumber.length != 9 && cardNumber.length != 0) {
        setCardnumberError("formato incorreto.");
      } else {
        setCardnumberError("");
      }
    } else if (plan === "assim") {
      setPlanRule("000011112222333344");
      if (
        plan === "assim" &&
        cardNumber.length != 18 &&
        cardNumber.length != 0
      ) {
        setCardnumberError("formato incorreto.");
      } else {
        setCardnumberError("");
      }
    } else if (plan === "gama") {
      setPlanRule("0001112");
      if (plan === "gama" && cardNumber.length != 7 && cardNumber.length != 0) {
        setCardnumberError("formato incorreto.");
      } else {
        setCardnumberError("");
      }
    } else if (plan === "tlife") {
      setPlanRule("sua matrícula");
      if (
        plan === "tlife" &&
        cardNumber.length != 7 &&
        cardNumber.length != 0
      ) {
        setCardnumberError("formato incorreto.");
      } else {
        setCardnumberError("");
      }
    }
    if (CPF && CPF.length != 14) {
      setCpfError("CPF incorreto.");
    } else {
      setCpfError("");
    }
  }, [plan, cardNumber, CPF]);



  useEffect(() => {
    if (birth.length > 9 && birth.length < 11) {
      const birthDate = Number(birth.slice(6,10))
      const currentAge = 2023 - birthDate 

      if (currentAge < 18) {
        setIsYounger(true)
      } else {
        setIsYounger(false)
      }
    }
  }, [birth])


  const handleSexoChange = (event: any) => {
    setSexo(event.target.value);
  };
  const handleCheckCondition = (e: any) => {
    setConditionTerms(e)
  }
  const handleOpenModalCondition = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
    document.documentElement.style.overflow = 'hidden'
    setModalCondition(true)
  }

  const handleCloseModalCondition = () => {
    window.scrollTo({
      top: 1500,
      behavior: 'smooth'
    })
    document.documentElement.style.overflow = 'auto'
    setModalCondition(false)
  }

  //Verificar dispositivo mobile
  const {innerWidth: width} = window
  useEffect(() => {
    if(width < 600 ) {
      setIsMobile(true)
    }
  }, [width])
  
  //Identificar o navegador
  useEffect(() => {
    if (navigator.userAgent.indexOf('Chrome') > -1 && navigator.userAgent.indexOf('Safari') > -1) {
      setTypeNavigator('chrome')
    } else if (navigator.userAgent.indexOf('Safari') > -1) {
      setTypeNavigator('safari')
    }
    }, [])


  return (
    <>
    {modalCondition ? (
              <>
              <div className="w-full h-[100vh] bg-black/50 flex justify-center items-center absolute z-20 ">

                <div className="w-[38rem] h-[38rem] bg-gray-50 absolute bottom-6 rounded-md shadow-md shadow-gray-500 sm:w-[20rem] sm:overflow-y-auto">
                  
                  <div className="w-[32px] h-[32px] sm:w-[24px] sm:h-[24px] absolute right-2 top-2 sm:right-1 sm:top-1 cursor-pointer"
                       onClick={handleCloseModalCondition}>
                    <img src={closeIcon} 
                         alt="icone-de-x"
                         className="sm:w-[24px] sm:h-[24px]" />
                  </div>

                  <div className="w-full bg-gray-100 py-8 text-xl text-center font-semibold rounded-md sm:text-lg sm:py-4" style={{color: 'var(--color-main)'}}>
                    <h2>Condições para o seu pré cadastramento</h2>
                  </div>

                  <div className="px-6 pt-8 font-normal text-md sm:px-4 sm:pt-6 sm:text-sm" style={{color: 'var(--color-secondary)'}}>
                    <p className="pb-4">Estou ciente que na modalidade de pré cadastramento, terei um atendimento mais rápido ao ter meu pedido autorizado pela equipe de atendimento online do laboratório. <strong>Mas terei que apresentar no dia da realização meu pedido médico e documento original com foto ou digital (CNH digital ou Identidade digital). 
                    Não será aceito foto do documento. </strong></p>

                    <p>Por se tratar de exames clínicos, possuem preparos específicos que devem ser cumpridos para a realização. <strong>O não cumprimento, poderá ocasionar pendência do mesmo, o paciente poderá retornar outro dia devidamente preparado</strong> conforme as orientações da equipe de atendimento online.</p>
                  </div>

                  {plan === 'amil' ? (
                      <div className="w-full px-6 sm:px-4 flex flex-col max-h-max">
                        <h3 className="font-normal text-lg flex items-center" style={{color: 'var(--color-main)'}}>Beneficiário <img src={iconAmil} alt="icone-convenio" className="w-[4rem] h-[4rem] pl-2 " />
                        </h3>
                        <p className="text-md md:text-sm" style={{color: "var(--color-secondary)"}}>Para a autorização dos seus exames no pré cadastramento, <strong>será necessário que o atendente faça contato por telefone com o mesmo para pegar o token</strong> gerado no portal do convênio e validar os seus exames!</p>
                      </div>
                  ): ''}

                 {plan === 'unimed' ? (
                      <div className="w-full px-6 sm:px-4 flex flex-col max-h-max">
                        <h3 className="font-normal text-md flex items-center" style={{color: 'var(--color-main)'}}>Beneficiário <img src={iconUnimed} alt="icone-convenio" className="w-[5rem] h-[5rem] pl-2" />
                        </h3>
                        <p className="text-md md:text-sm" style={{color: "var(--color-secondary)"}}>
                          <strong>O pedido médico deve estar na guia da unimed ou devidamente transcrito pelo convênio</strong>. Solicitação médica no formato incorreto (guia sem transcrição ou receituário) poderá ocasionar o cancelamento da solicitação de pré cadastramento.
                        </p>
                      </div>
                  ): ''}

                </div>
              </div>  
              </>
      ): ''}

    {loading && name.length > 0 ? <LoadingCup /> : ''}
    {isMobile? <MenuMobile /> : <Header />}


      <section
        className="bg-white flex justify-center 
                 items-center flex-col h-max-h"
      >
        <div className="mb-12 mt-8 pl-8 w-full animeLeft sm:pl-4 sm:mt-6 sm:pr-16">
          <h1
            className="text-[1.8rem] font-bold textGradient sm:text-[1.5rem] sm:mb-2"
          >
            Solicitação
          </h1>
          <p
            className="text-base font-normal sm:text-sm"
            style={{ color: "var(--color-secondary)" }}
          >
            Preencha todos os dados corretamente. <br />
            Seu pré cadastramento estará <strong>disponível em até 48 horas úteis.</strong><br />
            Verificar <strong className=" hover:text-teal-600 underline"><Link to="/user/termos"> convênios disponíveis.</Link></strong>
          </p>
        </div>

        <form action="">
          <div className="animeLeft w-[52rem] pb-12 mb-4 max-h-max bg-gray-200 rounded-md shadow-md shadow-gray-400 md:w-[40rem] sm:w-[20rem]">
            <div
              className="text-center font-medium pt-8 mb-8"
              style={{ color: "var(--color-main)" }}
            >
              <h4>Dados do convênio</h4>
            </div>

            <div className="flex items-center pl-12 w-[52rem] h-20 md:flex-col md:h-[11rem] md:w-full md:pl-0">
              <div className="md:flex md:flex-col">
                <label
                  htmlFor="convenio"
                  style={{ color: "var(--color-secondary)" }}
                  className="w-[350px] sm:w-[300px] pb-1"
                >
                  Convênio
                </label>
                <select
                  name=""
                  id="convenio"
                  defaultValue="convenio"
                  onChange={(e) => setPlan(e.target.value)}
                >
                  <option value="convenio" disabled>
                    Convênio
                  </option>
                  <option value="unimed">Unimed</option>
                  <option value="petrobras">Petrobras</option>
                  <option value="tlife">Petrobras (periódico)</option>
                  <option value="sulamerica">Sul América</option>
                  <option value="amil">Amil</option>
                  <option value="mediservice">Mediservice</option>
                  <option value="assim">Assim</option>
                  <option value="gama">Gama Saúde </option>
                  <option value="carbej">Caberj Saúde</option>
                  <option value="integral">Integral Saúde</option>
                  <option value="goldencross">Golden Cross</option>
                </select>
              </div>

              <div className="md:flex md:flex-col">
                <label
                  htmlFor="cardnumber"
                  style={{ color: "var(--color-secondary)" }}
                  className="w-[350px] sm:w-[300px] pb-1"
                >
                  Carteirinha
                </label>
                <Input
                  type="text"
                  name=""
                  id="cardnumber"
                  width={isMobile? '300px' : '350px'}
                  height="42px"
                  placeholder={planRule}
                  value={cardNumber}
                  maxLenght={23}
                  onChange={(e) => {
                    const targetValue = e.target.value
                    const formatValue = targetValue.replace(/\D/g, '')

                    setCardNumber(formatValue)
                  }}
                />
                {cardnumberError ? (
                  <p className="absolute mt-[-14px] pl-2 text-red-500 sm:pl-0 sm:mt-[4.5rem]">
                    {cardnumberError}
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div
              className="text-center font-medium py-2 mt-8 mb-8 md:mt-6 md:mb-2"
              style={{ color: "var(--color-main)" }}
            >
              <h4>Dados do Paciente</h4>
              <hr></hr>
            </div>

            <div className="flex w-full h-60 flex-wrap items-center justify-center md:h-[34rem]">
              <label
                htmlFor="name"
                style={{ color: "var(--color-secondary)" }}
                className="w-[350px] sm:w-[300px] pb-1 mr-8 md:mr-0"
              >
                Nome civil
                <Input
                  type="text"
                  name=""
                  id="name"
                  placeholder="João Batista"
                  width={isMobile? '300px' : '350px'}
                  height="42px"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>

              <label
                htmlFor="socialname"
                style={{ color: "var(--color-secondary)" }}
                className="w-[350px] sm:w-[300px] pb-1"
              >
                Nome social
                <Input
                  type="text"
                  name=""
                  id="socialname"
                  placeholder="(opcional)"
                  width={isMobile? '300px' : '350px'}
                  height="42px"
                  value={socialName}
                  onChange={(e) => setSocialName(e.target.value)}
                />
              </label>

              <label
                htmlFor="email"
                style={{ color: "var(--color-secondary)" }}
                className="w-[350px] sm:w-[300px] pb-1 mr-8 md:mr-0"
              >
                E-mail
                <Input
                  type="email"
                  name=""
                  id="email"
                  placeholder="exemplo@gmail.com"
                  width={isMobile? '300px' : '350px'}
                  height="42px"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>

              <div className={typeNavigator == 'safari'? 'flex flex-col'  : "h-20 w-[350px] sm:w-[300px] flex"}>
                <div className={typeNavigator == 'safari'? 'flex flex-col' : ''}>
                  <label
                    htmlFor="birth"
                    style={{ color: "var(--color-secondary)" }}
                    className="w-[350px] sm:w-[300px] pb-1"
                  >
                    Dt Nascimento
                  </label>
                  <Input
                    type="text"
                    name=""
                    id="birth"
                    placeholder="00/00/0000"
                    height="42px"
                    width='130px'
                    value={birth}
                    maxLenght={10}
                    onChange={(e) => {
                      const targetValue = e.target.value
                      const targetValueNumber = targetValue.replace(/\D/g, '')

                      const newFormatValue =
                       targetValueNumber.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3")
                      setBirth(newFormatValue)
                    }}
                  />
                </div>

                <div className={typeNavigator == 'safari'? 'flex flex-col' : ''}>
                  <label
                    htmlFor="cpf"
                    style={{ color: "var(--color-secondary)" }}
                    className="w-[350px] sm:w-[300px] pb-1"
                  >
                    CPF
                  </label>
                  <Input
                    type="text"
                    name=""
                    id="cpf"
                    placeholder="000.000.000-00"
                    height="42px"
                    width={isMobile? '150px' : '200px'}
                    value={CPF}
                    maxLenght={14}
                    onChange={(e) => {
                      const input = e.target.value;
                      const formatInputValue = input.replace(/\D/g, "");

                      const finalFormat = formatInputValue.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
                      setCPF(finalFormat);
                    }}
                  />
                  {CPF ? (
                    <p className="absolute text-red-500 mt-[-14px]">
                      {cpfError}
                    </p>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              
              <div className="max-h-max w-full md:w-[350px]">
                <div className="flex flex-col pl-12 md:pl-0 sm:pl-2">
                  <label
                    htmlFor="phonenumber"
                    style={{ color: "var(--color-secondary)" }}
                    className="w-[350px] sm:w-[300px] pb-1"
                  >
                    Contato
                  </label>
                  <Input
                    type="text"
                    name=""
                    id="phonenumber"
                    placeholder="(22)00000-0000"
                    height="42px"
                    width={isMobile? '160px' : '180px'}
                    value={phoneNumber}
                    maxLenght={14}
                    onChange={(e) => {
                      ///(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4"
                      const targetValue = e.target.value
                      const targetValueNumber = targetValue.replace(/\D/g, '')

                      const newFormatValue =
                       targetValueNumber.replace(/(\d{2})(\d{5})(\d{4})/, "($1)$2-$3")

                      setPhoneNumber(newFormatValue)
                    }}
                  />
                </div>
               </div>              

              <div className={`w-full max-h-max flex justify-start pl-12 md:pl-0 md:justify-center sm:flex-col sm:pl-2 ${typeNavigator == 'safari' ? 'sm:mb-4' : ''}`}>
                <div className="flex items-center sm:mb-1">
                  <h2
                    style={{ color: "var(--color-main)" }}
                    className="font-semibold"
                  >
                    Sexo:
                  </h2>
                </div>

                <div className="flex w-[300px] items-center justify-evenly sm:flex-col sm:items-start sm:gap-1">
                  <label
                    htmlFor="man"
                    className="text-sm cursor-pointer"
                    style={{ color: "var(--color-main)" }}
                  >
                    Masculino
                    <input
                      type="radio"
                      name="sexo"
                      id="man"
                      className="ml-1 cursor-pointer"
                      value="masculino"
                      onChange={handleSexoChange}
                    />
                  </label>
                  <label
                    htmlFor="woman"
                    className="text-sm cursor-pointer"
                    style={{ color: "var(--color-main)" }}
                  >
                    Feminino
                    <input
                      type="radio"
                      name="sexo"
                      id="woman"
                      className="ml-1 cursor-pointer sm:ml-[11px]"
                      value="feminino"
                      onChange={handleSexoChange}
                    />
                  </label>
                  <label
                    htmlFor="undefined"
                    className="text-sm cursor-pointer"
                    style={{ color: "var(--color-main)" }}
                  >
                    Outro
                    <input
                      type="radio"
                      name="sexo"
                      id="undefined"
                      className="ml-1 cursor-pointer sm:ml-[34px]"
                      value="indefinido"
                      onChange={handleSexoChange}
                    />
                  </label>
                </div>
              </div>
            </div>

            {isYounger? (
                <div className="mt-14 sm:mt-4 w-full max-h-max py-2 flex flex-col animeLeft md:items-center " >
                <div className="w-full text-center py-4 font-semibold" style={{color: 'var(--color-main)'}}>
                  <h3>Dados do Responsável</h3>
                </div>

               <div className="flex flex-col pl-[50px] md:pl-0 sm:pl-2 sm:w-full">
                  <label htmlFor="responsible" style={{color: 'var(--color-secondary)'}}>
                       Nome do responsável
                  </label>  
                  <Input 
                     type="text"
                     name=""
                     id="responsible"
                     placeholder="Juliana Pereira (mãe)"
                     height="42px"
                     width={isMobile? '300px' : '350px'}
                      />
               </div>

               <div className="flex flex-col pl-[50px] md:pl-[146px] md:w-full sm:pl-2">
                  <label htmlFor="responsibleCPF" style={{color: 'var(--color-secondary)'}}>
                     CPF do responsável
                  </label>
                  <Input 
                    type="text"
                    name=""
                    id="responsibleCPF"
                    placeholder="182.085.795.72"
                    height="42px"
                    width={isMobile? '160px' : '175px'}
                    />
               </div>
            </div>
              ) : ''}


           <div className="w-full max-h-max">
            <div
              className={`${isYounger? 'mt-[0rem]' : 'mt-[5rem]'} text-center font-medium py-4 mb-4 md:mt-14 md:mb-4 sm:mt-6`}
              style={{ color: "var(--color-main)" }}
                  >
              <h4>Endereço do Paciente</h4>
              <hr></hr>
            </div>

            <div className="flex flex-wrap gap-8 pl-12 mb-8 md:pl-0 md:justify-center md:gap-4">

              <div className="h-24 w-[350px] flex mb-2 md:mb-0 sm:gap-2 sm:justify-center">
                <div className="sm:flex sm:flex-col">
                  <label
                    htmlFor="cep"
                    style={{ color: "var(--color-secondary)" }}
                    className="w-[350px] sm:w-[100px] pb-1"
                  >
                    CEP
                  </label>
                  <Input
                    type="text"
                    name=""
                    id="cep"
                    placeholder="22333-444"
                    height="42px"
                    width='100px'
                    value={CEP}
                    maxLenght={9}
                    onChange={(e) => {
                      const input = e.target.value;
                      const numericInput = input.replace(/\D/g, "");

                      let formattedInput = numericInput;
                      if (numericInput.length > 5) {
                        formattedInput = numericInput.replace(
                          /^(\d{5})(\d)/,
                          "$1-$2"
                        );
                      }
                      setCEP(formattedInput);
                    }}
                  />
                </div>

                <div className="sm:flex sm:flex-col">
                  <label
                    htmlFor="street"
                    style={{ color: "var(--color-secondary)"}}
                    className="w-[350px] sm:w-[190px] pb-1"
                  >
                    Rua
                  </label>
                  <Input
                    type="text"
                    name=""
                    id="street"
                    placeholder="Recanto da Alvorada"
                    height="42px"
                    width={isMobile? '180px' : '240px'}
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                  />
                </div>
              </div>

              <div className="h-24 w-[350px] flex sm:w-[300px] sm:gap-2">
                <div className={typeNavigator == 'safari' ? 'flex flex-col' : "pr-[10px] sm:pr-0"}>
                  <label
                    htmlFor="num"
                    style={{ color: "var(--color-secondary)" }}
                    className="w-[350px] sm:w-[100px] pb-1"
                  >
                    N°
                  </label>
                  <Input
                    type="text"
                    name=""
                    id="num"
                    placeholder="000"
                    height="42px"
                    width="100px"
                    value={number}
                    maxLenght={5}
                    onChange={(e) => {
                      const targetValue = e.target.value
                      const numbetTargetValue = targetValue.replace(/\D/g, '')

                      setNumber(numbetTargetValue)
                    }}
                  />
                </div>

                <div className={typeNavigator == 'safari' ? 'flex flex-col' : "" }>
                  <label
                    htmlFor="neighborhood"
                    style={{ color: "var(--color-secondary)" }}
                    className="w-[350px] sm:w-[190px] pb-1"
                  >
                    Bairro
                  </label>
                  <Input
                    type="text"
                    name=""
                    id="neighborhood"
                    placeholder="Centro"
                    height="42px"
                    width={isMobile? '180px' : '240px'}
                    value={neighborhood}
                    onChange={(e) => setNeighborhood(e.target.value)}
                  />
                </div>
              </div>
             </div>
            </div>

            <div
              className="text-center font-medium py-2 mt-4 mb-8 sm:mt-8 sm:mb-2"
              style={{ color: "var(--color-main)" }}
            >
              <h4>Escolha sua unidade e Anexe seu pedido</h4>
            </div>

            <div className="flex justify-center pl-12 mb-4 relative md:gap-2 md:h-[10rem] md:pl-0 md:justify-center md:flex-col md:items-center sm:mt-6">

              <div className="md:flex md:flex-col">
              <label htmlFor="document"
                     style={{ color: "var(--color-secondary)" }}
                     className="w-[350px] sm:w-[280px] pl-2 pb-1 sm:pl-2" >
                Unidade de atendimento
              </label>
               <select
                defaultValue="unidade"
                onChange={(e) => setUnit(e.target.value)}
              >
                <option value="unidade" disabled>
                  Unidade de atendimento
                </option>
                <option value="cavaleiros">
                  Cavaleiros (Avenida Nossa Senhora da Glória)
                </option>
                <option value="matriz">
                  Matriz (Rua Conde de Araruama - Centro)
                </option>
               </select>
              </div>

              <div className="w-[550px] flex items-center md:flex md:flex-col sm:w-full sm:justify-center sm:items-center">
              <label htmlFor="document"
                     style={{ color: "var(--color-secondary)" }}
                     className="w-[350px] sm:w-[300px] flex justify-center items-center rounded-md py-[12px] sm:py-[8px] sm:text-sm bg-white shadow-md shadow-gray-300 border border-dashed border-gray-400 cursor-pointer uppercase hover:bg-gray-600 transition duration-50 sm:pl-2" >
                Pedido médico (máximo 8)
              </label>
              <Input
                type="file"
                name=""
                id="document"
                placeholder=""
                width={isMobile? '280px' : '350px'}
                onChange={handleFileChange}
                multiple
              />
              </div>
            </div>

            <div className="max-h-max ml-14 sm:ml-4 text-sm text-gray-600 mb-6">
              {fileUrl.map((img, index) => (
                <div key={index}>
                  <p className={progress == 100? 'text-green-500' : ''}>{img?.name} - {progress.toFixed(0)}%</p>
                </div>
              ))}
            </div>

            <div className="w-full h-12 gap-2 flex items-center pl-12 md:justify-center md:pl-0">
              <input type="checkbox" 
                     name="" 
                     id="condition" 
                     className="w-4 h-4"
                     onChange={(e) => handleCheckCondition(e.target.checked)} 
                     />
                <label htmlFor=""
                       className="cursor-pointer text-md text-teal-500">
                       Li e concordo com os {' '}
                      <span className="underline font-semibold hover:text-teal-700"
                            onClick={handleOpenModalCondition}>
                        termos
                      </span>
                 </label>
            </div>

            <div className="flex justify-center">
           {imageURL.urls.length > 0 ? (
              <Button
              text="Enviar"
              width={isMobile? '250px' : '350px'}
              height="42px"
              marginTop="1rem"
              marginBottom=""
              onClick={createRequest}
            />
           ) : (
            <Button
            text="Aguardando arquivo..."
            width={isMobile? '250px' : '350px'}
            height="42px"
            marginTop="1rem"
            marginBottom=""
            disabled
          />
           ) }        
          </div>

          </div>
        </form>
      </section>
    </>
  );
};

export default Form
