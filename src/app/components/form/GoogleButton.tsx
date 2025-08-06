"use client";
import { useAuth } from "@/context/useAuth";
import { GoogleLogin } from "@react-oauth/google";

interface GoogleButtonProps {
  text?:
    | "signin"
    | "signin_with"
    | "signup_with"
    | "continue_with"
    | undefined;
}

const GoogleButton = ({ text = 'continue_with' }: GoogleButtonProps) => {
  const { authGoogle } = useAuth();

  return (
    <GoogleLogin
      text={text}
      onSuccess={(credentialResponse) => {
        console.log("Token do Google:", credentialResponse.credential);
        if (!credentialResponse.credential) {
          console.error("Nenhum token recebido do Google");
          return;
        }
        authGoogle(credentialResponse.credential);
      }}
      onError={() => {
        console.log("Erro no login");
      }}
    />
  );
};

export { GoogleButton };
