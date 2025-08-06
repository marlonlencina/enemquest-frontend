export interface List {
  id: string;
  nome: string;
  status: LIST_STATUS;
  userId: string;
  questoes?: ListQuestao[];
  numeroQuestoes?: number;
  areas: string[];
}

export interface ListQuestao {
  id: string;
  ordem: number | null;
  acertou: boolean | null;
  alternativaSelecionada: string | null;
  questao: {
    id: string;
    codigoINEP: string;
    ano: number;
    prova: string;
    aplicacao: string;
    posicao: number;
    gabarito: string;
    imagemUrl: string | null;
    temImagem: boolean;
    habilidade: {
      codigo: string;
      descricao: string;
      competencia: {
        codigo: string;
        descricao: string;
        area: {
          nome: string;
        };
      };
    };
  };
}

export interface ListStats {
  total: number;
  respondidas: number;
  acertos: number;
  erros: number;
  percentualAcerto: number;
}

export type LIST_STATUS = "PENDING" | "COMPLETED";
