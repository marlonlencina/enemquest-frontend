import SectionDescription from "../../components/layout/SectionDescription";
import SectionTitle from "../../components/layout/SectionTitle";
import { PageTitle } from "../../components/layout/PageTitle";
import { Input } from "@/app/components/form/Input";
import { Button } from "@/app/components/form/Button";

export default function Dashboard() {
  return (
    <>
      <div>
        <PageTitle>
          Sua conta
        </PageTitle>
        <div className="mt-6 w-full bg-white-custom p-6 rounded-lg">
          <div>
            <SectionTitle>Informações da conta</SectionTitle>
            <SectionDescription>
              Altere suas informações pessoais, como nome, e-mail e senha.
            </SectionDescription>
          </div>
          <div className="mt-6">
            <div className="grid grid-cols-2 gap-6">
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
                placeholder="Digite seu usuário"
                prefix="@"
              />
            </div>
            <div className="mt-6">
              <Button text="Alterar dados" variant="primary" />
            </div>
          </div>
        </div>
        <div className="mt-6 w-full bg-white-custom p-6 rounded-lg">
          <div>
            <SectionTitle>Senha de acesso</SectionTitle>
            <SectionDescription>
              Altere sua senha de acesso.
            </SectionDescription>
          </div>
          <div className="mt-6">
            <div className="grid grid-cols-2 gap-6">
              <Input
                label="Senha atual"
                type="password"
                placeholder="Digite sua senha atual"
              />
              <Input
                label="Nova senha"
                type="password"
                placeholder="Digite sua nova senha"
              />
              <Input
                label="Confirmar nova senha"
                type="password"
                placeholder="Confirme sua nova senha"
              />
            </div>
            <div className="mt-6">
              <Button text="Alterar senha" variant="primary" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
