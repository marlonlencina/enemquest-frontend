"use client";

import { Button } from "@/app/components/form/Button";
import { Input } from "@/app/components/form/Input";
import { Switch } from "@/app/components/form/Switch";
import { AreaKnowledgeButton } from "@/app/components/layout/AreaKnowledgeGrid";
import { PageTitle } from "@/app/components/layout/PageTitle";
import SectionTitle from "@/app/components/layout/SectionTitle";
import { AreaSectionOptions } from "@/app/components/listas/ButtonAreaToggle";
import { useGeneralExamInfo } from "@/context/useGeneralExamInfo";
import { generateQuestionsForList } from "@/server/listRequests";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { use } from "react";
import * as Yup from "yup";

const generateQuestionsValidationSchema = Yup.object({
  quantidadeStrategy: Yup.string()
    .oneOf(["total", "por_area", "especifica_por_area"], "Estratégia inválida")
    .required("Estratégia é obrigatória"),
  quantidadeTotal: Yup.number()
    .positive("Quantidade deve ser positiva")
    .integer("Quantidade deve ser um número inteiro")
    .max(1000, "Quantidade máxima é 1000 questões")
    .when("quantidadeStrategy", {
      is: "total",
      then: (schema) => schema.required("Número de questões é obrigatório"),
      otherwise: (schema) => schema.nullable(),
    }),
  quantidadePorMateria: Yup.number()
    .positive("Quantidade deve ser positiva")
    .integer("Quantidade deve ser um número inteiro")
    .max(500, "Quantidade máxima por matéria é 500 questões")
    .when("quantidadeStrategy", {
      is: "por_area",
      then: (schema) =>
        schema.required("Número de questões por matéria é obrigatório"),
      otherwise: (schema) => schema.nullable(),
    }),
  quantidadesPorArea: Yup.object().when("quantidadeStrategy", {
    is: "especifica_por_area",
    then: (schema) => schema.required("Quantidades por área são obrigatórias"),
    otherwise: (schema) => schema.nullable(),
  }),
  configurarPorMateria: Yup.boolean(),
  configurarCompetencias: Yup.boolean(),
  configurarHabilidades: Yup.boolean(),
  pularQuestoesRespondidas: Yup.boolean(),
  areas: Yup.array()
    .of(Yup.string())
    .min(1, "Selecione pelo menos uma área de conhecimento")
    .required("Áreas de conhecimento são obrigatórias"),
});

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}
export default function ListGenerateQuestions({ params }: PageProps) {
  const { id } = use(params);
  const { areas, competencias, habilidades } = useGeneralExamInfo();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      quantidadeStrategy: "total" as
        | "total"
        | "por_area"
        | "especifica_por_area",
      quantidadeTotal: "",
      quantidadePorMateria: "",
      quantidadesPorArea: {} as Record<string, number>,
      configurarPorMateria: false,
      configurarCompetencias: false,
      configurarHabilidades: false,
      pularQuestoesRespondidas: false,
      areas: [] as string[],
      competenciasPorArea: {} as Record<string, string[]>,
      habilidadesPorArea: {} as Record<string, string[]>,
    },
    validationSchema: generateQuestionsValidationSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values) => {
      const payload = {
        quantidadeStrategy: values.quantidadeStrategy,
        quantidadeTotal:
          values.quantidadeStrategy === "total"
            ? parseInt(values.quantidadeTotal as string)
            : undefined,
        quantidadePorArea:
          values.quantidadeStrategy === "por_area"
            ? parseInt(values.quantidadePorMateria as string)
            : undefined,
        quantidadesPorArea:
          values.quantidadeStrategy === "especifica_por_area"
            ? values.quantidadesPorArea
            : undefined,
        areas: values.areas,
        competenciasPorArea: values.configurarCompetencias ? values.competenciasPorArea : undefined,
        habilidadesPorArea: values.configurarHabilidades ? values.habilidadesPorArea : undefined,
        pularQuestoesResolvidas: values.pularQuestoesRespondidas,
        pularQuestoesEmOutrasListas: false,
        pularQuestoesAcertadas: false,
        pularQuestoesErradas: false,
      };

      console.log("Gerando questões:", payload, "para lista:", id);
      // TODO: Implementar chamada para API

      try {
        const response = await generateQuestionsForList(id, payload);
        console.log("Questões geradas com sucesso:", response);
        router.push(`/dashboard/listas/${id}`);
      } catch (error) {
        console.error("Erro ao gerar questões:", error);
      }
    },
  });

  const handleAreaClick = (areaId: string) => {
    const currentAreas = formik.values.areas;
    const newAreas = currentAreas.includes(areaId)
      ? currentAreas.filter((id) => id !== areaId)
      : [...currentAreas, areaId];

    formik.setFieldValue("areas", newAreas);

    // Se removendo uma área, remove também sua quantidade específica
    if (currentAreas.includes(areaId)) {
      const newQuantidadesPorArea = { ...formik.values.quantidadesPorArea };
      delete newQuantidadesPorArea[areaId];
      formik.setFieldValue("quantidadesPorArea", newQuantidadesPorArea);
    }
  };

  const handleQuantidadePorAreaChange = (
    areaId: string,
    quantidade: number
  ) => {
    formik.setFieldValue(`quantidadesPorArea.${areaId}`, quantidade);
  };

  const handleCompetenciasChange = (areaId: string, competencias: string[]) => {
    formik.setFieldValue(`competenciasPorArea.${areaId}`, competencias);
  };

  const handleHabilidadesChange = (areaId: string, habilidades: string[]) => {
    formik.setFieldValue(`habilidadesPorArea.${areaId}`, habilidades);
  };
  // Atualiza a estratégia quando configurarPorMateria muda
  const handleConfigurarPorMateriaChange = (checked: boolean) => {
    formik.setFieldValue("configurarPorMateria", checked);
    formik.setFieldValue(
      "quantidadeStrategy",
      checked ? "especifica_por_area" : "total"
    );
  };

  return (
    <form onSubmit={formik.handleSubmit} className="w-full">
      <div>
        <PageTitle>
          Vamos adicionar questões à sua lista: Lista de exercícios #1
        </PageTitle>
      </div>
      <div className="w-full bg-white-custom p-6 mt-6 flex flex-col gap-6">
        <div className=" flex flex-col gap-4">
          <div>
            <SectionTitle>Configure as questões</SectionTitle>
          </div>
          {!formik.values.configurarPorMateria && (
            <div className=" grid grid-cols-2 gap-6">
              <Input
                label="Número de questões total"
                type="number"
                placeholder="Digite o número de questões"
                id="quantidadeTotal"
                name="quantidadeTotal"
                value={formik.values.quantidadeTotal}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.quantidadeTotal &&
                  formik.errors.quantidadeTotal
                    ? formik.errors.quantidadeTotal
                    : undefined
                }
              />
            </div>
          )}
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            <div className="flex items-center justify-between h-[56px]">
              <p className="font-body text-body16 text-black-custom font-normal">
                Configurar o número de questões por matéria?
              </p>
              <Switch
                checked={formik.values.configurarPorMateria}
                onCheckedChange={handleConfigurarPorMateriaChange}
              />
            </div>
            <div className="flex items-center justify-between h-[56px]">
              <p className="font-body text-body16 text-black-custom font-normal">
                Configurar as competências?
              </p>
              <Switch
                checked={formik.values.configurarCompetencias}
                onCheckedChange={(checked) =>
                  formik.setFieldValue("configurarCompetencias", checked)
                }
              />
            </div>
            <div className="flex items-center justify-between h-[56px]">
              <p className="font-body text-body16 text-black-custom font-normal">
                Configurar as habilidades?
              </p>
              <Switch
                checked={formik.values.configurarHabilidades}
                onCheckedChange={(checked) =>
                  formik.setFieldValue("configurarHabilidades", checked)
                }
              />
            </div>
            <div className="flex items-center justify-between h-[56px]">
              <p className="font-body text-body16 text-black-custom font-normal">
                Pular questões já respondidas?
              </p>
              <Switch
                checked={formik.values.pularQuestoesRespondidas}
                onCheckedChange={(checked) =>
                  formik.setFieldValue("pularQuestoesRespondidas", checked)
                }
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
                text={area.nome}
                isSelected={formik.values.areas.includes(area.id)}
                onClick={() => handleAreaClick(area.id)}
              />
            ))}
          </div>
        </div>
        {formik.values.areas.length > 0 && (
          <div className="">
            <div>
              <SectionTitle>Configure as matérias</SectionTitle>
            </div>
            <div className="grid grid-cols-2 gap-6 mt-6">
              {formik.values.areas.map((areaId: string) => {
                const area = areas.find((a) => a.id === areaId);
                return (
                  <AreaSectionOptions
                    key={areaId}
                    text={area?.nome || ""}
                    isSelected={true}
                    isNumberAllowed={formik.values.configurarPorMateria}
                    allowCompetence={formik.values.configurarCompetencias}
                    allowHability={formik.values.configurarHabilidades}
                    onQuantityChange={(quantidade: number) =>
                      handleQuantidadePorAreaChange(areaId, quantidade)
                    }
                    currentQuantity={
                      formik.values.quantidadesPorArea[areaId] || 0
                    }
                    onCompetenciasChange={(competencias: string[]) =>
                      handleCompetenciasChange(areaId, competencias)
                    }
                    onHabilidadesChange={(habilidades: string[]) =>
                      handleHabilidadesChange(areaId, habilidades)
                    }
                    currentCompetencias={
                      formik.values.competenciasPorArea?.[areaId] || []
                    }
                    currentHabilidades={
                      formik.values.habilidadesPorArea?.[areaId] || []
                    }
                    areaCompetencias={competencias.filter(c => c.areaId === areaId)}
                    areaHabilidades={habilidades.filter(h => {
                      const competencia = competencias.find(c => c.id === h.competenciaId);
                      return competencia?.areaId === areaId;
                    })}
                    onClick={() => console.log(`${area?.nome} configured`)}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div className="mt-12">
        <Button
          type="submit"
          text="Gerar questões"
          onClick={() => formik.handleSubmit()}
          disabled={
            !formik.isValid ||
            formik.values.areas.length === 0 ||
            formik.isSubmitting
          }
        />
      </div>
    </form>
  );
}
