"use client";
import { Container } from "@/app/components/container";
import { Logo } from "@/app/components/Logo";
import { Input } from "@/app/components/form/Input";
import { Button } from "@/app/components/form/Button";

export default function Login() {
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
                  <div className="flex flex-col gap-3">
                    <Input
                      label="E-mail/Usuário"
                      type="email"
                      id="email"
                      placeholder="Digite seu e-mail ou usuário"
                    />
                    <Input
                      label="Senha"
                      type="password"
                      id="password"
                      placeholder="********"
                      showPasswordToggle
                    />
                  </div>
                  <div className="flex items-center gap-6">
                    <Button text="Cadastrar-se" variant="secondary" fullWidth />
                    <Button text="Entrar" variant="primary" fullWidth />
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
