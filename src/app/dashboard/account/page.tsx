"use client";

import { Button } from "@/app/components/form/Button";
import { Input } from "@/app/components/form/Input";
import { useAuth } from "@/context/useAuth";
import {
  changePassword,
  enablePassword,
  updateUser,
} from "@/server/userRequests";
import { useFormik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";
import { Accordion } from "../../components/layout/Accordion";
import { PageTitle } from "../../components/layout/PageTitle";

// Schema de validação para dados gerais
const generalDataValidationSchema = Yup.object({
  nome: Yup.string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(50, "Nome deve ter no máximo 50 caracteres")
    .required("Nome é obrigatório"),
  sobrenome: Yup.string()
    .min(2, "Sobrenome deve ter pelo menos 2 caracteres")
    .max(50, "Sobrenome deve ter no máximo 50 caracteres")
    .required("Sobrenome é obrigatório"),
  email: Yup.string()
    .email("E-mail deve ter um formato válido")
    .required("E-mail é obrigatório"),
  usuario: Yup.string()
    .min(3, "Usuário deve ter pelo menos 3 caracteres")
    .max(30, "Usuário deve ter no máximo 30 caracteres")
    .matches(
      /^[a-zA-Z0-9_]+$/,
      "Usuário deve conter apenas letras, números e underscore"
    )
    .required("Usuário é obrigatório"),
});

// Schema de validação para senha
const passwordValidationSchema = Yup.object({
  senhaAtual: Yup.string().required("Senha atual é obrigatória"),
  novaSenha: Yup.string()
    .min(8, "Nova senha deve ter pelo menos 8 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Nova senha deve conter pelo menos: 1 letra minúscula, 1 maiúscula, 1 número e 1 caractere especial"
    )
    .required("Nova senha é obrigatória"),
  confirmarNovaSenha: Yup.string()
    .oneOf(
      [Yup.ref("novaSenha")],
      "Confirmação de senha deve ser igual à nova senha"
    )
    .required("Confirmação da nova senha é obrigatória"),
});

const passwordValidationGoogleSchema = Yup.object({
  novaSenha: Yup.string()
    .min(8, "Nova senha deve ter pelo menos 8 caracteres")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Nova senha deve conter pelo menos: 1 letra minúscula, 1 maiúscula, 1 número e 1 caractere especial"
    )
    .required("Nova senha é obrigatória"),
  confirmarNovaSenha: Yup.string()
    .oneOf(
      [Yup.ref("novaSenha")],
      "Confirmação de senha deve ser igual à nova senha"
    )
    .required("Confirmação da nova senha é obrigatória"),
});

