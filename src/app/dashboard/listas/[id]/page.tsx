"use client";

import { ConfirmationActionDialog } from "@/app/components/layout/dialog/confirmationActionDialog";
import SectionDescription from "@/app/components/layout/SectionDescription";
import SectionTitle from "@/app/components/layout/SectionTitle";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Header } from "../../../components/header";
import { ButtonStatCard } from "../../../components/layout/ButtonStatCard";
import { Container } from "../../../components/layout/Container";
import { DataTable } from "../../../components/layout/DataTable";
import ListActions from "../../../components/layout/ListActions";
import { PageTitle } from "../../../components/layout/PageTitle";
import StatCard from "../../../components/layout/StatCard";
import SubjectBadge from "../../../components/layout/SubjectBadge";
import { TableBody } from "../../../components/layout/TableBody";
import { TableCell } from "../../../components/layout/TableCell";
import { TableHeader } from "../../../components/layout/TableHeader";
import { TableHeaderCell } from "../../../components/layout/TableHeaderCell";
import { TableRow } from "../../../components/layout/TableRow";

export default function ListDetails({ id }: { id: string }) {
  const router = useRouter();
  const [isDialogConfirmOpen, setIsDialogConfirmOpen] = useState(false);
  const handleToggleDialogConfirmation = () => {
    setIsDialogConfirmOpen((state) => !state);
  };

  return (
    <div className=" bg-gray-200-custom w-full min-h-screen">
      <Header />
      <div>
        <Container>
          <div className="w-full py-12 flex-1 bg-gray-100-custom px-6">
            <div>
              <div className="flex items-center justify-between">
                <PageTitle>Lista de matemática #4 H19</PageTitle>
              </div>
              <div className="grid grid-cols-4 gap-6 mt-6">
                <StatCard number="20" text="Questões na lista" />
                <StatCard number="Pendente" text="Status da lista" />
                <StatCard number="45 Min" text="Tempo de duração" />
                <ButtonStatCard
                  text="Iniciar lista"
                  icon="lucide:play"
                  onClick={() => handleToggleDialogConfirmation()}
                />
              </div>
            </div>
            <div className="w-full mt-8 flex gap-6">
              <div className="w-full bg-white-custom rounded-lg pb-6">
                <div className="mb-4 px-6 pt-6">
                  <SectionTitle>Questões da lista</SectionTitle>
                  <SectionDescription>
                    Você pode adicionar questões à lista, removê-las ou
                    visualizar detalhes de cada questão.
                  </SectionDescription>
                </div>
                <DataTable>
                  <TableHeader>
                    <TableHeaderCell>Nome da questão</TableHeaderCell>
                    <TableHeaderCell>Ano</TableHeaderCell>
                    <TableHeaderCell>Identificador</TableHeaderCell>
                    <TableHeaderCell>Matéria</TableHeaderCell>
                    <TableHeaderCell>Competência</TableHeaderCell>
                    <TableHeaderCell>Habilidade</TableHeaderCell>
                    <TableHeaderCell>Ações</TableHeaderCell>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell variant="primary">Questão #1</TableCell>
                      <TableCell variant="primary">2024</TableCell>
                      <TableCell>274942</TableCell>
                      <TableCell className="px-6">
                        <SubjectBadge codigo="MT" />
                      </TableCell>
                      <TableCell>C4</TableCell>
                      <TableCell>H12</TableCell>
                      <TableCell className="px-6 w-auto">
                        <ListActions
                          iconButtons={[
                            {
                              type: "icon",
                              iconName: "lucide:trash",
                              onClick: () => console.log("delete"),
                            },
                            {
                              type: "icon",
                              iconName: "lucide:eye",
                              onClick: () => console.log("view"),
                            },
                          ]}
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </DataTable>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <ConfirmationActionDialog
        open={isDialogConfirmOpen}
        onOpenChange={handleToggleDialogConfirmation}
        title="Tudo pronto?"
        description="Você está prestes a iniciar a lista de matemática #4 H19."
        cancelText="Cancelar"
        confirmText="Iniciar lista"
        onCancel={handleToggleDialogConfirmation}
        onConfirm={() => router.push(`/dashboard/listas/${id}/start`)}
      />
    </div>
  );
}
