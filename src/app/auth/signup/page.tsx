"use client";
import { Container } from "@/app/components/layout/Container";
import { Input } from "@/app/components/form/Input";
import { Logo } from "@/app/components/layout/Logo";
import { Button } from "@/app/components/form/Button";

export default function Signup() {
  return (
    <div className="bg-gray-100-custom w-full">
      <Container>
        <div className="flex items-center justify-center w-full py-12 flex-1 bg-gray-100-custom px-6 min-h-screen">
          <div className="max-w-[552px] mx-auto w-full bg-white">
            <div className="bg-blue-primary-dark p-6">
              <Logo height={36} />
              <h6 className="font-head text-head24 text-white-custom font-normal mt-4">
                Vamos lá, <b>faça seu cadastro</b>
              </h6>
            </div>
            <div className="w-full p-6">
              {/* <div>
                <h6 className="font-head text-body16 font-semibold text-black-custom font-normal">
                  Faça seu cadastro com Google
                </h6>
                <div className="mt-6">
                  <button className="cursor-pointer border border-gray-200-custom h-[56px] w-full flex items-center justify-center gap-4 bg-transparent rounded-md font-button text-button16 text-gray-500-custom font-semibold">
                    Cadastrar com Google
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
                  Cadastre-se com seus dados
                </h6>
                <form className=" flex flex-col gap-6 mt-6" action="">
                  <div className="flex flex-col gap-3">
                    <Input
                      label="Nome"
                      type="text"
                      placeholder="Digite seu nome"
                    />
                    <Input
                      label="Sobrenome"
                      type="text"
                      placeholder="Digite seu sobrenome"
                    />
                    <Input
                      label="E-mail"
                      type="email"
                      placeholder="Digite seu e-mail"
                    />
                    <Input
                      label="Usuário"
                      type="text"
                      placeholder="Crie seu usuário"
                      prefix="@"
                    />
                    <Input
                      label="Senha"
                      type="password"
                      placeholder="Digite sua senha"
                      showPasswordToggle
                    />
                    <Input
                      label="Confirmação de Senha"
                      type="password"
                      placeholder="Digite sua confirmação de senha"
                      showPasswordToggle
                    />
                    <div className="w-full flex items-center"></div>
                  </div>
                  <div className="flex items-center gap-6">
                    <Button text="Já tenho conta" variant="secondary" fullWidth />
                    <Button text="Cadastrar" variant="primary" fullWidth />
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
