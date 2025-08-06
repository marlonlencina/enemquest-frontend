"use client";

import { Avatar } from "@/app/components/layout/Avatar";
import { DataTable } from "@/app/components/layout/DataTable";
import { TableBody } from "@/app/components/layout/TableBody";
import { TableCell } from "@/app/components/layout/TableCell";
import { TableHeader } from "@/app/components/layout/TableHeader";
import { TableHeaderCell } from "@/app/components/layout/TableHeaderCell";
import { TableRow } from "@/app/components/layout/TableRow";
import { useAuth } from "@/context/useAuth";
import { getRanking, RankingUser } from "@/server/generalRequests";
import { useEffect, useState } from "react";
import { PageTitle } from "../../components/layout/PageTitle";

export default function Ranking() {
  const { user } = useAuth();
  const [ranking, setRanking] = useState<RankingUser[]>([]);

  const fetchRanking = async () => {
    try {
      const response = await getRanking();
      console.log("Ranking data:", response.data);
      setRanking(response.data);
    } catch (error) {
      console.error("Error fetching ranking:", error);
    }
  };
  useEffect(() => {
    fetchRanking();
  }, [user]);

  return (
    <>
      <div className="flex flex-col gap-6">
        <PageTitle>Ranking (Usuários beta)</PageTitle>
        <div className="w-full bg-white-custom rounded-lg pb-6">
          <DataTable>
            <TableHeader>
              <TableHeaderCell>Estudante</TableHeaderCell>
              <TableHeaderCell>Posição</TableHeaderCell>
            </TableHeader>
            <TableBody>
              {ranking.map((user) => (
                <TableRow key={user.usuario}>
                  <TableCell>
                    <div className="">
                      <div className="flex items-center gap-4">
                        <Avatar size={40} src={user.avatar} alt={user.nome} />
                        <div>
                          <div className="font-body text-black-custom font-medium">
                            {user.nome}
                          </div>
                          <div className="font-button font-normal text-body14 text-blue-baby">
                            @{user.usuario}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-end text-pink-primary font-bold text-body16">
                      #{user.posicao}
                    </p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </DataTable>
        </div>
      </div>
    </>
  );
}