export default function Account() {
  const { user } = useAuth();
  const alreadyHasPassword = user?.isPasswordEnabled;

  // Formik para dados gerais
  const generalDataFormik = useFormik({
    initialValues: {
      nome: user?.nome || "",
      sobrenome: user?.sobrenome || "",
      email: user?.email || "",
      usuario: user?.usuario || "",
    },
    validationSchema: generalDataValidationSchema,
    enableReinitialize: true, // Permite reinicializar quando user mudar
    onSubmit: async (values, { setSubmitting }) => {
      try {
        console.log("Atualizando dados gerais:", values);
        if (!user?.id) return;
        await updateUser(user.id, {
          nome: values.nome,
          sobrenome: values.sobrenome,
          email: values.email,
          usuario: values.usuario,
        });
      } catch (error) {
        console.error("Erro ao atualizar dados:", error);
        alert("Erro ao atualizar dados!");
      } finally {
        setSubmitting(false);
      }
    },
  });

  // Formik para senha
  const passwordFormik = useFormik({
    initialValues: {
      senhaAtual: "",
      novaSenha: "",
      confirmarNovaSenha: "",
    },
    validationSchema: alreadyHasPassword
      ? passwordValidationSchema
      : passwordValidationGoogleSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        console.log("Atualizando senha:", {
          senhaAtual: values.senhaAtual,
          novaSenha: values.novaSenha,
        });
        if (alreadyHasPassword) {
          await changePassword(user.id, {
            senhaAtual: values.senhaAtual,
            novaSenha: values.novaSenha,
          });
        } else {
          await enablePassword(values.novaSenha);
        }
        resetForm();
      } catch (error) {
        console.error("Erro ao atualizar senha:", error);
        alert("Erro ao atualizar senha!");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <div className="flex flex-col gap-6">
        <PageTitle>Sua conta</PageTitle>

        <Accordion
          title="Informações da conta"
          description="Altere suas informações pessoais, como nome, e-mail e usuário."
        >
          <form onSubmit={generalDataFormik.handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              <Input
                label="Nome"
                name="nome"
                type="text"
                placeholder="Digite seu nome"
                value={generalDataFormik.values.nome}
                onChange={generalDataFormik.handleChange}
                onBlur={generalDataFormik.handleBlur}
                error={
                  generalDataFormik.touched.nome &&
                  generalDataFormik.errors.nome
                    ? generalDataFormik.errors.nome
                    : ""
                }
              />
              <Input
                label="Sobrenome"
                name="sobrenome"
                type="text"
                placeholder="Digite seu sobrenome"
                value={generalDataFormik.values.sobrenome}
                onChange={generalDataFormik.handleChange}
                onBlur={generalDataFormik.handleBlur}
                error={
                  generalDataFormik.touched.sobrenome &&
                  generalDataFormik.errors.sobrenome
                    ? generalDataFormik.errors.sobrenome
                    : ""
                }
              />
              <Input
                label="E-mail"
                name="email"
                type="email"
                placeholder="Digite seu e-mail"
                value={generalDataFormik.values.email}
                onChange={generalDataFormik.handleChange}
                onBlur={generalDataFormik.handleBlur}
                error={
                  generalDataFormik.touched.email &&
                  generalDataFormik.errors.email
                    ? generalDataFormik.errors.email
                    : ""
                }
              />
              <Input
                label="Usuário"
                name="usuario"
                type="text"
                placeholder="Digite seu usuário"
                prefix="@"
                value={generalDataFormik.values.usuario}
                onChange={generalDataFormik.handleChange}
                onBlur={generalDataFormik.handleBlur}
                error={
                  generalDataFormik.touched.usuario &&
                  generalDataFormik.errors.usuario
                    ? generalDataFormik.errors.usuario
                    : ""
                }
              />
            </div>
            <div className="mt-6">
              <Button
                text={
                  generalDataFormik.isSubmitting
                    ? "Salvando..."
                    : "Alterar dados"
                }
                variant="primary"
                type="submit"
                disabled={generalDataFormik.isSubmitting}
              />
            </div>
          </form>
        </Accordion>

        <Accordion
          title="Senha de acesso"
          description="Altere sua senha de acesso."
        >
          <form onSubmit={passwordFormik.handleSubmit}>
            <div className="grid grid-cols-2 gap-6">
              {alreadyHasPassword && (
                <Input
                  label="Senha atual"
                  name="senhaAtual"
                  type="password"
                  showPasswordToggle
                  placeholder="Digite sua senha atual"
                  value={passwordFormik.values.senhaAtual}
                  onChange={passwordFormik.handleChange}
                  onBlur={passwordFormik.handleBlur}
                  error={
                    passwordFormik.touched.senhaAtual &&
                    passwordFormik.errors.senhaAtual
                      ? passwordFormik.errors.senhaAtual
                      : ""
                  }
                />
              )}
              <Input
                label="Nova senha"
                name="novaSenha"
                type="password"
                showPasswordToggle
                placeholder="Digite sua nova senha"
                value={passwordFormik.values.novaSenha}
                onChange={passwordFormik.handleChange}
                onBlur={passwordFormik.handleBlur}
                error={
                  passwordFormik.touched.novaSenha &&
                  passwordFormik.errors.novaSenha
                    ? passwordFormik.errors.novaSenha
                    : ""
                }
              />
              <Input
                label="Confirmar nova senha"
                name="confirmarNovaSenha"
                type="password"
                placeholder="Confirme sua nova senha"
                showPasswordToggle
                value={passwordFormik.values.confirmarNovaSenha}
                onChange={passwordFormik.handleChange}
                onBlur={passwordFormik.handleBlur}
                error={
                  passwordFormik.touched.confirmarNovaSenha &&
                  passwordFormik.errors.confirmarNovaSenha
                    ? passwordFormik.errors.confirmarNovaSenha
                    : ""
                }
              />
            </div>
            <div className="mt-6">
              <Button
                text={
                  passwordFormik.isSubmitting ? "Alterando..." : "Alterar senha"
                }
                variant="primary"
                type="submit"
                disabled={passwordFormik.isSubmitting}
              />
            </div>
          </form>
        </Accordion>
      </div>
    </>
  );
}
