import { Questao } from "../app/types/question";
import { api } from "./api";

interface PaginatedResponse<T> {
  questoes: T[];
  pagination: {
    hasNext: boolean;
    hasPrev: boolean;
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  success: boolean;
}

interface getQuestionByIdResponse<T> {
  data: T;
  success: boolean;
}

interface QuestionFilters {
  page?: number;
  limit?: number;
  ano?: string;
  prova?: string;
  aplicacao?: string;
  dificuldadeMin?: number;
  dificuldadeMax?: number;
  habilidadeId?: string;
  competenciaId?: string;
  areaId?: string;
  temImagem?: boolean;
}

const buildQueryString = (filters: QuestionFilters): string => {
  const params = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, value.toString());
    }
  });
  
  return params.toString();
};

export const getQuestions = async (
  filters: QuestionFilters = { page: 1, limit: 10 }
): Promise<PaginatedResponse<Questao>> => {
  try {
    const queryString = buildQueryString(filters);
    const response = await api.get(`/questions?${queryString}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching questions:", error);
    throw error;
  }
};

export const getQuestionById = async (id: string): Promise<getQuestionByIdResponse<Questao>> => {
  try {
    const response = await api.get(`/questions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching question by ID:", error);
    throw error;
  }
};

export const getAvailableYears = async () => {
  try {
    const response = await api.get('/questions/years');
    return response.data;
  } catch (error) {
    console.error("Error fetching available years:", error);
    throw error;
  }
};

export const getAvailableProvas = async () => {
  try {
    const response = await api.get('/exam/provas');
    return response.data;
  } catch (error) {
    console.error("Error fetching available provas:", error);
    throw error;
  }
};

export const getAllAreas = async () => {
  try {
    const response = await api.get('/exam/areas');
    return response.data;
  } catch (error) {
    console.error("Error fetching all areas:", error);
    throw error;
  }
};

export const getAllCompetencias = async () => {
  try {
    const response = await api.get('/exam/competencias');
    return response.data;
  } catch (error) {
    console.error("Error fetching all competencias:", error);
    throw error;
  }
};

export const getAllHabilidades = async () => {
  try {
    const response = await api.get('/exam/habilidades');
    return response.data;
  } catch (error) {
    console.error("Error fetching all habilidades:", error);
    throw error;
  }
};

export const getAvailableAplicacoes = async () => {
  try {
    const response = await api.get('/questions/aplicacoes');
    return response.data;
  } catch (error) {
    console.error("Error fetching available aplicacoes:", error);
    throw error;
  }
};
