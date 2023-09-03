import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../../services/firebaseConfig";
import { useContext, useEffect, useState } from "react";
import Header from "../../../components/Header";
import bannerlogin from "../../../assets/images/bannerlogin.png";
import Input from "../../../utils/Input";
import Button from "../../../utils/Button";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import LoadingCup from "../../../components/LoadingCup";

const UserLogin = () => {
  const [emailAtual, setEmailAtual] = useState("");
  const [passwordAtual, setPasswordAtual] = useState("");
  const [isMobile, setIsMobile] = useState(false)
  const [errorRegister, setErrorRegister] = useState("");
  const [successRegister, setSuccessRegister] = useState("");

  const { state } = useContext(UserContext);

  if (state.userOn === true) {
    state.toggleUserLog();
  }

  const [signInWithEmailAndPassword, loading, user, error] =
    useSignInWithEmailAndPassword(auth);

  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setErrorRegister("");
    setSuccessRegister("");

    if (emailAtual === "" ||
        passwordAtual === "" ||
        emailAtual === "cavaleiros@hemolabes.com") {
      setErrorRegister("Preencha todos os campos corretamente!");
    } else if (passwordAtual.length < 8) {
      setErrorRegister("A senha deve ter no mínimo 8 caracteres!");
    } else {
      try {
        const res = await signInWithEmailAndPassword(emailAtual, passwordAtual);

        if (res) {
          setSuccessRegister("Login realizado com sucesso!");
          window.localStorage.setItem("user", res.user.uid);

          setTimeout(() => {
            navigate("/user/userhome");
            state.toggleUserLog();
            return user;
          }, 4000);
        }
      } catch (err: any) {
        console.log(err);
      }
    }
  };

  const {innerWidth: width} = window
  useEffect(() => {
    if (width < 600 ) {
      setIsMobile(true)
    }
  }, [width])


  return (
    <>
      {loading ? <LoadingCup /> : null }

      <Header />
      
      <div className="w-full h-[calc(100vh-80px)]">
        <section className="grid grid-cols-2 bg-gray-100/30 md:grid-cols-1">

          <div className="h-[calc(100vh-80px)] md:hidden">
            <div
              className="h-[calc(100vh-80px)] flex justify-center items-center relative border-r-[1px] border-teal-100"
              style={{ background: "var(--background-gradient-secondary)" }}
            >
              <img
                src={bannerlogin}
                alt="imagem-laboratório-clinico"
                className="h-full object-contain"
              />
              <a
                href="https://storyset.com/medical"
                className="text-[4px] absolute bottom-0 left-0"
              >
                Medical illustrations by Storyset
              </a>
            </div>
          </div>

          <div className="flex items-center justify-center my-8 ml-24 lg:ml-8 animeLeft md:my-0 md:ml-0 md:w-full">
            
            <div className="flex flex-col w-full h-[calc(100vh-200px md:justify-center md:items-center md:h-[calc(100vh-80px)] md:max-w-max"
            >
              <div className="h-20 flex justify-start items-center relative z-10 md:w-full sm:w-[300px]">
                <h2 className="text-[2rem] sm:text-[1.5rem] text-gray-400/70 font-normal">
                  Realize seu
                  <span className="textGradient text-[2.4rem] sm:text-[1.8rem]"> Login</span>
                  <div className="detailAnimation z-0"></div>
                </h2>
              </div>

              <form onSubmit={handleLogin}>
                <div className="h-96 max-h-max flex flex-col justify-center items-start sm:items-center">
                  <label
                    htmlFor="email"
                    className="justify-start pl-1 w-[350px] sm:w-[300px]"
                    style={{ color: "var(--color-secondary)" }}
                  >
                    Email
                  </label>
                  <Input
                    type="email"
                    name=""
                    id="email"
                    placeholder=""
                    width={isMobile? "300px" : '350px'}
                    height="42px"
                    onChange={(e) => setEmailAtual(e.target.value)}
                  />

                  <label
                    htmlFor="password"
                    className="justify-start  pl-1 w-[350px] sm:w-[300px]"
                    style={{ color: "var(--color-secondary)" }}
                  >
                    Senha
                  </label>
                  <Input
                    type="password"
                    name=""
                    id="password"
                    placeholder=""
                    width={isMobile? "300px" : '350px'}
                    height="42px"
                    onChange={(e) => setPasswordAtual(e.target.value)}
                  />

                  <div className="w-[350px] sm:w-[300px] h-[42px] mt-2">
                    {loading ? (
                        <Button
                         text="Logando..."
                         width={isMobile? "300px" : '350px'}
                         height="42px"
                         disabled
                       />
                    
                    ) : (
                      <Button
                        text="Logar"
                        width={isMobile? "300px" : '350px'}
                        height="42px"
                        onClick={handleLogin}
                      />
                    )}

                    {errorRegister ? (
                      <p className="text-red-500 pt-1">{errorRegister}</p>
                    ) : (
                      ""
                    )}
                    {successRegister ? (
                      <p className="text-teal-500 pt-1">{successRegister}</p>
                    ) : (
                      ""
                    )}
                    {error ? <p className="text-red-500 pt-1">Login ou senha inválido</p> : ""}
                  </div>

                  <div className="w-[350px] sm:w-[300px] mt-12 text-sm">
                    <Link
                      to="changepassword"
                      className="text-light underline"
                      style={{ color: "var(--color-secondary)" }}
                    >
                      Esqueceu sua senha?
                    </Link>
                  </div>

                  <div className="w-[350px] sm:w-[300px] h-[42px] mt-10">
                    <Link to="register">
                      <Button
                        text="Registrar"
                        width="150px"
                        height="42px"
                        background="white"
                        borderColor="teal"
                        color="teal"
                      />
                    </Link>
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

export default UserLogin;
