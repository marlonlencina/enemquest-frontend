import { List, ListStats } from "@/types/list";
import { api } from "./api";

// Interfaces para tipos de dados

export interface UserStats {
  totalQuestoesRespondidas: number;
  totalListasPendentes: number;
  totalListasFinalizadas: number;
}

// Interfaces para dados de entrada
export interface CreateListData {
  nome: string;
  status?: string;
}

export interface UpdateListData {
  nome?: string;
  status?: string;
}

export interface AddQuestionToListData {
  questaoId: string;
  ordem?: number;
}

export interface UpdateQuestionProgressData {
  acertou?: boolean | null; // Permitir null aqui
  alternativaSelecionada?: string | null; // Permitir null aqui também
}

export interface UpdateMultipleQuestionProgressData {
  questoes: {
    questaoId: string;
    acertou?: boolean | null; // Permitir null aqui
    alternativaSelecionada?: string | null; // Permitir null aqui também
  }[];
}

export interface ReorderQuestionsData {
  questionOrders: {
    questaoId: string;
    ordem: number;
  }[];
}

export interface GenerateQuestionsData {
  quantidadeStrategy: "total" | "por_area" | "especifica_por_area";
  quantidadeTotal?: number;
  quantidadePorArea?: number;
  quantidadesPorArea?: Record<string, number>;
  areas: string[];
  competencias?: string[];
  habilidades?: string[];
  pularQuestoesResolvidas: boolean;
  pularQuestoesEmOutrasListas: boolean;
  pularQuestoesAcertadas: boolean;
  pularQuestoesErradas: boolean;
}

export interface GenerateQuestionsResult {
  questoesAdicionadas: number;
  detalhePorArea: Record<string, number>;
}

// Interfaces para respostas da API
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
}

// Requisições CRUD básicas
export const createList = async (
  data: CreateListData
): Promise<ApiResponse<List>> => {
  try {
    const response = await api.post("/lists", data);
    return response.data;
  } catch (error: any) {
    console.error("Error creating list:", error);
    throw error.response?.data || { message: "Erro ao criar lista" };
  }
};

export const getMyLists = async (): Promise<ApiResponse<List[]>> => {
  try {
    const response = await api.get("/lists/my-lists");
    return response.data;
  } catch (error: any) {
    console.error("Error fetching my lists:", error);
    throw error.response?.data || { message: "Erro ao buscar listas" };
  }
};

