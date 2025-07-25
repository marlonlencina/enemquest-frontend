"use client";
import { Button } from "@/app/components/form/Button";
import { GoogleButton } from "@/app/components/form/GoogleButton";
import { HelperMessage } from "@/app/components/form/HelperMessage";
import { Input } from "@/app/components/form/Input";
import { LinkButton } from "@/app/components/form/LinkButton";
import { Container } from "@/app/components/layout/Container";
import { Logo } from "@/app/components/layout/Logo";
import { useAuth } from "@/context/useAuth";
import { useErrorHandler } from "@/utils/errorHandler";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object({
  nome: Yup.string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .required("Nome é obrigatório"),
  sobrenome: Yup.string()
    .min(2, "Sobrenome deve ter pelo menos 2 caracteres")
    .required("Sobrenome é obrigatório"),
  email: Yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  usuario: Yup.string()
    .min(3, "Usuário deve ter pelo menos 3 caracteres")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Usuário deve conter apenas letras, números e _"
    )
    .required("Usuário é obrigatório"),
  telefone: Yup.string()
    .min(10, "Telefone deve ter pelo menos 10 caracteres")
    .max(11, "Telefone deve ter no máximo 11 caracteres")
    .required("Telefone é obrigatório"),
  dataNascimento: Yup.date()
    .max(new Date(), "Data de nascimento não pode ser no futuro")
    .required("Data de nascimento é obrigatória"),
  senha: Yup.string()
    .min(8, "Senha deve ter pelo menos 8 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Senha deve conter pelo menos uma letra minúscula, maiúscula e um número"
    )
    .required("Senha é obrigatória"),
  confirmacaoSenha: Yup.string()
    .oneOf([Yup.ref("senha")], "Senhas devem ser iguais")
    .required("Confirmação de senha é obrigatória"),
});

export default function Signup() {
  const { signup } = useAuth();
  const { handleError, applyValidationErrors } = useErrorHandler();
  const [serverError, setServerError] = useState<string | null>(null);
  const formik = useFormik({
    initialValues: {
      nome: "",
      sobrenome: "",
      email: "",
      usuario: "",
      telefone: "",
      dataNascimento: "",
      senha: "",
      confirmacaoSenha: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setServerError(null);
      try {
        await signup({
          nome: values.nome,
          sobrenome: values.sobrenome,
          email: values.email,
          usuario: values.usuario,
          telefone: values.telefone,
          dataNascimento: values.dataNascimento,
          senha: values.senha,
        });
      } catch (error) {
        const { isValidationError, validationErrors, message } =
          handleError(error);
        if (isValidationError && validationErrors.length > 0) {
          // Aplica erros de validação do servidor nos campos
          applyValidationErrors(formik, validationErrors);
          setServerError(null); // Remove erro geral se há erros específicos por campo
        } else {
          // Erro geral (não de validação)
          setServerError(message);
        }
      }
    },
  });
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
            <div className="w-full p-6 flex flex-col gap-6">
              <HelperMessage message={serverError} showIcon variant="error" />
              <div className="">
                <h6 className="font-head text-body16 font-semibold text-black-custom font-normal">
                  Cadastre-se com seus dados
                </h6>
                <form
                  onSubmit={formik.handleSubmit}
                  className=" flex flex-col gap-6 mt-6"
                  action=""
                >
                  <div className="flex flex-col gap-3">
                    <Input
                      label="Nome"
                      type="text"
                      id="nome"
                      name="nome"
                      placeholder="Digite seu nome"
                      value={formik.values.nome}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.nome && formik.errors.nome
                          ? formik.errors.nome
                          : undefined
                      }
                    />

                    <Input
                      label="Sobrenome"
                      type="text"
                      id="sobrenome"
                      name="sobrenome"
                      placeholder="Digite seu sobrenome"
                      value={formik.values.sobrenome}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.sobrenome && formik.errors.sobrenome
                          ? formik.errors.sobrenome
                          : undefined
                      }
                    />

                    <Input
                      label="E-mail"
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Digite seu e-mail"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.email && formik.errors.email
                          ? formik.errors.email
                          : undefined
                      }
                    />
                    <Input
                      label="Usuário"
                      type="text"
                      id="usuario"
                      name="usuario"
                      placeholder="Crie seu usuário"
                      prefix="@"
                      value={formik.values.usuario}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.usuario && formik.errors.usuario
                          ? formik.errors.usuario
                          : undefined
                      }
                    />

                    <Input
                      label="Telefone"
                      type="tel"
                      id="telefone"
                      name="telefone"
                      placeholder="(XX) XXXXX-XXXX"
                      value={formik.values.telefone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.telefone && formik.errors.telefone
                          ? formik.errors.telefone
                          : undefined
                      }
                    />
                    <Input
                      label="Data de nascimento"
                      type="date"
                      id="dataNascimento"
                      name="dataNascimento"
                      placeholder="DD/MM/AAAA"
                      value={formik.values.dataNascimento}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.dataNascimento &&
                        formik.errors.dataNascimento
                          ? formik.errors.dataNascimento
                          : undefined
                      }
                    />

                    <Input
                      label="Senha"
                      type="password"
                      id="senha"
                      name="senha"
                      placeholder="Digite sua senha"
                      showPasswordToggle
                      value={formik.values.senha}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.senha && formik.errors.senha
                          ? formik.errors.senha
                          : undefined
                      }
                    />

                    <Input
                      label="Confirmação de Senha"
                      type="password"
                      id="confirmacaoSenha"
                      name="confirmacaoSenha"
                      placeholder="Digite sua confirmação de senha"
                      showPasswordToggle
                      value={formik.values.confirmacaoSenha}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.confirmacaoSenha &&
                        formik.errors.confirmacaoSenha
                          ? formik.errors.confirmacaoSenha
                          : undefined
                      }
                    />
                    <div className="w-full flex items-center"></div>
                  </div>
                  <div className="flex items-center gap-6">
                    <LinkButton
                      text="Já tenho conta"
                      variant="secondary"
                      fullWidth
                      href="/auth/login"
                    />
                    <Button
                      type="submit"
                      text="Cadastrar"
                      variant="primary"
                      fullWidth
                    />
                  </div>
                </form>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-full h-[1px] bg-gray-200-custom"></div>
                <span className="px-6 font-body font-normal text-sm12 text-gray-400-custom">
                  ou
                </span>
                <div className="w-full h-[1px] bg-gray-200-custom"></div>
              </div>
              <div className="">
                <h6 className="font-head text-body16 font-semibold text-black-custom ">
                  Faça seu login com Google
                </h6>
                <div className="mt-6">
                  <GoogleButton text="signup_with" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
