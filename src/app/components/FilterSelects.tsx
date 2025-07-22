"use client";

import {
  getAllAreas,
  getAllCompetencias,
  getAllHabilidades,
  getAvailableAplicacoes,
  getAvailableYears,
} from "@/server/requests";
import { useEffect, useState } from "react";
import Select from "./Select";
import { Button } from "./form/Button";

interface FilterValues {
  ano?: string;
  aplicacao?: string;
  areaId?: string;
  competenciaId?: string;
  habilidadeId?: string;
}

interface FilterSelectsProps {
  onApplyFilters?: (filters: FilterValues) => void;
  onClearFilters?: () => void;
  totalQuestions?: number;
  filteredCount?: number;
}

export default function FilterSelects({
  onApplyFilters,
  onClearFilters,
  totalQuestions = 0,
  filteredCount,
}: FilterSelectsProps) {
  const [filters, setFilters] = useState<FilterValues>({});
  const [years, setYears] = useState<number[]>([]);
  const [areas, setAreas] = useState<{ id: string; nome: string }[]>([]);
  const [aplicacoes, setAplicacoes] = useState<string[]>([]);
  const [competencias, setCompetencias] = useState<
    { id: string; nome: string; codigo: string }[]
  >([]);
  const [habilidades, setHabilidades] = useState<
    { id: string; nome: string; codigo: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [yearsData, areasData, aplicacoesData] = await Promise.all([
          getAvailableYears(),
          getAllAreas(),
          getAvailableAplicacoes(),
        ]);

        setYears(yearsData.data || []);
        setAreas(areasData.data || []);
        setAplicacoes(aplicacoesData.data || []);
      } catch (error) {
        console.error("Error fetching filter data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch competencias when area changes
  useEffect(() => {
    if (filters.areaId) {
      const fetchCompetencias = async () => {
        try {
          const data = await getAllCompetencias();
          const filteredCompetencias =
            data.data?.filter(
              (comp: {
                areaId: string;
                id: string;
                nome: string;
                codigo: string;
              }) => comp.areaId === filters.areaId
            ) || [];
          setCompetencias(filteredCompetencias);
        } catch (error) {
          console.error("Error fetching competencias:", error);
        }
      };

      fetchCompetencias();
    } else {
      setCompetencias([]);
    }
  }, [filters.areaId]);

  // Fetch habilidades when competencia changes
  useEffect(() => {
    if (filters.competenciaId) {
      const fetchHabilidades = async () => {
        try {
          const data = await getAllHabilidades();
          const filteredHabilidades =
            data.data?.filter(
              (hab: {
                competenciaId: string;
                id: string;
                nome: string;
                codigo: string;
              }) => hab.competenciaId === filters.competenciaId
            ) || [];
          setHabilidades(filteredHabilidades);
        } catch (error) {
          console.error("Error fetching habilidades:", error);
        }
      };

      fetchHabilidades();
    } else {
      setHabilidades([]);
    }
  }, [filters.competenciaId]);

  const handleApplyFilters = () => {
    onApplyFilters?.(filters);
  };

  const handleClearFilters = () => {
    setFilters({});
    setCompetencias([]);
    setHabilidades([]);
    onClearFilters?.();
  };

  const handleFilterChange = (key: keyof FilterValues, value: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [key]: value };

      // Reset dependent filters when parent changes
      if (key === "areaId") {
        newFilters.competenciaId = undefined;
        newFilters.habilidadeId = undefined;
      } else if (key === "competenciaId") {
        newFilters.habilidadeId = undefined;
      }

      return newFilters;
    });
  };

  if (loading) {
    return <div className="flex gap-4">Carregando filtros...</div>;
  }

  return (
    <div className="flex flex-col justify-between gap-4">
      <div className="w-full flex item-center gap-4 ">
        <Select
          placeholder="Filtrar por ano"
          value={filters.ano}
          onChange={(value) => handleFilterChange("ano", value)}
          options={years.map((year) => ({
            value: year.toString(),
            label: year.toString(),
          }))}
        />

        <Select
          placeholder="Filtrar por aplicação"
          value={filters.aplicacao}
          onChange={(value) => handleFilterChange("aplicacao", value)}
          options={aplicacoes.map((aplicacao) => ({
            value: aplicacao,
            label:
              aplicacao.charAt(0).toUpperCase() +
              aplicacao.slice(1).toLowerCase(),
          }))}
        />

        <Select
          placeholder="Filtrar por área"
          value={filters.areaId}
          onChange={(value) => handleFilterChange("areaId", value)}
          options={areas.map((area) => ({
            value: area.id,
            label: area.nome,
          }))}
        />

        <Select
          placeholder="Filtrar por competência"
          value={filters.competenciaId}
          onChange={(value) => handleFilterChange("competenciaId", value)}
          disabled={!filters.areaId}
          options={competencias.map((comp) => ({
            value: comp.id,
            label: `${comp.codigo} `,
          }))}
        />

        <Select
          placeholder="Filtrar por habilidade"
          value={filters.habilidadeId}
          onChange={(value) => handleFilterChange("habilidadeId", value)}
          disabled={!filters.competenciaId}
          options={habilidades.map((hab) => ({
            value: hab.id,
            label: `${hab.codigo}`,
          }))}
        />
      </div>

      <div className="w-full flex items-center justify-between gap-4">
        <div className="text-gray-500-custom font-body text-body16">
          {filteredCount !== undefined ? (
            <span>
              <strong className="text-black-custom">{filteredCount}</strong>{" "}
              questões encontradas
              {totalQuestions > 0 && (
                <span>
                  {" "}
                  de{" "}
                  <strong className="text-black-custom">
                    {totalQuestions}
                  </strong>{" "}
                  total
                </span>
              )}
            </span>
          ) : (
            <span>
              <strong className="text-black-custom">{totalQuestions}</strong>{" "}
              questões disponíveis
            </span>
          )}
        </div>
        {/* <div className=" flex items-center justify-end gap-2">
          <Button variant="link" onClick={handleClearFilters}>
            Limpar filtros
          </Button>
          <Button onClick={handleApplyFilters}>Filtrar</Button>
        </div> */}
      </div>
    </div>
  );
}