export const getListById = async (id: string): Promise<ApiResponse<List>> => {
  try {
    const response = await api.get(`/lists/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching list by ID:", error);
    throw error.response?.data || { message: "Erro ao buscar lista" };
  }
};

export const updateList = async (
  id: string,
  data: UpdateListData
): Promise<ApiResponse<List>> => {
  try {
    const response = await api.put(`/lists/${id}`, data);
    return response.data;
  } catch (error: any) {
    console.error("Error updating list:", error);
    throw error.response?.data || { message: "Erro ao atualizar lista" };
  }
};

export const deleteList = async (id: string): Promise<ApiResponse<void>> => {
  try {
    const response = await api.delete(`/lists/${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Error deleting list:", error);
    throw error.response?.data || { message: "Erro ao deletar lista" };
  }
};

// Requisições para gerenciamento de questões
export const addQuestionToList = async (
  listId: string,
  data: AddQuestionToListData
): Promise<ApiResponse<void>> => {
  try {
    const response = await api.post(`/lists/${listId}/questions`, data);
    return response.data;
  } catch (error: any) {
    console.error("Error adding question to list:", error);
    throw (
      error.response?.data || { message: "Erro ao adicionar questão à lista" }
    );
  }
};

export const removeQuestionFromList = async (
  listId: string,
  questaoId: string
): Promise<ApiResponse<void>> => {
  try {
    const response = await api.delete(
      `/lists/${listId}/questions/${questaoId}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Error removing question from list:", error);
    throw (
      error.response?.data || { message: "Erro ao remover questão da lista" }
    );
  }
};

export const updateQuestionProgress = async (
  listId: string,
  questaoId: string,
  data: UpdateQuestionProgressData
): Promise<ApiResponse<void>> => {
  try {
    const response = await api.patch(
      `/lists/${listId}/questions/${questaoId}/progress`,
      data
    );
    return response.data;
  } catch (error: any) {
    console.error("Error updating question progress:", error);
    throw (
      error.response?.data || {
        message: "Erro ao atualizar progresso da questão",
      }
    );
  }
};

export const updateMultipleQuestionProgress = async (
  listId: string,
  data: UpdateMultipleQuestionProgressData
): Promise<ApiResponse<void>> => {
  try {
    const response = await api.patch(`/lists/${listId}/progress`, data);
    return response.data;
  } catch (error: any) {
    console.error("Error updating multiple question progress:", error);
    throw (
      error.response?.data || {
        message: "Erro ao atualizar progresso das questões",
      }
    );
  }
};

export const reorderQuestions = async (
  listId: string,
  data: ReorderQuestionsData
): Promise<ApiResponse<void>> => {
  try {
    const response = await api.patch(`/lists/${listId}/reorder`, data);
    return response.data;
  } catch (error: any) {
    console.error("Error reordering questions:", error);
    throw error.response?.data || { message: "Erro ao reordenar questões" };
  }
};

// Requisições para geração de questões
export const generateQuestionsForList = async (
  listId: string,
  data: GenerateQuestionsData
): Promise<ApiResponse<GenerateQuestionsResult>> => {
  try {
    const response = await api.post(
      `/lists/${listId}/generate-questions`,
      data
    );
    return response.data;
  } catch (error: any) {
    console.error("Error generating questions for list:", error);
    throw error.response?.data || { message: "Erro ao gerar questões" };
  }
};

// Requisições para estatísticas
export const getListStats = async (
  listId: string
): Promise<ApiResponse<ListStats>> => {
  try {
    const response = await api.get(`/lists/${listId}/stats`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching list stats:", error);
    throw (
      error.response?.data || {
        message: "Erro ao buscar estatísticas da lista",
      }
    );
  }
};

export const getUserStats = async (): Promise<ApiResponse<UserStats>> => {
  try {
    const response = await api.get("/lists/user/stats");
    return response.data;
  } catch (error: any) {
    console.error("Error fetching user stats:", error);
    throw (
      error.response?.data || {
        message: "Erro ao buscar estatísticas do usuário",
      }
    );
  }
};

// Funções auxiliares
export const markQuestionAsCorrect = async (
  listId: string,
  questaoId: string,
  alternativaSelecionada: string
): Promise<ApiResponse<void>> => {
  return updateQuestionProgress(listId, questaoId, {
    acertou: true,
    alternativaSelecionada,
  });
};

export const markQuestionAsIncorrect = async (
  listId: string,
  questaoId: string,
  alternativaSelecionada: string
): Promise<ApiResponse<void>> => {
  return updateQuestionProgress(listId, questaoId, {
    acertou: false,
    alternativaSelecionada,
  });
};

export const markQuestionAsUnanswered = async (
  listId: string,
  questaoId: string
): Promise<ApiResponse<void>> => {
  return updateQuestionProgress(listId, questaoId, {
    acertou: null, // Agora funciona
    alternativaSelecionada: null, // Agora funciona
  });
};

export const submitQuizResults = async (
  listId: string,
  results: {
    questaoId: string;
    alternativaSelecionada: string;
    gabarito: string;
  }[]
): Promise<ApiResponse<void>> => {
  const questoes = results.map((result) => ({
    questaoId: result.questaoId,
    acertou: result.alternativaSelecionada === result.gabarito,
    alternativaSelecionada: result.alternativaSelecionada,
  }));

  return updateMultipleQuestionProgress(listId, { questoes });
};
