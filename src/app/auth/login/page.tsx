"use client";
import { Button } from "@/app/components/form/Button";
import { Input } from "@/app/components/form/Input";
import { LinkButton } from "@/app/components/form/LinkButton";
import { Container } from "@/app/components/layout/Container";
import { Logo } from "@/app/components/layout/Logo";
import { useAuth } from "@/context/useAuth";
import { GoogleLogin } from "@react-oauth/google";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  login: Yup.string().required("E-mail ou usuário é obrigatório"),
  password: Yup.string()
    .min(6, "Senha deve ter pelo menos 8 caracteres")
    .required("Senha é obrigatória"),
});

export default function Login() {
  const { login, loginGoogle } = useAuth();
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
      console.log("Login values:", values);
      await login({
        login: values.login,
        senha: values.password,
      });
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
            <div className="w-full p-6">
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
              <div className="mt-6 flex items-center gap-4">
                <div className="w-full h-[1px] bg-gray-200-custom"></div>
                <span className="px-6 font-body font-normal text-sm12 text-gray-400-custom">
                  ou
                </span>
                <div className="w-full h-[1px] bg-gray-200-custom"></div>
              </div>
              <div className="mt-6">
                <h6 className="font-head text-body16 font-semibold text-black-custom ">
                  Faça seu login com Google
                </h6>
                <div className="mt-6">
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      console.log(
                        "Token do Google:",
                        credentialResponse.credential
                      );
                      if (!credentialResponse.credential) {
                        console.error("Nenhum token recebido do Google");
                        return;
                      }
                      loginGoogle(credentialResponse.credential);
                    }}
                    onError={() => {
                      console.log("Erro no login");
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
