import { getQuestions } from "@/server/requests";
import { Metadata } from "next";
import Button from "./components/Button";
import { Container } from "./components/container";
import { Header } from "./components/header";
import QuestionsWithFilters from "./components/QuestionsWithFilters";
import { Questao } from "./types/question";

export const metadata: Metadata = {
  title: "ENEM - Banco de Questões | Últimas Questões do ENEM",
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
  try {
    const data = await getQuestions({ page: 1, limit: 10 });
    questions = data.questoes;
  } catch (error) {
    console.error("Error fetching last questions:", error);
  }

  return (
    <div className="w-full pb-12">
      {/* <Header title="Dashboard" /> */}
      <div className="flex flex-col w-full bg-blue-primary ">
        <Header variant="colored" title="Dashboard" />
        <Container>
          <div className="w-full py-12 flex-1 ">
            <div>
              <h1 className="font-head text-head32 font-normal text-white-custom">
                O maior{" "}
                <b>
                  banco de dados de questões <br /> do ENEM
                </b>{" "}
                disponível para você.
              </h1>
              <p className="mt-2 font-normal font-body text-body16 text-white-custom opacity-75">
                Encontre questões organizadas por ano, área, habilidade,
                competência e mais
              </p>
            </div>
            {/* <div className="mt-6">
              <Button variant="light">Gerar lista de questões</Button>
            </div> */}
          </div>
        </Container>
      </div>
      <Container>
        <QuestionsWithFilters initialQuestions={questions} />
      </Container>
     {/*  <footer className="w-full bg-black-custom mt-8">
        <Container>
          <div className="w-full py-12 flex items-center justify-center">
            <p className="mt-2 font-normal font-body text-body16 text-white-custom text-center">
              Esse é um projeto independente que visa ajudar outros estudantes a
              se preparar para a maior prova de concurso do Brasil. <br /> Todos
              dados nesse app são de domínio público.
            </p>
          </div>
        </Container>
      </footer> */}
    </div>
  );
}
