"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";
import { Container } from "../../components/container";
import { Header } from "../../components/header";
import ListActions from "../../components/ListActions";
import StatCard from "../../components/StatCard";
import SubjectBadge from "../../components/SubjectBadge";
import { Area } from "../../types/exam";

export default function Dashboard() {
  const router = useRouter();


  return (
    <div className=" bg-gray-200-custom w-full min-h-screen">
      <Header />
      <div>
        <Container>
          <div className="w-full py-12 flex-1 bg-gray-100-custom px-6">
            <div>
              <h1 className="font-head text-head24 font-normal text-black-custom">
                Listas
              </h1>
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
                <div className="cursor-pointer transition-all hover:bg-pink-primary-dark h-[164px] flex flex-col gap-4 justify-center items-center w-full bg-pink-primary rounded-lg p-6">
                  <div className="bg-pink-primary-light h-12 w-12 rounded-full grid place-content-center">
                    <Icon
                      className="text-white-custom text-head24"
                      icon={"lucide:plus"}
                    />
                  </div>
                  <p className="text-button16 text-white-custom font-button font-semibold">
                    Nova Lista
                  </p>
                </div>
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
                <table className="w-full table-auto overflow-x-auto whitespace-nowrap border-collapse border-spacing-[32px]">
                  <thead className="w-full h-[64px]">
                    <tr className="w-full">
                      <th className="w-full px-6 text-left font-body text-sm12 text-gray-500-custom font-medium">
                        Nome da Lista
                      </th>
                      <th className="w-full px-6  text-left font-body text-sm12 text-gray-500-custom font-medium">
                        Qntd. de Questões
                      </th>
                      <th className="w-full px-6  text-left font-body text-sm12 text-gray-500-custom font-medium">
                        Matérias
                      </th>
                      <th className="w-full px-6  text-left font-body text-sm12 text-gray-500-custom font-medium">
                        Status
                      </th>
                      <th className="w-full px-6  text-left font-body text-sm12 text-gray-500-custom font-medium">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="w-full">
                    <tr className="h-[64px] ">
                      <td className="px-6 font-body font-semibold text-body16 text-black-custom">
                        Lista de matemática #4 H19
                      </td>
                      <td className="px-6 font-body font-normal text-body16 text-black-custom">
                        10
                      </td>
                      <td className="px-6">
                        <SubjectBadge codigo="MT" />
                      </td>
                      <td className="px-6 font-body font-normal text-body16 text-black-custom">
                        Não Iniciada
                      </td>
                      <td className="px-6  w-auto">
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
                            {
                              type: "icon",
                              iconName: "lucide:download",
                              onClick: () => console.log("export list"),
                            },
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
