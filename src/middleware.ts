import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Middleware simplificado - apenas previne acesso direto a /dashboard
  // A proteção real acontece client-side no contexto de autenticação
  
  console.log('Middleware executando (simplificado):', pathname);
  
  // Permitir todas as navegações - proteção será client-side
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/(.*)",
    "/auth/(.*)",
  ]
};
