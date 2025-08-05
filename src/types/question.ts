import { Habilidade, HabilidadeCompleta } from "./exam";

export interface Questao {
  id: string;
  ano: number;
  prova: string;
  aplicacao: string;
  posicao: number;
  provaCorReferencia: string;
  codigoINEP: string;
  dificuldade: number;
  probabilidadeAcerto: string;
  gabarito: string;
  imagemUrl?: string;
  temImagem: boolean;
  habilidadeId: string;
  habilidade?: Habilidade;
}

// DTOs para criação e atualização
export interface CreateQuestaoDTO {
  ano: number;
  prova: string;
  aplicacao: string;
  posicao: number;
  provaCorReferencia: string;
  codigoINEP: string;
  dificuldade: number;
  probabilidadeAcerto: string;
  gabarito: string;
  imagemUrl?: string;
  temImagem?: boolean;
  habilidadeId: string;
}

export interface UpdateQuestaoDTO extends Partial<CreateQuestaoDTO> {
  id: string;
}

// Tipos para filtros e busca
export interface QuestaoFilters {
  ano?: number;
  prova?: string;
  aplicacao?: string;
  dificuldade?: number;
  habilidadeId?: string;
  competenciaId?: string;
  areaId?: string;
  temImagem?: boolean;
}

// Tipos para questões com relacionamentos completos
export interface QuestaoCompleta extends Questao {
  habilidade: HabilidadeCompleta;
}
