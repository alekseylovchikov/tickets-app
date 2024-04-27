import TicketPriorityBadge from "@/components/TicketPriorityBadge";
import TicketStatusBadge from "@/components/TicketStatusBadge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/utils/formatDate";
import { Prisma } from "@prisma/client";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import React from "react";
import { SearchParams } from "./page";

type TicketWithUser = Prisma.TicketGetPayload<{
  include: {
    assignedToUser: true;
  };
}>;

interface Props {
  tickets: TicketWithUser[];
  searchParams: SearchParams;
}

const DataTable = ({ tickets, searchParams }: Props) => {
  return (
    <div className="w-full mt-5">
      <div className="rounded-md sm:border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Link href={{ query: { ...searchParams, orderBy: "title" } }}>
                  Title
                </Link>
                {"title" === searchParams.orderBy && (
                  <ArrowDown className="inline p-1" />
                )}
              </TableHead>
              <TableHead>Assigned to</TableHead>
              <TableHead>
                <div className="flex justify-center">
                  <Link
                    href={{ query: { ...searchParams, orderBy: "status" } }}
                  >
                    Status
                  </Link>
                  {"status" === searchParams.orderBy && (
                    <ArrowDown className="inline p-1" />
                  )}
                </div>
              </TableHead>
              <TableHead>
                <div className="flex justify-center">
                  <Link
                    href={{ query: { ...searchParams, orderBy: "priority" } }}
                  >
                    Priority
                  </Link>
                  {"priority" === searchParams.orderBy && (
                    <ArrowDown className="inline p-1" />
                  )}
                </div>
              </TableHead>
              <TableHead>
                <Link
                  href={{ query: { ...searchParams, orderBy: "createdAt" } }}
                >
                  Created at
                </Link>
                {"createdAt" === searchParams.orderBy && (
                  <ArrowDown className="inline p-1" />
                )}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets?.map((ticket) => (
              <TableRow key={ticket.id} data-href="/">
                <TableCell>
                  <Link
                    href={`/cv/${ticket.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    {ticket.title}
                  </Link>
                </TableCell>
                <TableCell>
                  {ticket.assignedToUser?.name || "Unassigned"}
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <TicketStatusBadge status={ticket.status} />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex justify-center">
                    <TicketPriorityBadge priority={ticket.priority} />
                  </div>
                </TableCell>
                <TableCell>{formatDate(ticket.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DataTable;
