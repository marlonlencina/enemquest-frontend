import { api } from "./api";

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

export interface GoogleLoginData {
  token: string;
}

export interface GoogleSignupData {
  token: string;
  usuario: string;
  telefone?: string;
  dataNascimento: string;
  avatar?: string;
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
      dataNascimento: string;
      signUpProvider: string;
      isPasswordEnabled: boolean;
    };
    token: string;
    expiresIn: string;
  };
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
    throw error.response?.data || { message: "Erro ao fazer cadastro" };
  }
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  try {
    const response = await api.post("/users/login", data);
    return response.data;
  } catch (error: any) {
    console.error("Error during login:", error);
    throw error.response?.data || { message: "Erro ao fazer login" };
  }
};

export const googleLogin = async (
  data: GoogleLoginData
): Promise<AuthResponse> => {
  try {
    const response = await api.post("/users/google/login", data);
    return response.data;
  } catch (error: any) {
    console.error("Error during Google login:", error);
    throw error.response?.data || { message: "Erro ao fazer login com Google" };
  }
};

export const googleSignup = async (
  data: GoogleSignupData
): Promise<AuthResponse> => {
  try {
    const response = await api.post("/users/google/signup", data);
    return response.data;
  } catch (error: any) {
    console.error("Error during Google signup:", error);
    throw (
      error.response?.data || { message: "Erro ao fazer cadastro com Google" }
    );
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
    throw error.response?.data || { message: "Erro ao buscar perfil" };
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
    throw error.response?.data || { message: "Erro ao definir senha" };
  }
};
