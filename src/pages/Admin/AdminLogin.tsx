import bannerGreen from "../../assets/images/bannerAdminGreen.png";
import Input from "../../utils/Input";
import Button from "../../utils/Button";
import HeaderAdmin from "../../components/HeaderAdmin";
import { useState, useEffect } from "react";

import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebaseConfig";
import LoadingCup from "../../components/LoadingCup";
import { useNavigate } from "react-router-dom";


const AdminLogin = () => {
  const [email, setEmail] = useState('')  
  const [password, setPassword] = useState('')  
  const [serverEmail, setServerEmail] = useState('')  
  const [serverPassword, setServerPassword] = useState('')  
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const [signInWithEmailAndPassword, loading, user, error] =
  useSignInWithEmailAndPassword(auth);

  const adminbCollectionRef = collection(db, "admins");

  useEffect(() => {
    const getForms = async () => {
      const data = await getDocs(adminbCollectionRef);
      const a: any = data.docs.map((doc) => ({...doc.data(), id: doc.id }));
      setServerEmail(a[0].email);
      setServerPassword(a[0].password);
    };
    getForms();
  }, []);

  const navigate = useNavigate()

  const handleClickLogin = async (event: any) => {
    event.preventDefault()
    setErrorMessage('')
    
    if(email === '' || password === '') {
      setErrorMessage("preencha todos os campos corretamento!")
    } else if (email != serverEmail || password != serverPassword) {
      setErrorMessage('Email ou senha inválido!')
    } else if (error) {
      setErrorMessage('Error!' + error)
    } else {
      const response = await signInWithEmailAndPassword(email, password)

      if (response) {
        setSuccessMessage('Bem-vindo ADM!')
        window.localStorage.setItem("admin", 'on')
       
        setTimeout(() => {
          navigate('../admin/home')
          return user
        }, 2000)
      }
    }
  }
  

  return (
    <> 
    {loading? <LoadingCup /> : ''}   
      <HeaderAdmin />
      
      <div className="w-full h-[calc(100vh-80px)]">
        <section className="grid grid-cols-2 bg-gray-100/20">
          <div className="h-[calc(100vh-80px)]">
            <div
              className="h-[calc(100vh-80px)] flex justify-center items-center relative border-r-[1px] border-teal-100"
              style={{background: 'var(--background-gradient-secondary)'}}
            >
              <img
                src={bannerGreen}
                alt="imagem-laboratório-clinico"
                className="h-full object-contain"
              />
         
            </div>
          </div>

          <div className="flex items-center justify-center my-8 ml-24 animeLeft">

            <div className="flex flex-col justify-center w-full h-[calc(100vh-200px)] relative">
                <h2 className="text-[2rem] text-gray-400/70 font-normal mb-6">
                  Realize seu
                  <span className="textGradient text-[2.4rem]"> Login</span>

                </h2>

              <form onSubmit={handleClickLogin}>
                <div className="max-h-max flex flex-col justify-center items-start">
                  <label
                    htmlFor="email"
                    className="justify-start pl-1 w-[350px]"
                    style={{ color: "var(--color-secondary)" }}
                  >
                    Email
                  </label>
                  <Input
                    type="email"
                    name=""
                    id="email"
                    placeholder=""
                    width="350px"
                    height="42px"
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <label
                    htmlFor="password"
                    className="justify-start pl-1 w-[350px]"
                    style={{ color: "var(--color-secondary)" }}
                  >
                    Senha
                  </label>
                  <Input
                    type="password"
                    name=""
                    id="password"
                    placeholder=""
                    width="350px"
                    height="42px"
                    onChange={(e) => setPassword(e.target.value)}
                    
                  />

                  <div className="w-[350px] h-[42px] mt-2">                   
                      <Button
                        text="Logar"
                        width="350px"
                        height="42px"     
                        onClick={handleClickLogin}                   
                      />
                      {errorMessage? <p className="text-red-500">{errorMessage}</p> : ''}
                      {successMessage? <p className="text-green-500 text-center">{successMessage}</p> : ''}
                  </div>

                </div>
              </form>

            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AdminLogin
;
