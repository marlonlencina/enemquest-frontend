"use client";

import { getQuestions } from "@/server/requests";
import { useEffect, useState } from "react";
import { Questao } from "../types/question";
import { getBgColorByArea } from "../utils/getBgColorByArea";
import FilterSelects from "./FilterSelects";
import QuestionCard from "./QuestionCard";

interface QuestionsWithFiltersProps {
  initialQuestions: Questao[];
}

interface FilterValues {
  ano?: string;
  aplicacao?: string;
  areaId?: string;
  competenciaId?: string;
  habilidadeId?: string;
}

export default function QuestionsWithFilters({
  initialQuestions,
}: QuestionsWithFiltersProps) {
  const [questions, setQuestions] = useState<Questao[]>(initialQuestions);
  const [loading, setLoading] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [filteredCount, setFilteredCount] = useState<number | undefined>(
    undefined
  );

  // Carregar total inicial
  useEffect(() => {
    const loadInitialTotal = async () => {
      try {
        const response = await getQuestions({ page: 1, limit: 1 }); // Só precisamos da paginação
        setTotalQuestions(response.pagination?.total || 0);
      } catch (error) {
        console.error("Error loading initial total:", error);
      }
    };

    if (totalQuestions === 0) {
      loadInitialTotal();
    }
  }, [totalQuestions]);

  const handleApplyFilters = async (filters: FilterValues) => {
    setLoading(true);
    try {
      console.log("Applying filters:", filters);

      // Converter filtros para o formato esperado pela API
      const apiFilters: Record<string, unknown> = {
        page: 1,
        limit: 12,
      };

      if (filters.ano) {
        apiFilters.ano = filters.ano;
      }

      if (filters.aplicacao) {
        apiFilters.aplicacao = filters.aplicacao;
      }

      if (filters.areaId) {
        apiFilters.areaId = filters.areaId;
      }

      if (filters.competenciaId) {
        apiFilters.competenciaId = filters.competenciaId;
      }

      if (filters.habilidadeId) {
        apiFilters.habilidadeId = filters.habilidadeId;
      }

      const response = await getQuestions(apiFilters);
      setQuestions(response.questoes || []);
      setFilteredCount(response.pagination?.total || 0);
    } catch (error) {
      console.error("Error applying filters:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = async () => {
    setLoading(true);
    try {
      console.log("Clearing filters, loading initial questions");

      // Carregar questões iniciais sem filtros
      const response = await getQuestions({ page: 1, limit: 12 });
      setQuestions(response.questoes || []);
      setTotalQuestions(response.pagination?.total || 0);
      setFilteredCount(undefined); // Reset para mostrar total
    } catch (error) {
      console.error("Error clearing filters:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-8">
      <div>
        <div>
          <h1 className="font-head text-head24 font-semibold text-black-custom">
            Questões do ENEM
          </h1>
          <div className="mt-4">
            <FilterSelects
              onApplyFilters={handleApplyFilters}
              onClearFilters={handleClearFilters}
              totalQuestions={totalQuestions}
              filteredCount={filteredCount}
            />
          </div>
        </div>
        <div className="w-full mt-6 grid grid-cols-3 gap-8">
          {loading && (
            <div className="col-span-3 text-center py-8">
              <p className="text-gray-500-custom">Carregando questões...</p>
            </div>
          )}
          {!loading && questions.length === 0 && (
            <div className="col-span-3 text-center py-8">
              <p className="text-gray-500-custom">
                Nenhuma questão encontrada com os filtros aplicados.
              </p>
            </div>
          )}
          {!loading &&
            questions.map((question) => (
              <QuestionCard
                key={question.id}
                title={`ENEM ${question.ano} ${question.prova}`}
                subtitle={`Questão ${question.posicao} - ${question.provaCorReferencia}`}
                category={
                  question.habilidade?.competencia?.area?.nome ||
                  "Área Desconhecida"
                }
                imageUrl={question.imagemUrl || ""}
                bgColor={getBgColorByArea(
                  question.habilidade?.competencia?.area?.nome || ""
                )}
                link={`/questao/${question.id}`}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
