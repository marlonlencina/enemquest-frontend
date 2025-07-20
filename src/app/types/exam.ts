import { Questao } from "./question";

export interface Habilidade {
  id: string;
  codigo: string;
  descricao: string;
  competenciaId: string;
  competencia?: Competencia;
  questoes?: Questao[];
}

export interface Competencia {
  id: string;
  codigo: string;
  descricao: string;
  areaId: string;
  area?: Area;
  habilidades?: Habilidade[];
}

export interface Area {
  id: string;
  codigo: string;
  nome: string;
  competencias?: Competencia[];
}

export interface HabilidadeCompleta extends Habilidade {
  competencia: CompetenciaCompleta;
}

export interface CompetenciaCompleta extends Competencia {
  area: Area;
}
