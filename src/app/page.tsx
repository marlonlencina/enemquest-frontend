import { getAllAreas, getQuestions } from "@/server/requests";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import logoText from "../assets/logotext.svg";
import AreaCard from "./components/AreaCard";
import { Container } from "./components/container";
import { Header } from "./components/header";
import { Area } from "./types/exam";
import { Questao } from "./types/question";
import { getBgColorByArea } from "./utils/getBgColorByArea";

export const metadata: Metadata = {
  title: "Dev ENEM - Banco de Questões | Últimas Questões do ENEM",
  description:
    "O maior banco de dados de questões do ENEM. Encontre questões organizadas por ano, área, habilidade e competência. Prepare-se para o ENEM com as últimas questões disponíveis.",
  keywords: "ENEM, questões, banco de dados, vestibular, educação, preparação",
  openGraph: {
    title: "ENEM - Banco de Questões",
    description:
      "O maior banco de dados de questões do ENEM disponível para você",
    type: "website",
  },
};

export default async function Home() {
  let questions: Questao[] = [];
  let areas: Area[] = [];
  try {
    const dataQuestions = await getQuestions({ page: 1, limit: 10 });
    const dataAreas = await getAllAreas();
    console.log("dataAreas", dataAreas);
    questions = dataQuestions.questoes;
    areas = dataAreas.data;
  } catch (error) {
    console.error("Error fetching last questions:", error);
  }

  return (
    <div className="w-full">
      {/* <Header title="Dashboard" /> */}
      <div className="flex flex-col w-full bg-blue-primary-dark ">
        <Header variant="colored" />
        <Container>
          <div className="w-full py-12 flex-1 ">
            <div>
              <h1 className="font-head text-head40 font-light text-white-custom">
                O <b className="font-semibold">banco de questões</b>
                {""} que vai <br /> tornar o ENEM uma Quest fácil
              </h1>
              <p className="mt-4 font-normal font-head text-body20 text-white-custom max-w-[560px]">
                Explore milhares de questões do ENEM, salve-as para você, crie
                listas de exercícios e suba no ranking.
                <br />
              </p>
            </div>
            {/* <div className="mt-6">
              <Button variant="light">Gerar lista de questões</Button>
            </div> */}
          </div>
        </Container>
      </div>
      <div className="bg-gray-100-custom pt-12">
        <Container>
          <div className="grid grid-cols-4 gap-8">
            {areas.map((area) => (
              <AreaCard
                key={area.id}
                href={`/areas/${area.id}`}
                bgColor={getBgColorByArea(area.codigo)}
                title={area.nome}
              />
            ))}
          </div>
        </Container>
        {/* <Container>
          <QuestionsWithFilters initialQuestions={questions} />
        </Container> */}
      </div>
      <footer className="w-full bg-black-custom mt-12">
        <Container>
          <div className="w-full py-12 flex ">
            <div>
              <Link href={"/"} className="flex items-center gap-3">
                <Image width={98} src={logoText} alt="logo texto" />
              </Link>
              <p className="mt-6 font-normal font-body text-body14 text-white-custom max-w-[480px]">
                Esse é um projeto completamente independente que visa ajudar
                outros estudantes a se preparar para a maior prova de concurso
                do Brasil. <br /> Todos dados nesse app são de domínio público.
              </p>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
