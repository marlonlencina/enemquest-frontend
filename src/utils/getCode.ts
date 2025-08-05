  // Função para extrair apenas o código da competência (remove prefixo da área)
  export const getCompetenciaCode = (codigoCompleto: string) => {
    // Formato: "CH_C2" -> "C2"
    const parts = codigoCompleto.split('_');
    return parts.length > 1 ? parts[1] : codigoCompleto;
  };

  // Função para extrair apenas o código da habilidade (remove prefixo da área)
  export const getHabilidadeCode = (codigoCompleto: string) => {
    // Formato: "CH_H01" -> "H01"
    const parts = codigoCompleto.split('_');
    return parts.length > 1 ? parts[1] : codigoCompleto;
  };