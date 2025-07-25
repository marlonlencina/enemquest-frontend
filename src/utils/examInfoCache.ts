import { Area, Competencia, Habilidade } from "@/types/exam";

// Versão do cache - altere para invalidar todos os caches existentes
const CACHE_VERSION = "v1";
const CACHE_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 dias em milliseconds

// Chaves do localStorage
const CACHE_KEYS = {
  AREAS: `enemquest_areas_${CACHE_VERSION}`,
  COMPETENCIAS: `enemquest_competencias_${CACHE_VERSION}`,
  HABILIDADES: `enemquest_habilidades_${CACHE_VERSION}`,
  TIMESTAMP: `enemquest_exam_info_timestamp_${CACHE_VERSION}`,
} as const;

export interface CachedExamInfo {
  areas: Area[];
  competencias: Competencia[];
  habilidades: Habilidade[];
}

// Verificar se cache está válido
const isCacheValid = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    const timestamp = localStorage.getItem(CACHE_KEYS.TIMESTAMP);
    if (!timestamp) return false;
    
    const cacheTime = parseInt(timestamp, 10);
    const now = Date.now();
    
    return (now - cacheTime) < CACHE_DURATION;
  } catch (error) {
    console.warn('Erro ao verificar validade do cache:', error);
    return false;
  }
};

// Verificar se todos os dados estão presentes no cache
const isCacheComplete = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    const areas = localStorage.getItem(CACHE_KEYS.AREAS);
    const competencias = localStorage.getItem(CACHE_KEYS.COMPETENCIAS);
    const habilidades = localStorage.getItem(CACHE_KEYS.HABILIDADES);
    
    return !!(areas && competencias && habilidades);
  } catch (error) {
    console.warn('Erro ao verificar completude do cache:', error);
    return false;
  }
};

// Recuperar dados do cache
export const getCachedExamInfo = (): CachedExamInfo | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    // Verificar se cache é válido e completo
    if (!isCacheValid() || !isCacheComplete()) {
      console.log('Cache inválido ou incompleto, necessário recarregar dados');
      return null;
    }
    
    const areas = JSON.parse(localStorage.getItem(CACHE_KEYS.AREAS)!) as Area[];
    const competencias = JSON.parse(localStorage.getItem(CACHE_KEYS.COMPETENCIAS)!) as Competencia[];
    const habilidades = JSON.parse(localStorage.getItem(CACHE_KEYS.HABILIDADES)!) as Habilidade[];
    
    console.log('Cache hit: Dados carregados do localStorage', {
      areas: areas.length,
      competencias: competencias.length,
      habilidades: habilidades.length
    });
    
    return { areas, competencias, habilidades };
  } catch (error) {
    console.warn('Erro ao recuperar cache, limpando dados corrompidos:', error);
    clearExamInfoCache();
    return null;
  }
};

// Salvar dados no cache
export const setCachedExamInfo = (data: CachedExamInfo): void => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(CACHE_KEYS.AREAS, JSON.stringify(data.areas));
    localStorage.setItem(CACHE_KEYS.COMPETENCIAS, JSON.stringify(data.competencias));
    localStorage.setItem(CACHE_KEYS.HABILIDADES, JSON.stringify(data.habilidades));
    localStorage.setItem(CACHE_KEYS.TIMESTAMP, Date.now().toString());
    
    console.log('Cache miss: Dados salvos no localStorage', {
      areas: data.areas.length,
      competencias: data.competencias.length,
      habilidades: data.habilidades.length,
      expiresAt: new Date(Date.now() + CACHE_DURATION).toISOString()
    });
  } catch (error) {
    console.warn('Erro ao salvar no cache:', error);
  }
};

// Limpar cache (para invalidação manual)
export const clearExamInfoCache = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    Object.values(CACHE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    
    console.log('Cache limpo manualmente');
  } catch (error) {
    console.warn('Erro ao limpar cache:', error);
  }
};

// Obter informações do cache (para debug)
export const getCacheInfo = () => {
  if (typeof window === 'undefined') return null;
  
  try {
    const timestamp = localStorage.getItem(CACHE_KEYS.TIMESTAMP);
    const isValid = isCacheValid();
    const isComplete = isCacheComplete();
    
    if (!timestamp) {
      return { exists: false };
    }
    
    const cacheTime = parseInt(timestamp, 10);
    const expiresAt = new Date(cacheTime + CACHE_DURATION);
    const timeToExpiry = expiresAt.getTime() - Date.now();
    
    return {
      exists: true,
      version: CACHE_VERSION,
      cachedAt: new Date(cacheTime).toISOString(),
      expiresAt: expiresAt.toISOString(),
      isValid,
      isComplete,
      timeToExpiryMs: timeToExpiry,
      timeToExpiryHours: Math.round(timeToExpiry / (1000 * 60 * 60))
    };
  } catch (error) {
    console.warn('Erro ao obter informações do cache:', error);
    return null;
  }
};

// Expor para debug global (apenas em desenvolvimento)
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).examInfoCache = {
    get: getCachedExamInfo,
    set: setCachedExamInfo,
    clear: clearExamInfoCache,
    info: getCacheInfo
  };
}