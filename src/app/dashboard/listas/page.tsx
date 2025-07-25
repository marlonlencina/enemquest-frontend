"use client";

import { ButtonOptionToggle } from "@/app/components/ButtonOptionToggle";
import { Button } from "@/app/components/form/Button";
import { Input } from "@/app/components/form/Input";
import {
  DialogBody,
  DialogButtonsWrapper,
  DialogDescription,
  DialogTitle,
} from "@/app/components/layout/dialog";
import {
  createList,
  deleteList,
  getMyLists,
  List,
} from "@/server/listRequests";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { ButtonStatCard } from "../../components/layout/ButtonStatCard";
import { DataTable } from "../../components/layout/DataTable";
import ListActions from "../../components/layout/ListActions";
import { PageTitle } from "../../components/layout/PageTitle";
import StatCard from "../../components/layout/StatCard";
import SubjectBadge from "../../components/layout/SubjectBadge";
import { TableBody } from "../../components/layout/TableBody";
import { TableCell } from "../../components/layout/TableCell";
import { TableHeader } from "../../components/layout/TableHeader";
import { TableHeaderCell } from "../../components/layout/TableHeaderCell";
import { TableRow } from "../../components/layout/TableRow";
import { useConfirmation } from "@/context/useConfirmationDialog";

const createListValidationSchema = Yup.object({
  nome: Yup.string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(50, "Nome deve ter no máximo 50 caracteres")
    .required("Nome da lista é obrigatório"),
  tipo: Yup.string()
    .oneOf(["predefinida", "vazia"], "Tipo de lista inválido")
    .required("Selecione o tipo da lista"),
});

