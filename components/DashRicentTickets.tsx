import { Prisma } from "@prisma/client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import TicketStatusBadge from "./TicketStatusBadge";
import Link from "next/link";
import TicketPriorityBadge from "./TicketPriorityBadge";

type TicketWithUser = Prisma.TicketGetPayload<{
  include: {
    assignedToUser: true;
  };
}>;

interface Props {
  tickets: TicketWithUser[];
  title: string;
}

function DashRicentTickets({ tickets, title }: Props) {
  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {tickets?.map((ticket) => (
            <div key={ticket.id} className="flex items-center">
              <TicketStatusBadge status={ticket.status} />
              <div className="ml-4 space-y-1">
                <Link href={`/tickets/${ticket.id}`}>
                  <p>{ticket.title}</p>
                  <p>{ticket.assignedToUser?.name || "Unassigned"}</p>
                </Link>
              </div>
              <div className="ml-auto font-medium">
                <TicketPriorityBadge priority={ticket.priority} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default DashRicentTickets;
