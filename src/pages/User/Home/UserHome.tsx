import { useContext, useEffect, useState } from "react";
import Header from "../../../components/Header";
import { UserContext } from "../../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../../utils/Button";

import { getDocs, collection } from "firebase/firestore";
import { db } from "../../../services/firebaseConfig";

import infoIcon from "../../../assets/icons/info.svg";
import infoGrayIcon from "../../../assets/icons/info-gray.svg";
import calendarIcon from "../../../assets/icons/calendar.svg";
import calendarGrayIcon from "../../../assets/icons/calendar-gray.svg";
import checkallIcon from "../../../assets/icons/checkall.svg";
import checkallGrayIcon from "../../../assets/icons/checkall-gray.svg";
import checkIcon from "../../../assets/icons/checkone.svg";
import checkGrayIcon from "../../../assets/icons/checkone-gray.svg";
import MenuMobile from "../../../components/MenuMobile";

const UserHome = () => {
  const [cardSelect, setCardSelect] = useState(2);
  const [form, setForm] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  const { state } = useContext(UserContext);
  
  const navigate = useNavigate();

  useEffect(() => {
    if (state.userOn === false) {
      navigate("../userlogin");
    }
  }, [state.userOn]);

  const handleClickCardOne = () => {
    setCardSelect(1);
  };
  const handleClickCardTwo = () => {
    setCardSelect(2);
  };
  const handleClickCardThree = () => {
    setCardSelect(3);
  };

  const formsCollectionRef = collection(db, "UserData");
  useEffect(() => {
    const getForms = async () => {
      const data = await getDocs(formsCollectionRef);
      const a: any = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setForm(a)
      return form
    };
    getForms();
  }, []);

  const {innerWidth: width} = window
  useEffect(() => {
    if (width < 600 ) {
      setIsMobile(true)
    }
  }, [])

  return (
    <>
      {isMobile? <MenuMobile />  : <Header />}

      <section className="w-full h-[calc(100vh-80px)] sm:h-[42rem] flex justify-center items-center">
        <div
          className="w-[62rem] h-[30rem] flex justify-evenly items-center animeLeft flex-wrap lg:gap-4 md:max-h-max sm:h-[40rem] sm:overflow-hidden"
          id="agendamentos"
        >
          <div
            className={
              cardSelect === 1
                ? "sectionOnhome relative"
                : "sectionOffhome relative"
            }
            onMouseEnter={handleClickCardOne}
          >
            <div className="w-full h-[6rem] flex justify-center items-center sm:h-[4rem]">
              <h2 className="sm:text-[1rem]">Solicitações</h2>
            </div>
            
            <div className="w-[28px] h-[28px] absolute left-1 top-1 sm:h-[24px] sm:2-[24px]">
              <img
                src={cardSelect === 1 ? calendarIcon : calendarGrayIcon}
                alt=""
                className="w-[28px] h-[28px] sm:h-[24px] sm:2-[24px]"
              />
            </div>

            <span></span>
            <span></span>
            <span></span>
            <span></span>

            <div className="w-full h-[8rem] flex justify-center items-center px-4 sm:px-2 sm:h-[4rem]">
              <p className={
                  cardSelect === 1
                    ? `text-[1rem] text-gray-200 leading-6 sm:text-[0.8rem]`
                    : `text-[0.8rem] text-gray-300 sm:text-[0.6rem]`
                }>Consulte os status das suas solicitações de atendimento aqui.</p>
            </div>

            <div className="w-full flex justify-center items-center h-[6rem]">
              <Link to='../user/consulta'>
              <Button
                text="Consultar"
                marginTop={cardSelect === 1 ? "60px" : "0px"}
                height="42px"
                width={cardSelect === 1 ? "200px" : "120px"}
                background={cardSelect === 1 ? "teal" : "gray"}
                boxShadow={cardSelect === 1 ? "none" : ""}
                disabled={cardSelect === 1 ? false : true}
              />
              </Link>
            </div>
          </div>

          <div
            className={
              cardSelect === 2
                ? "sectionOnhome relative"
                : "sectionOffhome relative"
            }
            onMouseEnter={handleClickCardTwo}
          >
            <div className="w-full h-[5rem] flex justify-center items-center text-center sm:h-[4rem]">
              <h2 className="sm:text-[1rem] sm:pt-2">
                Disponíveis para<br />
                pré cadastramento!
              </h2>
            </div>
            <div className="w-[26px] h-[26px] absolute left-1 top-1 sm:h-[24px] sm:2-[24px]">
              <img
                src={cardSelect === 2 ? checkallIcon : checkallGrayIcon}
                alt=""
                className="w-[26px] h-[26px] sm:h-[24px] sm:2-[24px]"
              />
            </div>

            <span></span>
            <span></span>
            <span></span>
            <span></span>

            <div
              className={
                cardSelect === 2
                  ? `pt-8 flex text-cente justify-between h-[10rem] w-full text-sm text-gray-200 gap-2 px-6  sm:h-[6rem] sm:pt-0 sm:mt-4 sm:gap-0 sm:text-[0.7rem] sm:overflow-auto sm:mb-6`
                  : "flex text-cente justify-between h-[10rem] w-full text-sm text-gray-200 gap-2 px-4 sm:h-[1.5rem] sm:pt-0 sm:mt-2 sm:gap-0 sm:text-[0.7rem] sm:overflow-hidden"
              }
            >
              <ul className="flex flex-col items-start">
                <li className="border-b-[1px] w-[100%] border-gray-100/40">
                  Unimed Intercambio
                </li>
                <li className="border-b-[1px] w-[100%] border-gray-100/40">
                  <p>Petrobras</p>
                </li>
                <li className="border-b-[1px] w-[100%] border-gray-100/40">
                  Sul América
                </li>
                <li className="border-b-[1px] w-[100%] border-gray-100/40">
                  Amil Saúde
                </li>
                <li className="border-b-[1px] w-[100%] border-gray-100/40">
                  Assim Saúde
                </li>
                <li className="border-b-[1px] w-[100%] border-gray-100/40">
                  Mediservice
                </li>
                <li className="border-b-[1px] w-[100%] border-gray-100/40">
                  Gama Saúde
                </li>
              </ul>

              <div className="flex flex-col justify-center sm:justify-start sm:gap-1 h-[9.5rem]">
                <div className="w-[20px] h-[20px] sm:w-[18px] sm:h-[18px]">
                  <img
                    src={cardSelect === 2 ? checkIcon : checkGrayIcon}
                    alt=""
                  />
                </div>
                <div className="w-[20px] h-[20px] sm:w-[18px] sm:h-[18px]">
                  <img
                    src={cardSelect === 2 ? checkIcon : checkGrayIcon}
                    alt=""
                  />
                </div>
                <div className="w-[20px] h-[20px] sm:w-[18px] sm:h-[18px]">
                  <img
                    src={cardSelect === 2 ? checkIcon : checkGrayIcon}
                    alt=""
                  />
                </div>
                <div className="w-[20px] h-[20px] sm:w-[18px] sm:h-[18px]">
                  <img
                    src={cardSelect === 2 ? checkIcon : checkGrayIcon}
                    alt=""
                  />
                </div>
                <div className="w-[20px] h-[20px] sm:w-[18px] sm:h-[18px]">
                  <img
                    src={cardSelect === 2 ? checkIcon : checkGrayIcon}
                    alt=""
                  />
                </div>
                <div className="w-[20px] h-[20px] sm:w-[18px] sm:h-[18px]">
                  <img
                    src={cardSelect === 2 ? checkIcon : checkGrayIcon}
                    alt=""
                  />
                </div>
                <div className="w-[20px] h-[20px] sm:w-[18px] sm:h-[18px]">
                  <img
                    src={cardSelect === 2 ? checkIcon : checkGrayIcon}
                    alt=""
                  />
                </div>
              </div>
            </div>

            <div className="w-full h-[6rem] sm:h-[2rem] flex justify-center items-center">
              <Link to='../user/solicitacao'>
              <Button
                text="Solicitar"
                marginTop={cardSelect === 2 && !isMobile ? "60px" : ""}
                height="42px"
                disabled={cardSelect === 2 ? false : true}
                width={cardSelect === 2 ? "200px" : "120px"}
                background={cardSelect === 2 ? "teal" : "gray"}
                boxShadow={cardSelect === 2 ? "none" : ""}
              />
              </Link>
            </div>            
          </div>

          <div
            className={
              cardSelect === 3
                ? "sectionOnhome relative"
                : "sectionOffhome relative"
            }
            onMouseEnter={handleClickCardThree}
          >
            <div className="w-full h-[6rem] sm:pt-2 flex justify-center items-center">
              <h2 className="sm:text-[1rem] pt-2">Informações</h2>
            </div>
            <div className="w-[20px] h-[20px] absolute left-1 top-1">
              <img
                src={cardSelect === 3 ? infoIcon : infoGrayIcon}
                alt=""
                className="w-[20px] h-[20px]"
              />
            </div>

            <span></span>
            <span></span>
            <span></span>
            <span></span>

            <div className="w-full h-[8rem] flex justify-center items-center px-2">
              <p
                className={
                  cardSelect === 3
                    ? `text-[1rem] text-gray-200 leading-6 px-2 sm:text-[0.8rem] sm:mt-8`
                    : `sm:hidden text-[0.8rem] text-gray-300`
                }
              >
                Ao deixar sua visita pré cadastrada, será possível agilizar seu processo de
                atendimento em nossas unidade. Proporcionando uma experiência
                ainda melhor!
              </p>
            </div>

            <div className="h-[7rem] w-full flex justify-center items-center sm:mt-[-30px] sm:mb-[1rem]">
              <Link to='../user/termos'>
              <Button
                text="Saiba Mais"
                marginTop={cardSelect === 3 ? "60px" : ""}
                height="42px"
                disabled={cardSelect === 3 ? false : true}
                width={cardSelect === 3 ? "200px" : "120px"}
                background={cardSelect === 3 ? "teal" : "gray"}
                boxShadow={cardSelect === 3 ? "none" : ""}
              />
              </Link>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default UserHome;
