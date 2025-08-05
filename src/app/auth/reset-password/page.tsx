"use client";
import { Button } from "@/app/components/form/Button";
import { HelperMessage } from "@/app/components/form/HelperMessage";
import { Input } from "@/app/components/form/Input";
import { TokenInput } from "@/app/components/form/TokenInput";
import { Container } from "@/app/components/layout/Container";
import { Logo } from "@/app/components/layout/Logo";
import { useErrorHandler } from "@/utils/errorHandler";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object({
  token: Yup.string()
    .required("Código de verificação é obrigatório")
    .length(6, "Código deve ter 6 dígitos"),
  password: Yup.string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .required("Senha é obrigatória"),
  confirmPassword: Yup.string()
    .required("Confirmação de senha é obrigatória")
    .oneOf([Yup.ref("password")], "Senhas devem ser iguais"),
});

export default function ResetPassword() {
  const { handleError, applyValidationErrors } = useErrorHandler();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      token: "",
      password: "",
      confirmPassword: "",
    },
    validateOnBlur: false,
    validateOnMount: false,
    validateOnChange: false,
    validationSchema,
    onSubmit: async (values) => {
      setServerError(null);
      setIsSubmitting(true);

      try {
        const response = await fetch("/api/users/reset-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: values.token,
            novaSenha: values.password,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Erro ao resetar senha");
        }

        // Sucesso - redirecionar para login
        window.location.href = "/auth/login?message=Senha alterada com sucesso";
      } catch (error: any) {
        const { isValidationError, validationErrors, message } =
          handleError(error);

        if (isValidationError && validationErrors.length > 0) {
          applyValidationErrors(formik, validationErrors);
          setServerError(null);
        } else {
          setServerError(message);
        }
      } finally {
        setIsSubmitting(false);
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
                Altere sua senha
              </h6>
            </div>
            <div className="w-full p-6 flex flex-col gap-6">
              <HelperMessage message={serverError} showIcon variant="error" />
              <div className="">
                <h6 className="font-head text-body16 font-semibold text-black-custom">
                  Entre com sua nova senha
                </h6>
                <form
                  onSubmit={formik.handleSubmit}
                  className=" flex flex-col gap-6 mt-6"
                  action=""
                >
                  <div className="flex flex-col gap-4">
                    <div className="w-full">
                      <TokenInput
                        label="Código de Verificação"
                        value={formik.values.token}
                        onChange={(value) =>
                          formik.setFieldValue("token", value)
                        }
                        error={
                          formik.touched.token ? formik.errors.token : undefined
                        }
                        disabled={isSubmitting}
                      />
                    </div>

                    <Input
                      label="Nova Senha"
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
                      disabled={isSubmitting}
                    />

                    <Input
                      label="Confirmação de Senha"
                      type="password"
                      id="confirmPassword"
                      placeholder="********"
                      showPasswordToggle
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.confirmPassword
                          ? formik.errors.confirmPassword
                          : undefined
                      }
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="flex items-center gap-6">
                    <Button
                      type="submit"
                      text={isSubmitting ? "Alterando..." : "Alterar senha"}
                      variant="primary"
                      fullWidth
                      disabled={isSubmitting}
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
