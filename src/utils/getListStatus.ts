const STATUS = {
  PENDING: "PENDENTE",
  COMPLETED: "CONCLUÍDO",
};

export const getListStatus = (status: "PENDING" | "COMPLETED"): string => {
  return STATUS[status];
};
