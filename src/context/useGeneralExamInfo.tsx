"use client";
import {
  getAllAreas,
  getAllCompetencias,
  getAllHabilidades,
} from "@/server/generalRequests";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./useAuth";
import { Area, Competencia, Habilidade } from "@/types/exam";
import { 
  getCachedExamInfo, 
  setCachedExamInfo,
  CachedExamInfo 
} from "@/utils/examInfoCache";

interface GeneralExamInfoContextType {
  areas: Area[];
  competencias: Competencia[];
  habilidades: Habilidade[];
  isLoading: boolean;
  clearCache: () => void;
}

const GeneralExamInfoContext = createContext<
  GeneralExamInfoContextType | undefined
>(undefined);

interface GeneralExamInfoProviderProps {
  children: ReactNode;
}

export const GeneralExamInfoProvider: React.FC<
  GeneralExamInfoProviderProps
> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [areas, setAreas] = useState<Area[]>([]);
  const [competencias, setCompetencias] = useState<Competencia[]>([]);
  const [habilidades, setHabilidades] = useState<Habilidade[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetAllExamInfo = async () => {
    try {
      setIsLoading(true);
      
      // Primeiro, tentar carregar do cache
      const cachedData = getCachedExamInfo();
      if (cachedData) {
        setAreas(cachedData.areas);
        setCompetencias(cachedData.competencias);
        setHabilidades(cachedData.habilidades);
        setIsLoading(false);
        return;
      }

      // Cache miss - buscar do servidor
      console.log('Cache miss: Buscando dados do servidor...');
      const responseAreas = await getAllAreas();
      const responseCompetencias = await getAllCompetencias();
      const responseHabilidades = await getAllHabilidades();

      const examData: CachedExamInfo = {
        areas: responseAreas.data,
        competencias: responseCompetencias.data,
        habilidades: responseHabilidades.data
      };

      // Salvar no estado
      setAreas(examData.areas);
      setCompetencias(examData.competencias);
      setHabilidades(examData.habilidades);

      // Salvar no cache para próxima vez
      setCachedExamInfo(examData);
      
    } catch (error) {
      console.error("Erro ao buscar informações do exame:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearCache = () => {
    import("@/utils/examInfoCache").then(({ clearExamInfoCache }) => {
      clearExamInfoCache();
      // Recarregar dados após limpar cache
      if (isAuthenticated) {
        handleGetAllExamInfo();
      }
    });
  };

  useEffect(() => {
    if (!isAuthenticated) {
      // Limpar estado quando não autenticado
      setAreas([]);
      setCompetencias([]);
      setHabilidades([]);
      setIsLoading(false);
      return;
    }
    
    handleGetAllExamInfo();
  }, [isAuthenticated]);

  return (
    <GeneralExamInfoContext.Provider
      value={{ areas, competencias, habilidades, isLoading, clearCache }}
    >
      {children}
    </GeneralExamInfoContext.Provider>
  );
};

export const useGeneralExamInfo = (): GeneralExamInfoContextType => {
  const context = useContext(GeneralExamInfoContext);
  if (context === undefined) {
    throw new Error(
      "useGeneralExamInfo deve ser usado dentro de um GeneralExamInfoProvider"
    );
  }
  return context;
};
