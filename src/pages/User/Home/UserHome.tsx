import { useContext, useEffect } from "react";
import Header from "../../../components/Header";
import { UserContext } from "../../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Button from "../../../utils/Button";

import petroLogo from '../../../assets/icons/petroSaude.svg'
import unimedLogo from '../../../assets/icons/unimedSaude.svg'
import sulamericaLogo from '../../../assets/icons/sulamericaSaude.svg'
import amilLogo from '../../../assets/icons/amilSaude.svg'
import assimLogo from '../../../assets/icons/assimSaude.svg'
import gamaLogo from '../../../assets/icons/gameSaude.svg'
import mediserviceLogo from '../../../assets/icons/mediserviceSaude.svg'

const UserHome = () => {
  const { state } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (state.userOn === false) {
      navigate("../userlogin");
    }
  }, [state.userOn]);

  return (
    <>
      <Header />

      <section className="w-full h-[calc(100vh-80px)] flex justify-center items-center">

        <div className="w-[62rem] h-[30rem] flex gap-2 justify-evenly items-center animeLeft">
          <div
            className="sectionOffhome"
          >
            <h2 className="py-12 text-gray-400">Agendamentos</h2>

            <div>
              <p className="text-gray-500">0</p>
            </div>
            <div>
              <Button
                text="Agendar"
                marginTop="68px"
                height="42px"
                width="120px"
                background="gray"
              />
            </div>
          </div>

          <div className="sectionOnhome">

            <div className="text-white w-full h-20 flex justify-center items-center text-lg font-medium text-center py-14"><h2>
                      Disponibilidade <br />
                      para agendamento!</h2>
            </div>

            <div className="flex items-center justify-center gap-4 flex-wrap h-32 mt-8">
                <img src={petroLogo} alt="logo" className="w-24 -h-24" />
                <img src={unimedLogo} alt="logo" className="w-24 -h-24" />
                <img src={sulamericaLogo} alt="logo" className="w-24 -h-24" />
                <img src={amilLogo} alt="logo" className="w-20 -h-20" />
                <img src={gamaLogo} alt="logo" className="w-16 -h-12" />
                <img src={assimLogo} alt="logo" className="w-16 -h-12" />
                <img src={mediserviceLogo} alt="logo" className="w-28 h-28" />
            </div>

            <Button
               text="Saiba mais"
               height="42px"
               width="220px"
               marginTop="68px"
               borderColor='teal'
               boxShadow='none'
                />
          </div>


          <div className="sectionOffhome">
            <h2 className="pt-12 pb-6 text-gray-400">Informações</h2>

            <div className="w-full max-h-max flex justify-center items-center px-3">
              <p className="text-gray-400/80 text-[0.8rem]">Ao agendar seus exames, será possível agilizar seu processo de cadastramento em nossas unidade. Proporcionando uma experiência ainda melhor!</p>
            </div>
            <div>
              <Button
                text="Saiba mais"
                marginTop="18px"
                height="42px"
                width="120px"
                background="gray"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserHome;
