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

// Funções para gerenciar cookies de autenticação
export const getAuthTokenFromCookie = (): string | null => {
  if (typeof document === 'undefined') return null;
  
  const cookies = document.cookie.split(';');
  const authCookie = cookies.find(cookie => 
    cookie.trim().startsWith('auth-token=')
  );
  
  if (!authCookie) return null;
  
  return authCookie.split('=')[1] || null;
};

export const saveAuthTokenToCookie = (token: string): void => {
  if (typeof document !== 'undefined') {
    // Configurações mais robustas para produção
    const isProduction = window.location.protocol === 'https:';
    const cookieOptions = [
      `auth-token=${token}`,
      'path=/',
      'max-age=86400', // 24h
      'SameSite=Lax'
    ];
    
    // Adicionar Secure apenas em HTTPS
    if (isProduction) {
      cookieOptions.push('Secure');
    }
    
    document.cookie = cookieOptions.join('; ');
    console.log('Token salvo no cookie:', token.substring(0, 20) + '...');
  }
};

export const removeAuthToken = (): void => {
  // Remover apenas o cookie
  if (typeof document !== 'undefined') {
    const isProduction = window.location.protocol === 'https:';
    const cookieOptions = [
      'auth-token=',
      'path=/',
      'max-age=0',
      'SameSite=Lax'
    ];
    
    if (isProduction) {
      cookieOptions.push('Secure');
    }
    
    document.cookie = cookieOptions.join('; ');
    console.log('Token removido do cookie');
  }
};
