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

interface GeneralExamInfoContextType {
  areas: Area[];
  competencias: Competencia[];
  habilidades: Habilidade[];
  isLoading: boolean;
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
      
      const responseAreas = await getAllAreas();
      const responseCompetencias = await getAllCompetencias();
      const responseHabilidades = await getAllHabilidades();

      setAreas(responseAreas.data);
      setCompetencias(responseCompetencias.data);
      setHabilidades(responseHabilidades.data);
      
    } catch (error) {
      console.error("Erro ao buscar informações do exame:", error);
    } finally {
      setIsLoading(false);
    }
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
      value={{ areas, competencias, habilidades, isLoading }}
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
