import { api } from "./api";
import { ErrorHandler } from "@/utils/errorHandler";

// Interfaces para os dados de entrada
export interface SignupData {
  nome: string;
  sobrenome: string;
  email: string;
  usuario: string;
  senha: string;
  telefone?: string;
  dataNascimento: string; // formato ISO string
}

export interface LoginData {
  login: string; // email ou usuário
  senha: string;
}

export interface GoogleAuthData {
  token: string;
}

// Interfaces para as respostas
export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: {
      id: string;
      nome: string;
      sobrenome: string;
      email: string;
      usuario: string;
      telefone?: string;
      avatar?: string;
      dataNascimento: string | null;
      signUpProvider: string;
      isPasswordEnabled: boolean;
    };
    token: string;
    expiresIn: string;
    isNewUser?: boolean;
  };
  code?: string;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  error?: string;
}

// Requisições de autenticação
export const signup = async (data: SignupData): Promise<AuthResponse> => {
  try {
    const response = await api.post("/users/signup", data);
    return response.data;
  } catch (error: any) {
    console.error("Error during signup:", error);
    throw ErrorHandler.fromApiResponse(error);
  }
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  try {
    const response = await api.post("/users/login", data);
    return response.data;
  } catch (error: any) {
    console.error("Error during login:", error);
    throw ErrorHandler.fromApiResponse(error);
  }
};

export const googleAuth = async (
  data: GoogleAuthData
): Promise<AuthResponse> => {
  try {
    const response = await api.post("/users/google/auth", data);
    return response.data;
  } catch (error: any) {
    console.error("Error during Google auth:", error);
    throw ErrorHandler.fromApiResponse(error);
  }
};

export const getMyProfile = async (): Promise<{
  success: boolean;
  data: any;
}> => {
  try {
    const response = await api.get("/users/profile");
    return response.data;
  } catch (error: any) {
    console.error("Error fetching profile:", error);
    throw ErrorHandler.fromApiResponse(error);
  }
};

export const enablePassword = async (
  novaSenha: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await api.post("/users/enable-password", { novaSenha });
    return response.data;
  } catch (error: any) {
    console.error("Error enabling password:", error);
    throw ErrorHandler.fromApiResponse(error);
  }
};
