import React from "react";
import { Badge } from "./ui/badge";
import { Status } from "@prisma/client";

interface Props {
  status: Status;
}

type StatusColors = "bg-red-400" | "bg-green-400" | "bg-blue-400";

const statusMap: Record<Status, { label: string; color: StatusColors }> = {
  OPEN: { label: "Open", color: "bg-red-400" },
  STARTED: { label: "Pending", color: "bg-blue-400" },
  CLOSED: { label: "Closed", color: "bg-green-400" },
};

const TicketStatusBadge = ({ status }: Props) => {
  return (
    <Badge
      className={`${statusMap[status].color} text-background hover:${statusMap[status].color}`}
    >
      {statusMap[status].label}
    </Badge>
  );
};

export default TicketStatusBadge;
