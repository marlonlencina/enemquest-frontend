"use client";

import { AreaSectionOptions } from "@/app/components/ButtonAreaToggle";
import { Button } from "@/app/components/form/Button";
import { Input } from "@/app/components/form/Input";
import { Switch } from "@/app/components/form/Switch";
import { Header } from "@/app/components/header";
import { AreaKnowledgeButton } from "@/app/components/layout/AreaKnowledgeGrid";
import { Container } from "@/app/components/layout/Container";
import { PageTitle } from "@/app/components/layout/PageTitle";
import SectionTitle from "@/app/components/layout/SectionTitle";
import { useState } from "react";

export default function ListGenerateQuestions() {
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [configureQuestionsBySubject, setConfigureQuestionsBySubject] =
    useState(false);
  const [allowCompetencies, setAllowCompetencies] = useState(false);
  const [allowHabilities, setAllowHabilities] = useState(false);

  const areas = [
    { id: "matematica", title: "Matemática e suas tecnologias" },
    { id: "ciencias-humanas", title: "Ciências humanas e suas tecnologias" },
    {
      id: "ciencias-natureza",
      title: "Ciências da natureza e suas tecnologias",
    },
    { id: "linguagens", title: "Linguagens, códigos e suas tecnologias" },
  ];

  const handleAreaClick = (areaId: string) => {
    setSelectedAreas((prev) =>
      prev.includes(areaId)
        ? prev.filter((id) => id !== areaId)
        : [...prev, areaId]
    );
  };
  return (
    <div className=" bg-gray-200-custom w-full min-h-screen">
      <Header />
      <div>
        <Container>
          <div className="w-full py-12 flex-1 bg-gray-100-custom px-6">
            <div>
              <PageTitle>
                Vamos adicionar questões à sua lista: Lista de exercícios #1
              </PageTitle>
            </div>
            <div className="w-full bg-white-custom p-6 mt-6 flex flex-col gap-6">
              <div>
                <div>
                  <SectionTitle>Configurações da lista</SectionTitle>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-6 mt-4">
                    <Input
                      label="Título da lista"
                      placeholder="Digite o título da lista"
                      disabled
                      value={"Nome da lista"}
                    />
                  </div>
                  <div>
                    <Input
                      label="Descrição da lista"
                      placeholder="Digite a descrição da lista"
                      type="textarea"
                    />
                  </div>
                </div>
              </div>
              <div className=" flex flex-col gap-4">
                <div>
                  <SectionTitle>Configure as questões</SectionTitle>
                </div>
                {!configureQuestionsBySubject && (
                  <div className=" grid grid-cols-2 gap-6">
                    <Input
                      label="Número de questões total"
                      type="number"
                      placeholder="Digite o número de questões"
                    />
                  </div>
                )}
                <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                  <div className="flex items-center justify-between h-[56px]">
                    <p className="font-body text-body16 text-black-custom font-normal">
                      Configurar o número de questões por matéria?
                    </p>
                    <Switch
                      checked={configureQuestionsBySubject}
                      onCheckedChange={setConfigureQuestionsBySubject}
                    />
                  </div>
                  <div className="flex items-center justify-between h-[56px]">
                    <p className="font-body text-body16 text-black-custom font-normal">
                      Configurar as competências?
                    </p>
                    <Switch
                      checked={allowCompetencies}
                      onCheckedChange={setAllowCompetencies}
                    />
                  </div>
                  <div className="flex items-center justify-between h-[56px]">
                    <p className="font-body text-body16 text-black-custom font-normal">
                      Configurar as habilidades?
                    </p>
                    <Switch
                      checked={allowHabilities}
                      onCheckedChange={setAllowHabilities}
                    />
                  </div>
                  <div className="flex items-center justify-between h-[56px]">
                    <p className="font-body text-body16 text-black-custom font-normal">
                      Pular questões já respondidas?
                    </p>
                    <Switch
                      checked={allowHabilities}
                      onCheckedChange={setAllowHabilities}
                    />
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <SectionTitle>Selecione as matérias</SectionTitle>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-6">
                  {areas.map((area) => (
                    <AreaKnowledgeButton
                      key={area.id}
                      text={area.title}
                      isSelected={selectedAreas.includes(area.id)}
                      onClick={() => handleAreaClick(area.id)}
                    />
                  ))}
                </div>
              </div>
              {selectedAreas.length > 0 && (
                <div className="">
                  <div>
                    <SectionTitle>Configure as matérias</SectionTitle>
                  </div>
                  <div className="grid grid-cols-2 gap-6 mt-6">
                    {selectedAreas.map((areaId) => {
                      const area = areas.find((a) => a.id === areaId);
                      return (
                        <AreaSectionOptions
                          key={areaId}
                          text={area?.title || ""}
                          isSelected={true}
                          isNumberAllowed={configureQuestionsBySubject}
                          allowCompetence={allowCompetencies}
                          allowHability={allowHabilities}
                          onClick={() =>
                            console.log(`${area?.title} configured`)
                          }
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            <div className="mt-12">
              <Button
                disabled
                text="Gerar questões"
                onClick={() => console.log("Configurações salvas")}
              />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
