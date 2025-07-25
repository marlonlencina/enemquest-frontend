"use client";

import { Button } from "@/app/components/form/Button";
import { Input } from "@/app/components/form/Input";
import {
  DialogBody,
  DialogButtonsWrapper,
  DialogDescription,
  DialogTitle,
} from "@/app/components/layout/dialog";
import { ButtonOptionToggle } from "@/app/components/listas/ButtonOptionToggle";
import { useConfirmation } from "@/context/useConfirmationDialog";
import { useLists, useListsStats } from "@/context/useLists";
import { getListStatus } from "@/utils/getListStatus";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

const createListValidationSchema = Yup.object({
  nome: Yup.string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(50, "Nome deve ter no máximo 50 caracteres")
    .required("Nome da lista é obrigatório"),
  tipo: Yup.string()
    .oneOf(["predefinida", "vazia"], "Tipo de lista inválido")
    .required("Selecione o tipo da lista"),
});

const editListValidationSchema = Yup.object({
  nome: Yup.string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(50, "Nome deve ter no máximo 50 caracteres")
    .required("Nome da lista é obrigatório"),
});

export default function Dashboard() {
  const router = useRouter();
  const { lists, deleteExistingList, createNewList, updateExistingList } =
    useLists();
  const { userStats } = useListsStats();
  const { confirm } = useConfirmation();

  const [isDialogCreatedListOpen, setIsDialogCreatedListOpen] = useState(false);
  const handleDialogOpenChange = () => {
    setIsDialogCreatedListOpen((state) => !state);
  };

  const [isDialogEditListOpen, setIsDialogEditListOpen] = useState(false);
  const handleDialogEditOpenChange = () => {
    setIsDialogEditListOpen((state) => !state);
  };
  const handleDialogEdit = (listId: string) => {
    const list = lists.find((list) => list.id === listId);
    if (list) {
      formikEdit.setValues({
        nome: list.nome,
        id: list.id,
      });
      setIsDialogEditListOpen(true);
    }
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
        const list = await createNewList({
          nome: values.nome,
        });

        if (!list) {
          console.error("Erro ao criar lista: resposta inválida");
          return;
        }

        if (values.tipo === "predefinida") {
          router.push(`/dashboard/listas/${list.id}/gerar-questoes`);
        } else {
          router.push(`/dashboard/listas/${list.id}`);
        }
      } catch (error: any) {
        console.error("Erro ao criar lista:", error);
      } finally {
      }
    },
  });

  const formikEdit = useFormik({
    initialValues: {
      id: "",
      nome: "",
    },
    validationSchema: editListValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await updateExistingList(values.id, {
          nome: values.nome,
        });
        console.log("Editando lista com os valores:", values);
        console.log("Lista editada com sucesso:", values);
        handleDialogEditOpenChange();
      } catch (error: any) {
        console.error("Erro ao editar lista:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleDeleteList = async (listId: string) => {
    try {
      const confirmed = await confirm({
        title: "Confirmar Exclusão",
        description: "Você tem certeza que deseja excluir esta lista?",
        confirmText: "Excluir",
        cancelText: "Cancelar",
      });
      if (confirmed) {
        await deleteExistingList(listId);
      }
    } catch (error) {
      console.log("Erro ao deletar lista:", error);
    }
  };

  return (
    <>
      <div>
        <PageTitle>Listas</PageTitle>
        <div className="grid grid-cols-4 gap-6 mt-6">
          <StatCard
            number={
              userStats?.totalQuestoesRespondidas
                ? `${userStats.totalQuestoesRespondidas}`
                : "0"
            }
            text="Questões Respondidas"
            icon="lucide:check-circle"
            iconColor="text-success"
          />
          <StatCard
            number={lists.length ? `${lists.length}` : "0"}
            icon="lucide:clipboard-list"
            text="Listas criadas"
          />
          <StatCard
            number={
              userStats?.totalListasFinalizadas
                ? `${userStats.totalListasFinalizadas}`
                : "0"
            }
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
                    <TableCell>{getListStatus(list.status)}</TableCell>
                    <TableCell className="px-6 w-auto">
                      <ListActions
                        iconButtons={[
                          {
                            type: "icon",
                            iconName: "lucide:pen",
                            onClick: () => handleDialogEdit(list.id),
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
                            onClick: () => {},
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
      <DialogBody
        open={isDialogEditListOpen}
        onOpenChange={handleDialogEditOpenChange}
      >
        <div className="p-6">
          <div className="flex flex-col gap-2">
            <DialogTitle>Edite sua lista</DialogTitle>
            <DialogDescription>
              Edite as informações da sua lista
            </DialogDescription>
          </div>
          <form
            onSubmit={formikEdit.handleSubmit}
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
                value={formikEdit.values.nome}
                onChange={formikEdit.handleChange}
                error={
                  formikEdit.touched.nome && formikEdit.errors.nome
                    ? formikEdit.errors.nome
                    : ""
                }
                onBlur={formikEdit.handleBlur}
              />
            </div>
            <DialogButtonsWrapper>
              <Button
                fullWidth
                text="Cancelar"
                type="button"
                variant="secondary"
                onClick={handleDialogEditOpenChange}
              />
              <Button fullWidth text="Editar" type="submit" variant="primary" />
            </DialogButtonsWrapper>
          </form>
        </div>
      </DialogBody>
    </>
  );
}
