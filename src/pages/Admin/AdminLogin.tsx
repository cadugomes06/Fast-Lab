import bannerGreen from "../../assets/images/bannerAdminGreen.png";
import Input from "../../utils/Input";
import Button from "../../utils/Button";
import HeaderAdmin from "../../components/HeaderAdmin";


const AdminLogin = () => {
  
  

  return (
    <>    
      <HeaderAdmin />
      
      <div className="w-full h-[calc(100vh-80px)]">
        <section className="grid grid-cols-2 bg-gray-100/20">
          <div className="h-[calc(100vh-80px)]">
            <div
              className="h-[calc(100vh-80px)] flex justify-center items-center relative border-r-[1px] border-teal-100"
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

              <form >
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
                    
                  />

                  <div className="w-[350px] h-[42px] mt-2">                   
                      <Button
                        text="Logar"
                        width="350px"
                        height="42px"                        
                      />
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
