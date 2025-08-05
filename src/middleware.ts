import { NextRequest, NextResponse } from "next/server";

// Cache simples para validações de token
interface TokenCacheEntry {
  isValid: boolean;
  timestamp: number;
}

const tokenCache = new Map<string, TokenCacheEntry>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

function getCachedTokenValidation(token: string): boolean | null {
  const cached = tokenCache.get(token);
  if (!cached) return null;
  
  const now = Date.now();
  if (now - cached.timestamp > CACHE_DURATION) {
    tokenCache.delete(token);
    return null;
  }
  
  return cached.isValid;
}

function setCachedTokenValidation(token: string, isValid: boolean): void {
  tokenCache.set(token, {
    isValid,
    timestamp: Date.now()
  });
}

async function validateTokenOnServer(token: string): Promise<boolean> {
  // Verificar cache primeiro
  const cachedResult = getCachedTokenValidation(token);
  if (cachedResult !== null) {
    return cachedResult;
  }

  try {
    console.log('Validating token on server:', token.substring(0, 20) + '...');
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002";
    console.log('API URL:', apiUrl);
    
    const response = await fetch(`${apiUrl}/users/validate-token`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const isValid = response.ok;
    console.log('Token validation response:', response.status, response.statusText);
    
    if (!isValid) {
      console.error('Token validation failed:', response.statusText);
      const responseBody = await response.text();
      console.error('Response body:', responseBody);
      return false;
    }
    
    // Cachear o resultado
    setCachedTokenValidation(token, isValid);
    console.log('Token validation successful:', isValid);
    
    return isValid;
  } catch (error) {
    console.error('Error validating token on server:', error);
    // Cachear resultado negativo por um tempo menor em caso de erro
    setCachedTokenValidation(token, false);
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token");
  const pathname = request.nextUrl.pathname;
  
  console.log('Middleware executando:', pathname, 'Token:', token ? 'presente' : 'ausente');
  
  // Usuário não logado tentando acessar rota protegida
  if (!token && pathname.startsWith("/dashboard")) {
    console.log('Redirecionando para login - sem token');
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  
  // Usuário com token tentando acessar rota protegida - validar token no servidor
  if (token && pathname.startsWith("/dashboard")) {
    console.log('Validando token para acesso ao dashboard');
    const isValidToken = await validateTokenOnServer(token.value);
    
    if (!isValidToken) {
      console.log('Token inválido - redirecionando para login');
      // Token inválido - limpar cookie e redirecionar para login
      const response = NextResponse.redirect(new URL("/auth/login", request.url));
      response.cookies.set("auth-token", "", { 
        path: "/", 
        maxAge: 0,
        httpOnly: false 
      });
      return response;
    } else {
      console.log('Token válido - permitindo acesso ao dashboard');
    }
  }
  
  // Usuário logado tentando acessar páginas de auth
  if (token && pathname.startsWith("/auth")) {
    console.log('Usuário com token tentando acessar auth pages');
    // Validar token antes de redirecionar
    const isValidToken = await validateTokenOnServer(token.value);
    
    if (isValidToken) {
      console.log('Token válido - redirecionando para dashboard');
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      console.log('Token inválido - permitindo acesso às páginas de auth');
      // Token inválido - limpar cookie e permitir acesso à página de auth
      const response = NextResponse.next();
      response.cookies.set("auth-token", "", { 
        path: "/", 
        maxAge: 0,
        httpOnly: false 
      });
      return response;
    }
  }
  
  console.log('Middleware - permitindo navegação normal');
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/(.*)",
    "/auth/(.*)",
  ]
};
