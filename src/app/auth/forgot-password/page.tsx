"use client";
import { Button } from "@/app/components/form/Button";
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
  login: Yup.string().required("E-mail ou usuário é obrigatório"),
  password: Yup.string()
    .min(6, "Senha deve ter pelo menos 8 caracteres")
    .required("Senha é obrigatória"),
});

export default function ForgotPassword() {
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
      try {
        await login({
          login: values.login,
          senha: values.password,
        });
      } catch (error: any) {
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
                Recupere sua senha
              </h6>
            </div>
            <div className="w-full p-6 flex flex-col gap-6">
              <HelperMessage message={serverError} showIcon variant="error" />
              <div className="">
                <h6 className="font-head text-body16 font-semibold text-black-custom">
                  Entre com seu e-mail cadastrado
                </h6>
                <form
                  onSubmit={formik.handleSubmit}
                  className=" flex flex-col gap-6 mt-6"
                  action=""
                >
                  <div className="flex flex-col gap-3">
                    <Input
                      label="E-mail"
                      type="email"
                      id="login"
                      placeholder="Digite seu e-mail"
                      value={formik.values.login}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.login ? formik.errors.login : undefined
                      }
                    />
                  </div>
                  <div className="flex items-center gap-6">
                    <LinkButton
                      text="Voltar"
                      variant="secondary"
                      fullWidth
                      href="/auth/login"
                    />
                    <Button
                      type="submit"
                      text="Recuperar"
                      variant="primary"
                      fullWidth
                    />
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
