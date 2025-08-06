"use client";

import { useAuth } from "@/context/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Header } from "../components/header";
import { Container } from "../components/layout/Container";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      console.log('Usuário não autenticado, redirecionando para login...');
      router.push('/auth/login');
    }
  }, [isAuthenticated, isLoading, router]);

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="bg-gray-200-custom w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-primary mx-auto"></div>
          <p className="mt-2 text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  // Não renderizar nada se não estiver autenticado
  if (!isAuthenticated) {
    return null;
  }
  return (
    <div className="bg-gray-200-custom w-full min-h-screen flex flex-col">
      <Header />
      <Container className="flex-1 h-full w-full bg-gray-100-custom ">
        <div className="w-full h-full py-12 px-6 flex-1">{children}</div>
      </Container>
      <footer className="w-full">
        <Container>
          <div className="w-full bg-gray-300-custom h-[64px] flex items-center px-6">
            <div className="w-full flex items-center gap-4 justify-between">
              <div>
                <p className="font-body font-normal text-body14 text-black-custom">
                    🧠 ENEM Quest© Versão 1.0.0.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-head font-normal text-body14 text-black-custom">
                  De estudante para estudante. 💙
                </span>
              </div>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
