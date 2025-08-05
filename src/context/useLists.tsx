"use client";
import {
  createList,
  CreateListData,
  deleteList,
  getMyLists,
  getUserStats,
  updateList,
  UpdateListData,
  UserStats,
} from "@/server/listRequests";
import { List } from "@/types/list";
import { useErrorHandler } from "@/utils/errorHandler";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./useAuth";

interface ListsContextType {
  // Estado
  lists: List[];
  userStats: UserStats | null;
  isLoadingLists: boolean;
  isLoadingStats: boolean;

  // Ações para listas
  fetchLists: () => Promise<void>;
  createNewList: (data: CreateListData) => Promise<List | null>;
  updateExistingList: (
    id: string,
    data: UpdateListData
  ) => Promise<List | null>;
  deleteExistingList: (id: string) => Promise<void>;

  // Ações para estatísticas
  fetchUserStats: () => Promise<void>;

  // Utilitários
  refreshListsAndStats: () => Promise<void>;
  getListById: (id: string) => List | undefined;
  getListsByStatus: (status: string) => List[];
}

const ListsContext = createContext<ListsContextType | undefined>(undefined);

interface ListsProviderProps {
  children: ReactNode;
}

export function ListsProvider({ children }: ListsProviderProps) {
  const [lists, setLists] = useState<List[]>([]);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [isLoadingLists, setIsLoadingLists] = useState(false);
  const [isLoadingStats, setIsLoadingStats] = useState(false);

  const { handleError } = useErrorHandler();
  const { isAuthenticated, user } = useAuth();

  // Buscar listas do usuário
  const fetchLists = useCallback(async () => {
    setIsLoadingLists(true);
    try {
      const response = await getMyLists();
      if (response.success && response.data) {
        setLists(response.data);
      }
    } catch (error) {
      handleError(error);
      setLists([]);
    } finally {
      setIsLoadingLists(false);
    }
  }, [handleError]);

  // Buscar estatísticas do usuário
  const fetchUserStats = useCallback(async () => {
    setIsLoadingStats(true);
    try {
      const response = await getUserStats();
      if (response.success && response.data) {
        setUserStats(response.data);
      }
    } catch (error) {
      handleError(error);
      setUserStats(null);
    } finally {
      setIsLoadingStats(false);
    }
  }, [handleError]);

  // Criar nova lista
  const createNewList = useCallback(
    async (data: CreateListData): Promise<List | null> => {
      try {
        const response = await createList(data);
        if (response.success && response.data) {
          setLists((prevLists) => [...prevLists, response.data!]);
          // Atualizar estatísticas após criar lista
          await fetchUserStats();
          return response.data;
        }
        return null;
      } catch (error) {
        handleError(error);
        return null;
      }
    },
    [handleError, fetchUserStats]
  );

  // Atualizar lista existente
  const updateExistingList = useCallback(
    async (id: string, data: UpdateListData): Promise<List | null> => {
      try {
        const response = await updateList(id, data);
        if (response.success && response.data) {
          setLists((prevLists) =>
            prevLists.map((list) =>
              list.id === id ? { ...list, ...response.data } : list
            )
          );
          // Atualizar estatísticas se o status mudou
          if (data.status) {
            await fetchUserStats();
          }
          return response.data;
        }
        return null;
      } catch (error) {
        handleError(error);
        return null;
      }
    },
    [handleError, fetchUserStats]
  );

  // Deletar lista
  const deleteExistingList = useCallback(
    async (id: string): Promise<void> => {
      try {
        const response = await deleteList(id);
        if (response.success) {
          setLists((prevLists) => prevLists.filter((list) => list.id !== id));
          // Atualizar estatísticas após deletar lista
          await fetchUserStats();
        }
      } catch (error) {
        handleError(error);
      }
    },
    [handleError, fetchUserStats]
  );

  // Limpar estado (usado no logout)
  const clearListsState = useCallback(() => {
    setLists([]);
    setUserStats(null);
    setIsLoadingLists(false);
    setIsLoadingStats(false);
  }, []);

  // Atualizar listas e estatísticas
  const refreshListsAndStats = useCallback(async () => {
    await Promise.all([fetchLists(), fetchUserStats()]);
  }, [fetchLists, fetchUserStats]);

  // Utilitários
  const getListById = useCallback(
    (id: string): List | undefined => {
      return lists.find((list) => list.id === id);
    },
    [lists]
  );

  const getListsByStatus = useCallback(
    (status: string): List[] => {
      return lists.filter((list) => list.status === status);
    },
    [lists]
  );

  // Gerenciar estado baseado na autenticação
  useEffect(() => {
    if (isAuthenticated && user) {
      refreshListsAndStats();
    } else {
      clearListsState();
    }
  }, [isAuthenticated]);

  // Escutar evento de logout para limpeza imediata
  useEffect(() => {
    const handleAuthLogout = () => {
      clearListsState();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('auth:logout', handleAuthLogout);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('auth:logout', handleAuthLogout);
      }
    };
  }, []);

  const contextValue: ListsContextType = {
    // Estado
    lists,
    userStats,
    isLoadingLists,
    isLoadingStats,

    // Ações para listas
    fetchLists,
    createNewList,
    updateExistingList,
    deleteExistingList,

    // Ações para estatísticas
    fetchUserStats,

    // Utilitários
    refreshListsAndStats,
    getListById,
    getListsByStatus,
  };

  return (
    <ListsContext.Provider value={contextValue}>
      {children}
    </ListsContext.Provider>
  );
}

// Hook customizado para usar o contexto
export function useListsContext(): ListsContextType {
  const context = useContext(ListsContext);
  if (context === undefined) {
    throw new Error(
      "useListsContext deve ser usado dentro de um ListsProvider"
    );
  }
  return context;
}

// Hook para estatísticas rápidas (usado em componentes que só precisam das stats)
export function useListsStats() {
  const { userStats, isLoadingStats, fetchUserStats } = useListsContext();
  return { userStats, isLoadingStats, fetchUserStats };
}

// Hook para listas (usado em componentes que só precisam das listas)
export function useLists() {
  const {
    lists,
    isLoadingLists,
    fetchLists,
    createNewList,
    updateExistingList,
    deleteExistingList,
    getListById,
    getListsByStatus,
  } = useListsContext();

  return {
    lists,
    isLoadingLists,
    fetchLists,
    createNewList,
    updateExistingList,
    deleteExistingList,
    getListById,
    getListsByStatus,
  };
}
