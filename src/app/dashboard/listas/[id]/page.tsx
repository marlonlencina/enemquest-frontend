"use client";

import { ConfirmationActionDialog } from "@/app/components/layout/dialog/confirmationActionDialog";
import SectionDescription from "@/app/components/layout/SectionDescription";
import SectionTitle from "@/app/components/layout/SectionTitle";
import { useConfirmation } from "@/context/useConfirmationDialog";
import {
  getListById,
  removeQuestionFromList,
} from "@/server/listRequests";
import { getCompetenciaCode, getHabilidadeCode } from "@/utils/getCode";
import { getListStatus } from "@/utils/getListStatus";
import { useRouter } from "next/navigation";
import { use, useCallback, useEffect, useState } from "react";
import { ButtonStatCard } from "../../../components/layout/ButtonStatCard";
import { DataTable } from "../../../components/layout/DataTable";
import ListActions from "../../../components/layout/ListActions";
import { PageTitle } from "../../../components/layout/PageTitle";
import StatCard from "../../../components/layout/StatCard";
import SubjectBadge, {
  SubjectCode,
} from "../../../components/layout/SubjectBadge";
import { TableBody } from "../../../components/layout/TableBody";
import { TableCell } from "../../../components/layout/TableCell";
import { TableHeader } from "../../../components/layout/TableHeader";
import { TableHeaderCell } from "../../../components/layout/TableHeaderCell";
import { TableRow } from "../../../components/layout/TableRow";
import { List } from "@/types/list";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}
export default function ListDetails({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { confirm } = useConfirmation();
  const [isDialogConfirmOpen, setIsDialogConfirmOpen] = useState(false);
  const handleToggleDialogConfirmation = () => {
    setIsDialogConfirmOpen((state) => !state);
  };

  const [list, setList] = useState<List | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetListDetails = useCallback(
    async (listId: string) => {
      if (loading) return; // Previne múltiplas chamadas simultâneas

      setLoading(true);
      try {
        const response = await getListById(listId);
        if (response.success && response.data) {
          console.log("Lista obtida com sucesso:", response.data);
          setList(response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar detalhes da lista:", error);
      } finally {
        setLoading(false);
      }
    },
    [loading]
  );

  const handleDeleteQuestion = async (questionId: string) => {
    try {
      const confirmed = await confirm({
        title: "Confirmar exclusão",
        description: "Tem certeza de que deseja excluir esta questão?",
        confirmText: "Excluir",
        cancelText: "Cancelar",
      });
      if (confirmed && list) {
        await removeQuestionFromList(id, questionId);
        setList((prevList) => ({
          ...prevList!,
          questoes: prevList!.questoes!.filter(
            (item) => item.questao.id !== questionId
          ),
        }));
      }
    } catch (error) {
      console.error("Erro ao deletar questão:", error);
    }
  };

  useEffect(() => {
    if (!id) {
      console.error("ID da lista não fornecido");
      return;
    }
    handleGetListDetails(id);
  }, [id]);

  return (
    <>
      <div>
        <div className="flex items-center justify-between">
          <PageTitle>Lista de matemática #4 H19</PageTitle>
        </div>
        <div className="grid grid-cols-4 gap-6 mt-6">
          <StatCard
            number={list?.questoes?.length ? `${list.questoes.length}` : ""}
            text="Questões na lista"
          />
          <StatCard
            number={list?.status ? getListStatus(list.status) : ""}
            text="Status da lista"
          />
          <ButtonStatCard
            text="Gerar questões"
            icon="lucide:plus"
            backgroundColor="bg-blue-primary"
            iconBackgroundColor="bg-blue-primary-light"
            hoverBackgroundColor="hover:bg-blue-primary-dark"
            onClick={() =>
              router.push(`/dashboard/listas/${id}/gerar-questoes`)
            }
          />
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
              Você pode adicionar questões à lista, removê-las ou visualizar
              detalhes de cada questão.
            </SectionDescription>
          </div>
          <DataTable>
            <TableHeader>
              <TableHeaderCell>Nome da questão</TableHeaderCell>
              <TableHeaderCell>Ano</TableHeaderCell>
              <TableHeaderCell>Identificador</TableHeaderCell>
              <TableHeaderCell>Aplicação</TableHeaderCell>
              <TableHeaderCell>Matéria</TableHeaderCell>
              <TableHeaderCell>Competência</TableHeaderCell>
              <TableHeaderCell>Habilidade</TableHeaderCell>
              <TableHeaderCell>Ações</TableHeaderCell>
            </TableHeader>
            <TableBody>
              {list &&
                list.questoes!.map((item) => {
                  return (
                    <TableRow key={item.id}>
                      <TableCell variant="primary">
                        Questão #{item.ordem}
                      </TableCell>
                      <TableCell variant="primary">
                        {item.questao.ano}
                      </TableCell>
                      <TableCell>{item.questao.codigoINEP}</TableCell>
                      <TableCell>{item.questao.aplicacao}</TableCell>
                      <TableCell className="px-6">
                        <SubjectBadge
                          codigo={item.questao.prova as SubjectCode}
                        />
                      </TableCell>
                      <TableCell>
                        {getCompetenciaCode(
                          item.questao.habilidade.competencia.codigo
                        )}
                      </TableCell>
                      <TableCell>
                        {getHabilidadeCode(item.questao.habilidade.codigo)}
                      </TableCell>
                      <TableCell className="px-6 w-auto">
                        <ListActions
                          iconButtons={[
                            {
                              type: "icon",
                              iconName: "lucide:trash",
                              onClick: () =>
                                handleDeleteQuestion(item.questao.id),
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
                  );
                })}
            </TableBody>
          </DataTable>
        </div>
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
    </>
  );
}
