"use client";

import { useAuth } from "@/context/useAuth";
import { Icon } from "@iconify/react/dist/iconify.js";
import { PageTitle } from "../components/layout/PageTitle";
import SectionDescription from "../components/layout/SectionDescription";
import SectionTitle from "../components/layout/SectionTitle";
import StatCard from "../components/layout/StatCard";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <>
      <div>
        {user?.nome && (
          <PageTitle>
            👏 Bem-vindo, <b className="font-semibold">{user?.nome}</b>
          </PageTitle>
        )}
        <div className="grid grid-cols-4 mt-6 gap-6">
          <div className="col-span-2 w-full h-[164px] rounded-lg bg-blue-primary p-6 flex items-center">
            <div>
              <h4 className="font-head text-head24 text-white-custom font-semibold">
                Olá, estudante!
              </h4>
              <p className="mt-2 font-body text-body14 text-white-custom">
                O ENEM Quest encontra-se em desenvolvimento, conto com você para
                nos ajudar a torná-lo uma ferramenta poderosa para seus estudos!
              </p>
            </div>
          </div>
          <StatCard text="Patente" number="Iniciante" />
          <StatCard text="Ranking" number="#412" />
        </div>
      </div>
      <div className="w-full mt-8 flex gap-6">
        <div className="w-full bg-white-custom p-6 rounded-lg">
          <div>
            <SectionTitle>Encontre questões facilmente</SectionTitle>
            <SectionDescription>
              Use nossa ferramente de buscas para encontrar questões pesquisando
              por: texto, comando ou fonte
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
      {/* <div className="w-full mt-8">
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
      </div> */}
    </>
  );
}
