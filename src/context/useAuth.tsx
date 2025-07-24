"use client";
import {
  getAuthToken,
  removeAuthToken,
  saveAuthToken,
} from "@/config/localStorage";
import { api } from "@/server/api";
import {
  getMyProfile,
  googleLogin,
  LoginData,
  login as loginRequest,
  SignupData,
  signup as signupRequest,
} from "@/server/userRequests";
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
  dataNascimento: string;
  signUpProvider: string;
  isPasswordEnabled: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (data: LoginData) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  loginGoogle: (token: string) => Promise<void>;
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
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: SignupData): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await signupRequest(data);

      if (response.success) {
       // redirect("/auth/login");
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginGoogle = async (token: string): Promise<void> => {
    try {
      const response = await googleLogin({ token });
      console.log("Login com Google:", response);
      if (response.success) {
        setUser(response.data.user);
        saveAuthToken(response.data.token);
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.token}`;
      }
    } catch (error) {
      console.error("Erro ao fazer login com Google:", error);
    }
  };

  const logout = () => {
    setUser(null);
    removeAuthToken();
  };

  const getProfile = async (): Promise<void> => {
    try {
      const response = await getMyProfile();
      if (response.success) {
        console.log("dados persistidos:", response.data);
        setUser(response.data);
      } else {
        logout();
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
    loginGoogle,
  };

  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      getProfile();
    }
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
