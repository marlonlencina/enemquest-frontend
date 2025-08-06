"use client";

import { useAuth } from "@/context/useAuth";
import { Icon } from "@iconify/react/dist/iconify.js";
import Link from "next/link";
import { PageTitle } from "../components/layout/PageTitle";
import SectionDescription from "../components/layout/SectionDescription";
import SectionTitle from "../components/layout/SectionTitle";
import StatCard from "../components/layout/StatCard";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <>
      <div>
        <div className="w-full rounded-lg bg-gray-200-custom p-6 flex items-center">
          <div>
            <h4 className="font-head text-head24 text-black-custom font-semibold">
              Sua opinião é importante! 🗣️
            </h4>
            <p className="mt-2 font-body text-body14 text-black-custom">
              Nós dê sua opinião sobre o ENEM Quest, sugestões, reporte bugs e
              erros e torne ele incrível para todos. só você pode!
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Link href="https://chat.whatsapp.com/Ijj7nbXUWJs3gVH5qxXGBS?mode=ac_t">
                <div className="grid place-content-center w-fit h-[56px] px-4 rounded-lg bg-blue-baby text-button16 text-white-custom font-button font-bold">
                  Dar minha opinião
                </div>
              </Link>
              <span className="mt-2 text-sm12 text-black-custom font-normal">
                * Você será redirecionado para nossa comunidade ao clicar sobre
                o link.
              </span>
            </div>
          </div>
        </div>

        {user?.nome && (
          <div className="mt-6">
            <PageTitle>
              👏 Bem-vindo, <b className="font-semibold">{user?.nome}</b>
            </PageTitle>
          </div>
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
