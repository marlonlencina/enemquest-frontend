"use client";
import { AuthCard } from "@/app/components/auth/AuthCard";
import { Button } from "@/app/components/form/Button";
import { Input } from "@/app/components/form/Input";
import { LinkButton } from "@/app/components/form/LinkButton";
import { Container } from "@/app/components/layout/Container";
import { Logo } from "@/app/components/layout/Logo";
import { AUTH_MAINTENANCE_ENABLED } from "@/config/maintenance";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  login: Yup.string().email("Informe um e-mail válido").required("E-mail é obrigatório"),
});

export default function ForgotPassword() {
  const formik = useFormik({
    initialValues: { login: "" },
    validateOnBlur: false,
    validateOnMount: false,
    validateOnChange: false,
    validationSchema,
    onSubmit: (_values, { setFieldError }) => {
      setFieldError(
        "login",
        AUTH_MAINTENANCE_ENABLED
          ? "Estamos em manutenção. A recuperação de senha está temporariamente indisponível. Tente novamente mais tarde."
          : "A recuperação de senha está indisponível. Entre em contato com suporte@enemquest.com.br."
      );
    },
  });
  return (
    <div className="auth-grid-background w-full">
      <Container>
        <div className="flex items-center justify-center w-full py-12 flex-1 px-6 min-h-screen">
          <AuthCard>
            <div className="auth-card-heading bg-blue-primary-dark p-6">
              <Logo height={36} />
              <h6 className="font-head text-head24 text-white-custom font-normal mt-4">
                Recupere sua senha
              </h6>
            </div>
            <div className="auth-card-content w-full p-6 flex flex-col gap-6">
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
          </AuthCard>
        </div>
      </Container>
    </div>
  );
}
