"use client";
import { Button } from "@/app/components/form/Button";
import { GoogleButton } from "@/app/components/form/GoogleButton";
import { HelperMessage } from "@/app/components/form/HelperMessage";
import { Input } from "@/app/components/form/Input";
import { LinkButton } from "@/app/components/form/LinkButton";
import { Container } from "@/app/components/layout/Container";
import { Logo } from "@/app/components/layout/Logo";
import { AUTH_MAINTENANCE_ENABLED, AUTH_MAINTENANCE_MESSAGE } from "@/config/maintenance";
import { useAuth } from "@/context/useAuth";
import { useErrorHandler } from "@/utils/errorHandler";
import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object({
  login: Yup.string().required("E-mail ou usuário é obrigatório"),
  password: Yup.string()
    .min(6, "Senha deve ter pelo menos 8 caracteres")
    .required("Senha é obrigatória"),
});

export default function Login() {
  const { login } = useAuth();
  const { handleError, applyValidationErrors } = useErrorHandler();
  const [serverError, setServerError] = useState<string | null>(null);
  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validateOnBlur: false,
    validateOnMount: false,
    validateOnChange: false,
    validationSchema,
    onSubmit: async (values) => {
      setServerError(null);
      if (AUTH_MAINTENANCE_ENABLED) {
        formik.setFieldError("login", AUTH_MAINTENANCE_MESSAGE);
        return;
      }
      try {
        await login({
          login: values.login,
          senha: values.password,
        });
      } catch (error) {
        const { isValidationError, validationErrors, message } =
          handleError(error);

        if (isValidationError && validationErrors.length > 0) {
          applyValidationErrors(formik, validationErrors);
          setServerError(null);
        } else {
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
                Bem-vindo, <b>faça seu login</b>
              </h6>
            </div>
            <div className="w-full p-6 flex flex-col gap-6">
              <HelperMessage message={serverError} showIcon variant="error" />
              <div className="">
                <h6 className="font-head text-body16 font-semibold text-black-custom font-normal">
                  Entre com e-mail/usuário e senha
                </h6>
                <form
                  onSubmit={formik.handleSubmit}
                  className=" flex flex-col gap-6 mt-6"
                  action=""
                >
                  <div className="flex flex-col gap-3">
                    <Input
                      label="E-mail/Usuário"
                      type="text"
                      id="login"
                      placeholder="Digite seu e-mail ou usuário"
                      value={formik.values.login}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.login ? formik.errors.login : undefined
                      }
                    />
                    <div>
                      <Input
                        label="Senha"
                        type="password"
                        id="password"
                        placeholder="********"
                        showPasswordToggle
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.password
                            ? formik.errors.password
                            : undefined
                        }
                      />
                      <div className="mt-2">
                        <Link
                          href={"/auth/forgot-password"}
                          className="font-button text-button16 font-semibold hover:underline text-blue-primary hover:text-blue-primary-dark transition-all"
                        >
                          Esqueci minha senha
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <LinkButton
                      text="Cadastrar-se"
                      variant="secondary"
                      fullWidth
                      href="/auth/signup"
                    />
                    <Button
                      type="submit"
                      text="Entrar"
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
                  <GoogleButton onMaintenance={() => {
                    void formik.setFieldTouched("login", true, false);
                    formik.setFieldError("login", AUTH_MAINTENANCE_MESSAGE);
                  }} text="signin_with" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
