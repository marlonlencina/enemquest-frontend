// Removida constante não utilizada LOCAL_STORAGE_BASE_KEY

// Função genérica para salvar dados no localStorage
export const saveToLocalStorage = <T>(key: string, value: T): void => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Erro ao salvar no localStorage (${key}):`, error);
  }
};

// Função genérica para recuperar dados do localStorage
export const getFromLocalStorage = <T>(key: string): T | null => {
  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return null;
    }
    return JSON.parse(item) as T;
  } catch (error) {
    console.error(`Erro ao recuperar do localStorage (${key}):`, error);
    return null;
  }
};

// Função para deletar item do localStorage
export const removeFromLocalStorage = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Erro ao remover do localStorage (${key}):`, error);
  }
};

// Funções para gerenciar autenticação via localStorage
export const getAuthTokenFromStorage = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    return localStorage.getItem('auth-token');
  } catch (error) {
    console.error('Erro ao recuperar token do localStorage:', error);
    return null;
  }
};

export const saveAuthTokenToStorage = (token: string): void => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('auth-token', token);
      console.log('Token salvo no localStorage:', token.substring(0, 20) + '...');
    } catch (error) {
      console.error('Erro ao salvar token no localStorage:', error);
    }
  }
};

export const removeAuthToken = (): void => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem('auth-token');
      console.log('Token removido do localStorage');
    } catch (error) {
      console.error('Erro ao remover token do localStorage:', error);
    }
  }
};

// Manter compatibilidade temporária
export const getAuthTokenFromCookie = getAuthTokenFromStorage;
export const saveAuthTokenToCookie = saveAuthTokenToStorage;