export default function Dashboard() {
  const router = useRouter();
  const { confirm } = useConfirmation();

  const [isDialogCreatedListOpen, setIsDialogCreatedListOpen] = useState(false);
  const handleDialogOpenChange = () => {
    setIsDialogCreatedListOpen((state) => !state);
  };

  const formik = useFormik({
    initialValues: {
      nome: "",
      tipo: "",
    },
    validationSchema: createListValidationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        console.log("Criando lista com os valores:", values);
        const response = await createList({
          nome: values.nome,
        });
        if (response.success && response.data) {
          console.log("Lista criada com sucesso:", response.data);
          if (values.tipo === "predefinida") {
            router.push(`/dashboard/listas/${response.data.id}/gerar-questoes`);
          } else {
            router.push(`/dashboard/listas/${response.data.id}`);
          }
        }
      } catch (error: any) {
        console.error("Erro ao criar lista:", error);
      } finally {
      }
    },
  });

  const [lists, setLists] = useState<List[]>([]);
  const handleGetLists = async () => {
    try {
      const response = await getMyLists();
      if (response.success && response.data) {
        setLists(response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar listas:", error);
    }
  };

  const handleDeleteList = async (listId: string) => {
    try {
      const confirmed = await confirm({
        title: "Confirmar Exclusão",
        description: "Você tem certeza que deseja excluir esta lista?",
        confirmText: "Excluir",
        cancelText: "Cancelar",
      });
      if (confirmed) {
        await deleteList(listId);
        setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
      }
    } catch (error) {
      console.log("Erro ao deletar lista:", error);
    }
  };

  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);
  const handleToggleDialogConfirmation = () => {
    setIsConfirmationDialogOpen((state) => !state);
  };

  useEffect(() => {
    handleGetLists();
  }, []);

  return (
    <>
      <div>
        <PageTitle>Listas</PageTitle>
        <div className="grid grid-cols-4 gap-6 mt-6">
          <StatCard
            number="3832"
            text="Questões Respondidas"
            icon="lucide:check-circle"
            iconColor="text-success"
          />
          <StatCard
            number={lists.length.toString()}
            icon="lucide:clipboard-list"
            text="Listas criadas"
          />
          <StatCard
            number="2"
            icon="lucide:clipboard-list"
            text="Listas finalizadas"
          />
          <ButtonStatCard
            text="Nova Lista"
            icon="lucide:plus"
            onClick={handleDialogOpenChange}
          />
        </div>
      </div>
      <div className="w-full mt-8 flex gap-6">
        <div className="w-full bg-white-custom rounded-lg pb-6">
          <div className="mb-4 px-6 pt-6">
            <p className="font-head text-body16 text-black-custom font-semibold">
              Suas listas
            </p>
            <p className="mt-2 font-body text-body16 font-normal text-gray-500-custom">
              Aqui estão todas suas listas de exercícios
            </p>
          </div>
          <DataTable>
            <TableHeader>
              <TableHeaderCell>Nome da Lista</TableHeaderCell>
              <TableHeaderCell>Nº de Questões</TableHeaderCell>
              <TableHeaderCell>Matérias</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Ações</TableHeaderCell>
            </TableHeader>
            <TableBody>
              {lists.map((list) => {
                return (
                  <TableRow key={list.id}>
                    <TableCell variant="primary">{list.nome}</TableCell>
                    <TableCell>{list.numeroQuestoes}</TableCell>
                    <TableCell className="px-6">
                      <SubjectBadge codigo="MT" />
                    </TableCell>
                    <TableCell>{list.status}</TableCell>
                    <TableCell className="px-6 w-auto">
                      <ListActions
                        iconButtons={[
                          {
                            type: "icon",
                            iconName: "lucide:pen",
                            onClick: () => console.log("edit list"),
                          },
                          {
                            type: "icon",
                            iconName: "lucide:trash",
                            onClick: () => handleDeleteList(list.id),
                          },
                        ]}
                        textButtons={[
                          {
                            type: "text",
                            text: "Ver",
                            onClick: () =>
                              router.push(`/dashboard/listas/${list.id}`),
                          },
                          {
                            type: "text",
                            text: "Iniciar",
                            onClick: () => console.log("start list"),
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
      <DialogBody
        open={isDialogCreatedListOpen}
        onOpenChange={handleDialogOpenChange}
      >
        <div className="p-6">
          <div className="flex flex-col gap-2">
            <DialogTitle>Crie sua lista</DialogTitle>
            <DialogDescription>
              Selecione o tipo da lista que deseja criar
            </DialogDescription>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-6 mt-6"
            action=""
          >
            <div>
              <Input
                label="Nome da lista"
                placeholder="Digite o nome da sua lista"
                name="nome"
                id="nome"
                type="text"
                value={formik.values.nome}
                onChange={formik.handleChange}
                error={
                  formik.touched.nome && formik.errors.nome
                    ? formik.errors.nome
                    : ""
                }
                onBlur={formik.handleBlur}
              />
            </div>
            <div className="flex flex-col gap-4">
              <p className="font-head text-body16 text-black-custom font-semibold">
                Selecione o tipo da lista
              </p>
              <div className="flex flex-col gap-4">
                <ButtonOptionToggle
                  title="Lista pré-definida"
                  description="Monte sua lista com questões de uma ou mais matérias, separe por competências e habilidades."
                  isSelected={formik.values.tipo === "predefinida"}
                  onClick={() => formik.setFieldValue("tipo", "predefinida")}
                />
                <ButtonOptionToggle
                  title="Lista Vazia"
                  description="Quero personalizar minha lista e adicionar questões manualmente"
                  tip="Dica: esse tipo de lista é ótimo para montar revisões e caderno de erros."
                  isSelected={formik.values.tipo === "vazia"}
                  onClick={() => formik.setFieldValue("tipo", "vazia")}
                />
              </div>
            </div>
            <DialogButtonsWrapper>
              <Button
                fullWidth
                text="Cancelar"
                type="button"
                variant="secondary"
                onClick={handleDialogOpenChange}
              />
              <Button fullWidth text="Criar" type="submit" variant="primary" />
            </DialogButtonsWrapper>
          </form>
        </div>
      </DialogBody>
    </>
  );
}
