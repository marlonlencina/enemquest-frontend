import { getAllAreas } from "@/server/generalRequests";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Metadata } from "next";
import { Header } from "../components/header";
import AreaCard from "../components/layout/AreaCard";
import { Container } from "../components/layout/Container";
import { PageTitle } from "../components/layout/PageTitle";
import SectionDescription from "../components/layout/SectionDescription";
import SectionTitle from "../components/layout/SectionTitle";
import StatCard from "../components/layout/StatCard";
import { Area } from "../types/exam";
import { getBgColorByArea } from "../utils/getBgColorByArea";

export const metadata: Metadata = {
  title: "Dashboard",
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

export default async function Dashboard() {
  let areas: Area[] = [];
  try {
    const dataAreas = await getAllAreas();
    areas = dataAreas.data;
  } catch (error) {
    console.error("Error fetching last questions:", error);
  }
  return (
    <div className=" bg-gray-200-custom w-full min-h-screen">
      <Header />
      <div>
        <Container>
          <div className="w-full py-12 flex-1 bg-gray-100-custom px-6">
            <div>
              <PageTitle>
                👏 Bem-vindo, <b className="font-semibold">Marlon</b>
              </PageTitle>
              <div className="grid grid-cols-4 mt-6 gap-6">
                <div className="col-span-2 w-full h-[164px] rounded-lg bg-blue-primary "></div>
                <StatCard text="Patente" number="Iniciante" />
                <StatCard text="Ranking" number="#412" />
              </div>
            </div>
            <div className="w-full mt-8 flex gap-6">
              <div className="w-full bg-white-custom p-6 rounded-lg">
                <div>
                  <SectionTitle>Encontre questões facilmente</SectionTitle>
                  <SectionDescription>
                    Use nossa ferramente de buscas para encontrar questões
                    pesquisando por: texto, comando ou fonte
                  </SectionDescription>
                </div>
                <div className="mt-6">
                  <div className="flex items-center gap-4 border border-gray-200-custom rounded-lg px-4 h-[56px]">
                    <Icon
                      className="text-gray-400-custom text-head24"
                      icon="lucide:search"
                    />
                    <input
                      type="text"
                      placeholder="Busque por questões"
                      className="h-full w-full text-black-custom text-body18 outline-none placeholder:text-gray-400-custom"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full mt-8">
              <PageTitle>Explore as áreas do ENEM</PageTitle>
              <div className="grid grid-cols-4 gap-6 mt-6">
                {areas.map((area) => (
                  <AreaCard
                    key={area.id}
                    href={`/areas/${area.id}`}
                    bgColor={getBgColorByArea(area.codigo)}
                    title={area.nome}
                  />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </div>
      <footer className="">
        <Container>
          <div className="flex items-center justify-between w-full bg-gray-300-custom py-12 px-6">
            <p className="font-body font-normal text-body14 text-black-custom">
              © 2025 ENEMQuest. Versão 1.0.0.
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
}
