"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { Container } from "../../../components/container";
import { Header } from "../../../components/header";
import ListActions from "../../../components/ListActions";
import StatCard from "../../../components/StatCard";
import SubjectBadge from "../../../components/SubjectBadge";
import { useRouter } from "next/navigation";

export default function ListDetails({id}: { id: string }) {
    const router = useRouter();
  
  return (
    <div className=" bg-gray-200-custom w-full min-h-screen">
      <Header />
      <div>
        <Container>
          <div className="w-full py-12 flex-1 bg-gray-100-custom px-6">
            <div>
              <div className="flex items-center justify-between">
                <h1 className="font-head text-head24 font-normal text-black-custom">
                  Lista de matemática #4 H19
                </h1>
              </div>
              <div className="grid grid-cols-4 gap-6 mt-6">
                <StatCard number="20" text="Questões na lista" />
                <StatCard number="Pendente" text="Status da lista" />
                <StatCard number="45 Min" text="Tempo de duração" />

                <div onClick={() => {
                  router.push(`/dashboard/listas/123/start`);
                }} className="cursor-pointer transition-all hover:bg-pink-primary-dark h-[164px] flex flex-col gap-4 justify-center items-center w-full bg-pink-primary rounded-lg p-6">
                  <div className="bg-pink-primary-light h-12 w-12 rounded-full grid place-content-center">
                    <Icon
                      className="text-white-custom text-head24"
                      icon={"lucide:play"}
                    />
                  </div>
                  <p className="text-button16 text-white-custom font-button font-semibold">
                    Iniciar lista
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full mt-8 flex gap-6">
              <div className="w-full bg-white-custom rounded-lg pb-6">
                <div className="mb-4 px-6 pt-6">
                  <p className="font-head text-body16 text-black-custom font-semibold">
                    Questões da lista
                  </p>
                  <p className="mt-2 font-body text-body16 font-normal text-gray-500-custom">
                    Aqui estão todas suas questões dessa lista
                  </p>
                </div>
                <table className="w-full table-auto overflow-x-auto whitespace-nowrap border-collapse border-spacing-[32px]">
                  <thead className="w-full h-[64px]">
                    <tr className="w-full">
                      <th className="w-full px-6 text-left font-body text-sm12 text-gray-500-custom font-medium">
                        Nome da questão
                      </th>
                      <th className="w-full px-6  text-left font-body text-sm12 text-gray-500-custom font-medium">
                        Ano
                      </th>
                      <th className="w-full px-6  text-left font-body text-sm12 text-gray-500-custom font-medium">
                        Identificador
                      </th>

                      <th className="w-full px-6  text-left font-body text-sm12 text-gray-500-custom font-medium">
                        Matéria
                      </th>
                      <th className="w-full px-6  text-left font-body text-sm12 text-gray-500-custom font-medium">
                        Competência
                      </th>
                      <th className="w-full px-6  text-left font-body text-sm12 text-gray-500-custom font-medium">
                        Habilidade
                      </th>
                      <th className="w-full px-6  text-left font-body text-sm12 text-gray-500-custom font-medium">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="w-full">
                    <tr className="h-[64px] ">
                      <td className="px-6 font-body font-semibold text-body16 text-black-custom">
                        Questão #1
                      </td>
                      <td className="px-6 font-body font-semibold text-body16 text-black-custom">
                        2024
                      </td>
                      <td className="px-6 font-body font-normal text-body16 text-black-custom">
                        274942
                      </td>
                      <td className="px-6">
                        <SubjectBadge codigo="MT" />
                      </td>
                      <td className="px-6 font-body font-normal text-body16 text-black-custom">
                        C4
                      </td>
                      <td className="px-6 font-body font-normal text-body16 text-black-custom">
                        H12
                      </td>
                      <td className="px-6  w-auto">
                        <ListActions
                          iconButtons={[
                            {
                              type: "icon",
                              iconName: "lucide:trash",
                              onClick: () => console.log("delete"),
                            },
                            {
                              type: "icon",
                              iconName: "lucide:eye",
                              onClick: () => console.log("view"),
                            },
                          ]}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
