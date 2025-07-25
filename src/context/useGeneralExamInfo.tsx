"use client";
import { Area, Competencia, Habilidade } from "@/app/types/exam";
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

interface GeneralExamInfoContextType {
  areas: Area[];
  competencias: Competencia[];
  habilidades: Habilidade[];
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

  const handleGetAllExamInfo = async () => {
    try {
      const responseAreas = await getAllAreas();
      const responseCompetencias = await getAllCompetencias();
      const responseHabilidades = await getAllHabilidades();

      setAreas(responseAreas.data);
      setCompetencias(responseCompetencias.data);
      setHabilidades(responseHabilidades.data);
    } catch (error) {
      console.error("Erro ao buscar informações do exame:", error);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    handleGetAllExamInfo();
  }, [isAuthenticated]);

  return (
    <GeneralExamInfoContext.Provider
      value={{ areas, competencias, habilidades }}
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
