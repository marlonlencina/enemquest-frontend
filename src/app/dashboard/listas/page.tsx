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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Header } from "../../components/header";
import { ButtonStatCard } from "../../components/layout/ButtonStatCard";
import { Container } from "../../components/layout/Container";
import { DataTable } from "../../components/layout/DataTable";
import ListActions from "../../components/layout/ListActions";
import StatCard from "../../components/layout/StatCard";
import SubjectBadge from "../../components/layout/SubjectBadge";
import { TableBody } from "../../components/layout/TableBody";
import { TableCell } from "../../components/layout/TableCell";
import { TableHeader } from "../../components/layout/TableHeader";
import { TableHeaderCell } from "../../components/layout/TableHeaderCell";
import { TableRow } from "../../components/layout/TableRow";
import { PageTitle } from "../../components/layout/PageTitle";

export default function Dashboard() {
  const router = useRouter();
  const [isDialogCreatedListOpen, setIsDialogCreatedListOpen] = useState(false);
  const handleDialogOpenChange = () => {
    setIsDialogCreatedListOpen((state) => !state);
  };

  return (
    <div className=" bg-gray-200-custom w-full min-h-screen">
      <Header />
      <div>
        <Container>
          <div className="w-full py-12 flex-1 bg-gray-100-custom px-6">
            <div>
              <PageTitle>
                Listas
              </PageTitle>
              <div className="grid grid-cols-4 gap-6 mt-6">
                <StatCard
                  number="3832"
                  text="Questões Respondidas"
                  icon="lucide:check-circle"
                  iconColor="text-success"
                />
                <StatCard
                  number="4"
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
                    <TableHeaderCell>Qntd. de Questões</TableHeaderCell>
                    <TableHeaderCell>Matérias</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                    <TableHeaderCell>Ações</TableHeaderCell>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell variant="primary">
                        Lista de matemática #4 H19
                      </TableCell>
                      <TableCell>10</TableCell>
                      <TableCell className="px-6">
                        <SubjectBadge codigo="MT" />
                      </TableCell>
                      <TableCell>Não Iniciada</TableCell>
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
                              onClick: () => console.log("delete list"),
                            },
                            /* {
                              type: "icon",
                              iconName: "lucide:download",
                              onClick: () => console.log("export list"),
                            }, */
                          ]}
                          textButtons={[
                            {
                              type: "text",
                              text: "Ver",
                              onClick: () => router.push("/dashboard/listas/1"),
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
                  </TableBody>
                </DataTable>
              </div>
            </div>
          </div>
        </Container>
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
          <form className="flex flex-col gap-6 mt-6" action="">
            <div>
              <Input
                label="Nome da lista"
                placeholder="Digite o nome da sua lista"
                name="listName"
                type="text"
                required
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
                  isSelected={true}
                  onClick={() => console.log("Lista pré-definida selected")}
                />
                <ButtonOptionToggle
                  title="Lista Vazia"
                  description="Quero personalizar minha lista e adicionar questões manualmente"
                  tip="Dica: esse tipo de lista é ótimo para montar revisões e caderno de erros."
                  onClick={() => console.log("Lista vazia selected")}
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
              <Button
                fullWidth
                text="Criar"
                type="button"
                variant="primary"
                onClick={() => {
                  router.push("/dashboard/listas/123/gerar-questoes");
                }}
              />
            </DialogButtonsWrapper>
          </form>
        </div>
      </DialogBody>
    </div>
  );
}
