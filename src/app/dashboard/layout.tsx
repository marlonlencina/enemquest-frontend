"use client";

import { Header } from "../components/header";
import { Container } from "../components/layout/Container";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="bg-gray-200-custom w-full min-h-screen flex flex-col">
      <Header />
      <Container className="flex-1 h-full w-full bg-gray-100-custom ">
        <div className="w-full h-full py-12 px-6 flex-1">{children}</div>
      </Container>
      <footer className="">
        <Container>
          <div className="w-full bg-gray-300-custom h-[64px] flex items-center px-6">
            <div className="flex items-center gap-4 justify-between">
              <p className="font-body font-normal text-body14 text-black-custom">
                © 2025 ENEMQuest. Versão 1.0.0.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-[6px] h-[6px] bg-success rounded-full"></div>
                <span className="font-head font-normal text-body14 text-black-custom">
                  Todos sistemas operando.
                </span>
              </div>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
