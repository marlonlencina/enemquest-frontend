const LOCAL_STORAGE_BASE_KEY = "@enemquest_production_localStorage";
const TOKEN_NAME = "authToken";
const FULL_LOCAL_STORAGE_KEY_TOKEN = `${LOCAL_STORAGE_BASE_KEY}/${TOKEN_NAME}`;

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

// Função para limpar todo o localStorage
export const clearLocalStorage = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error("Erro ao limpar localStorage:", error);
  }
};

// Funções específicas para autenticação
export const saveAuthToken = (token: string): void => {
  saveToLocalStorage(FULL_LOCAL_STORAGE_KEY_TOKEN, token);
};

export const getAuthToken = (): string | null => {
  return getFromLocalStorage<string>(FULL_LOCAL_STORAGE_KEY_TOKEN);
};

export const removeAuthToken = (): void => {
  removeFromLocalStorage(FULL_LOCAL_STORAGE_KEY_TOKEN);
};
