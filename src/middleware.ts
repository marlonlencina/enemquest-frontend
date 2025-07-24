import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token");
  const pathname = request.nextUrl.pathname;
  
  // Usuário não logado tentando acessar rota protegida
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  
  // Usuário logado tentando acessar páginas de auth
  if (token && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
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
