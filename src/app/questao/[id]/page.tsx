import { Container } from "@/app/components/container";
import BackButton from "@/app/components/BackButton";
import GabaritoSection from "@/app/components/GabaritoSection";
import { Header } from "@/app/components/header";
import { QuestaoCompleta } from "@/app/types/question";
import { getQuestionById } from "@/server/requests";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

interface QuestaoPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: QuestaoPageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const response = await getQuestionById(id);
    const question = response.data as QuestaoCompleta;

    if (!question) {
      return {
        title: "Questão não encontrada",
        description: "A questão solicitada não foi encontrada.",
      };
    }

    return {
      title: `Questão ${question.posicao} - ENEM ${question.ano} ${question.prova}`,
      description: `Questão ${question.posicao} do ENEM ${question.ano} - ${
        question.prova
      }. Habilidade: ${question.habilidade?.descricao || "N/A"}. Área: ${
        question.habilidade?.competencia?.area?.nome || "N/A"
      }.`,
      keywords: [
        "ENEM",
        question.ano.toString(),
        question.prova,
        "questão",
        question.habilidade?.competencia?.area?.nome || "",
        "vestibular",
        "educação",
      ].filter(Boolean),
      openGraph: {
        title: `Questão ${question.posicao} - ENEM ${question.ano} ${question.prova}`,
        description: `Questão ${question.posicao} do ENEM ${question.ano} - ${question.prova}`,
        images: question.imagemUrl ? [{ url: question.imagemUrl }] : [],
      },
    };
  } catch {
    return {
      title: "Questão não encontrada",
      description: "A questão solicitada não foi encontrada.",
    };
  }
}

export default async function Questao({ params }: QuestaoPageProps) {
  const { id } = await params;

  let question: QuestaoCompleta | null = null;

  try {
    const response = await getQuestionById(id);
    question = response.data as QuestaoCompleta;
  } catch (error) {
    console.error("Error fetching question:", error);
    notFound();
  }

  if (!question) {
    notFound();
  }

  return (
    <div>
      <Header />

      <Container>
        <div className="mt-8">
          <BackButton href="/" />
        </div>
        <div className="flex items-start mt-6 gap-8 ">
          <div className="max-w-[488px] w-full  border border-gray-200-custom rounded-[4px]">
            <div className="p-6">
              <h4 className="font-head text-body18 font-semibold text-black-custom">
                ENEM {question.ano} {question.prova}
              </h4>
              <h5 className="font-head text-body16 font-semibold text-black-custom mt-4">
                Questão {question.posicao} - {question.provaCorReferencia}
              </h5>
              <div className="flex items-center gap-2 mt-2">
                <div
                  className={`rounded-full h-[8px] w-[8px] bg-mt-exam`}
                ></div>
                <p className="leading-tight font-medium font-body text-body16 text-gray-500-custom">
                  {question.habilidade?.competencia?.area?.nome ||
                    "Área não disponível"}
                </p>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200-custom">
              <div>
                <h6 className="font-head text-body16 font-semibold text-black-custom">
                  Habilidade {question.habilidade?.codigo || ""}
                </h6>
                <p className="leading-tight font-medium font-body text-body16 text-gray-500-custom mt-2">
                  {question.habilidade?.descricao || "Descrição não disponível"}
                </p>
                <div className="mt-4">
                  <span className="leading-tight font-medium font-body text-body16 text-gray-500-custom ">
                    Essa habilidade faz parte da{" "}
                    <u>
                      competência{" "}
                      {question.habilidade?.competencia?.codigo || ""}.
                    </u>
                  </span>
                </div>
              </div>
            </div>
            <GabaritoSection gabarito={question.gabarito} />
          </div>
          <div className="bg-white  rounded-[4px] h-full w-full max-h-[800px] border border-gray-200-custom overflow-auto">
            <div className="p-16">
              {question.temImagem && question.imagemUrl ? (
                <Image
                  width={800}
                  height={600}
                  alt={`Imagem da questão ${question.posicao} - ENEM ${question.ano}`}
                  src={question.imagemUrl}
                  className="w-full h-auto object-contain "
                />
              ) : (
                <div className="flex items-center justify-center h-full min-h-[400px] text-gray-500-custom">
                  <p>Esta questão não possui imagem</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
