"use client";
import { Container } from "@/app/components/container";
import { Logo } from "@/app/components/Logo";

export default function Signup() {
  return (
    <div className="bg-gray-100-custom w-full">
      <Container>
        <div className="flex items-center justify-center w-full py-12 flex-1 bg-gray-100-custom px-6 min-h-screen">
          <div className="max-w-[564px] mx-auto w-full bg-white">
            <div className="bg-blue-primary-dark p-6">
              <Logo height={36} />
              <h6 className="font-head text-head24 text-white-custom font-normal mt-4">
                Bem-vindo, <b>faça seu login</b>
              </h6>
            </div>
            <div className="w-full p-6">
              {/* <div>
                <h6 className="font-head text-body16 font-semibold text-black-custom font-normal">
                  Faça seu login com Google
                </h6>
                <div className="mt-6">
                  <button className="cursor-pointer border border-gray-200-custom h-[56px] w-full flex items-center justify-center gap-4 bg-transparent rounded-md font-button text-button16 text-gray-500-custom font-semibold">
                    Entrar com Google
                  </button>
                </div>
              </div> */}

              {/* <div className="mt-6 flex items-center gap-4">
                <div className="w-full h-[1px] bg-gray-200-custom"></div>
                <span className="px-6 font-body font-normal text-sm12 text-gray-400-custom">
                  ou
                </span>
                <div className="w-full h-[1px] bg-gray-200-custom"></div>
              </div> */}

              <div className="">
                <h6 className="font-head text-body16 font-semibold text-black-custom font-normal">
                  Entre com e-mail/usuário e senha
                </h6>
                <form className=" flex flex-col gap-6 mt-6" action="">
                  <div className="flex flex-col gap-4">
                    <input
                      type="email"
                      placeholder="Digite seu e-mail ou usuário"
                      className="font-body font-normal text-body16 placeholder:text-gray-400-custom text-black-custom w-full h-[56px] px-4 border border-gray-200-custom rounded-md outline-0"
                    />
                    <div className="font-body font-normal text-body16  text-black-custom w-full h-[56px] px-4 border border-gray-200-custom rounded-md ">
                      <input
                        className="h-full w-full placeholder:text-gray-400-custom outline-0"
                        type="password"
                        placeholder="Digite sua senha"
                      />
                    </div>
                    <div className="w-full flex items-center"></div>
                  </div>
                  <div className="flex items-center gap-6">
                    <button className="cursor-pointer  h-[56px] w-full flex items-center justify-center gap-4 bg-transparent border border-gray-200-custom rounded-md font-button text-button16 text-gray-500-custom font-semibold">
                      Cadastrar-se
                    </button>
                    <button className="cursor-pointer  h-[56px] w-full flex items-center justify-center gap-4 bg-blue-primary rounded-md font-button text-button16 text-white-custom font-semibold">
                      Entrar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
