"use client";

import { DialogBody, DialogTitle } from "@/app/components/layout/dialog";
import { ConfirmationActionDialog } from "@/app/components/layout/dialog/confirmationActionDialog";
import SectionDescription from "@/app/components/layout/SectionDescription";
import SectionTitle from "@/app/components/layout/SectionTitle";
import { useConfirmation } from "@/context/useConfirmationDialog";
import { getListById, removeQuestionFromList } from "@/server/listRequests";
import { List } from "@/types/list";
import { getCompetenciaCode, getHabilidadeCode } from "@/utils/getCode";
import { getListStatus } from "@/utils/getListStatus";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
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

  const [isDialogImgOpen, setIsDialogImgOpen] = useState(false);
  const handleToggleDialogImg = () => {
    setIsDialogImgOpen((state) => !state);
  };

  const [list, setList] = useState<List | null>(null);
  const [loading, setLoading] = useState(false);

  const calculatePerformance = () => {
    if (!list?.questoes) return { correct: 0, total: 0 };

    const questionsWithAnswers = list.questoes.filter(
      (item) => item.alternativaSelecionada
    );
    const correctAnswers = questionsWithAnswers.filter((item) => item.acertou);

    return {
      correct: correctAnswers.length,
      total: questionsWithAnswers.length,
    };
  };

  const performance = calculatePerformance();

  const [selectedQuestionId, setSelectedQuestionId] = useState<string | null>(
    null
  );
  const selectedQuestion = list?.questoes?.find(
    (item) => item.questao.id === selectedQuestionId
  )?.questao;
  const handleSelectQuestion = (questionId: string) => {
    setSelectedQuestionId(questionId);
    handleToggleDialogImg();
  };

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
          <PageTitle>{list?.nome}</PageTitle>
        </div>
        <div className="grid grid-cols-4 gap-6 mt-6">
          <StatCard
            number={list?.questoes?.length ? `${list.questoes.length}` : "0"}
            text="Questões na lista"
          />
          <StatCard
            number={list?.status ? getListStatus(list.status) : ""}
            text="Status da lista"
          />
          {list?.status === "COMPLETED" && (
            <StatCard
              number={`${performance.correct}/${performance.total}`}
              text="Desempenho"
            />
          )}
          {list?.status === "PENDING" && (
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
          )}
          <ButtonStatCard
            text={
              list?.status === "COMPLETED" ? "Refazer lista" : "Iniciar lista"
            }
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
              {list?.status === "COMPLETED" && (
                <TableHeaderCell>Resultado</TableHeaderCell>
              )}
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
                      {item.alternativaSelecionada && (
                        <TableCell variant="primary">
                          {item.acertou ? (
                            <Icon
                              icon="mdi:check-circle"
                              className="text-success text-body20"
                            />
                          ) : (
                            <Icon
                              icon="mdi:close-circle"
                              className="text-failed text-body20"
                            />
                          )}
                        </TableCell>
                      )}
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
                              onClick: () => {
                                if (item.questao.imagemUrl) {
                                  handleSelectQuestion(item.questao.id);
                                } else {
                                  alert("Esta questão não possui imagem.");
                                }
                              },
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
        description="Você está prestes a iniciar a lista. Deseja continuar?"
        cancelText="Cancelar"
        confirmText="Iniciar lista"
        onCancel={handleToggleDialogConfirmation}
        onConfirm={() => router.push(`/dashboard/listas/${id}/start`)}
      />
      <DialogBody open={isDialogImgOpen} onOpenChange={handleToggleDialogImg}>
        <div className="p-6">
          <div>
            <DialogTitle>Imagem da questão</DialogTitle>
          </div>
          {selectedQuestion && selectedQuestion.imagemUrl && (
            <div className="mt-6 w-full max-h-[80vh] overflow-y-auto">
              <Image
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto"
                src={selectedQuestion.imagemUrl}
                alt={`Imagem da questão ${selectedQuestion.id}`}
              />
            </div>
          )}
        </div>
      </DialogBody>
    </>
  );
}
