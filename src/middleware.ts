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
    console.log('Validating token on server:', token);
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002"}/users/validate-token`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const isValid = response.ok;
    if (!isValid) {
      console.error('Token validation failed:', response.statusText);
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
  
  // Usuário não logado tentando acessar rota protegida
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  
  // Usuário com token tentando acessar rota protegida - validar token no servidor
  if (token && pathname.startsWith("/dashboard")) {
    const isValidToken = await validateTokenOnServer(token.value);
    
    if (!isValidToken) {
      // Token inválido - limpar cookie e redirecionar para login
      const response = NextResponse.redirect(new URL("/auth/login", request.url));
      response.cookies.set("auth-token", "", { 
        path: "/", 
        maxAge: 0,
        httpOnly: false 
      });
      return response;
    }
  }
  
  // Usuário logado tentando acessar páginas de auth
  if (token && pathname.startsWith("/auth")) {
    // Validar token antes de redirecionar
    const isValidToken = await validateTokenOnServer(token.value);
    
    if (isValidToken) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
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
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/(.*)",
    "/auth/(.*)",
  ]
};
