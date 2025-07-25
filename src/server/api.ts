import { getAuthToken, removeAuthToken } from "@/config/localStorage";
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002",
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas e erros de auth
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("API Error:", error.response?.data);
    
    // Verificar se é erro de token expirado/inválido
    if (error.response?.status === 401) {
      const errorCode = error.response.data?.code;
      
      // Códigos que indicam token inválido/expirado
      if (errorCode === 'AUTH_102') {
        console.log('Token expirado ou inválido, fazendo logout...');
        
        // Limpar token do localStorage
        removeAuthToken();
        
        // Disparar evento customizado para notificar o contexto
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('auth:logout'));
        }
      }
    }
    
    return Promise.reject(error);
  }
);