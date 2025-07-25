"use client";
import {
  getAuthToken,
  removeAuthToken,
  saveAuthToken,
} from "@/config/localStorage";
import { api } from "@/server/api";
import {
  getMyProfile,
  googleAuth,
  LoginData,
  login as loginRequest,
  SignupData,
  signup as signupRequest,
} from "@/server/userRequests";
import { useErrorHandler } from "@/utils/errorHandler";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface User {
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
  usuario: string;
  telefone?: string;
  avatar?: string;
  dataNascimento?: string | null;
  signUpProvider: string;
  isPasswordEnabled: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (data: LoginData) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  authGoogle: (token: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { handleError } = useErrorHandler();

  const login = async (data: LoginData): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await loginRequest(data);

      if (response.success) {
        setUser(response.data.user);
        saveAuthToken(response.data.token);
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        router.push("/dashboard");
      }
    } catch (error) {
      const { error: apiError, requiresLogout } = handleError(error);

      if (requiresLogout) {
        logout();
      }

      throw apiError;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: SignupData): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await signupRequest(data);
      if (response.success) {
        router.push("/auth/login");
      }
    } catch (error) {
      const { error: apiError } = handleError(error);
      throw apiError;
    } finally {
      setIsLoading(false);
    }
  };

  const authGoogle = async (token: string): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await googleAuth({ token });
      console.log("Login com Google:", response);
      if (response.success) {
        setUser(response.data.user);
        saveAuthToken(response.data.token);
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Erro ao fazer login com Google:", error);
      const { error: apiError, requiresLogout } = handleError(error);

      if (requiresLogout) {
        logout();
      }

      throw apiError;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    removeAuthToken();
    router.push("/auth/login");
    api.defaults.headers.common["Authorization"] = "";
    console.log("Usuário deslogado com sucesso");
  };

  const getProfile = async (): Promise<void> => {
    try {
      const response = await getMyProfile();
      if (response.success) {
        setUser(response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar perfil:", error);
    }
  };

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    isLoading,
    isAuthenticated: !!user,
    authGoogle,
  };

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      getProfile();
    }
  }, []);

   useEffect(() => {
    const handleAuthLogout = () => {
      logout()
    };

    // Escutar evento customizado disparado pelo interceptor
    if (typeof window !== 'undefined') {
      window.addEventListener('auth:logout', handleAuthLogout);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('auth:logout', handleAuthLogout);
      }
    };
  }, [router]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
