"use client";
import { AUTH_MAINTENANCE_ENABLED } from "@/config/maintenance";
import { useAuth } from "@/context/useAuth";
import { GoogleLogin } from "@react-oauth/google";

interface GoogleButtonProps {
  onMaintenance?: () => void;
  text?:
    | "signin"
    | "signin_with"
    | "signup_with"
    | "continue_with"
    | undefined;
}

const GoogleButton = ({ text = 'continue_with', onMaintenance }: GoogleButtonProps) => {
  const { authGoogle } = useAuth();

  return (
    <div
      inert={AUTH_MAINTENANCE_ENABLED}
      aria-disabled={AUTH_MAINTENANCE_ENABLED || undefined}
      className={AUTH_MAINTENANCE_ENABLED ? "cursor-not-allowed opacity-50" : undefined}
    >
    <GoogleLogin
      text={text}
      onSuccess={(credentialResponse) => {
        if (AUTH_MAINTENANCE_ENABLED) {
          onMaintenance?.();
          return;
        }
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
    </div>
  );
};

export { GoogleButton };
