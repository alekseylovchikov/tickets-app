import Pagination from "@/components/Pagination";
import StatusFilter from "@/components/StatusFilter";
import { buttonVariants } from "@/components/ui/button";
import prisma from "@/prisma/db";
import { Status, Ticket } from "@prisma/client";
import { getServerSession } from "next-auth";
import Link from "next/link";
import options from "../api/auth/[...nextauth]/options";
import TicketCardContainer from "./TicketCardContainer";

export interface SearchParams {
  page: string;
  status: Status;
  orderBy: keyof Ticket;
}

const Tickets = async ({ searchParams }: { searchParams: SearchParams }) => {
  const session = await getServerSession(options);

  if (!session) {
    return <p className="text-destructive">Unauthorized</p>;
  }

  const pageSize = 10;
  const page = Number(searchParams.page) || 1;

  const orderBy = searchParams.orderBy ? searchParams.orderBy : "createdAt";

  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  let where = {};

  if (status) {
    where = { status };
  } else {
    where = { NOT: [{ status: "CLOSED" as Status }] };
  }

  const ticketsCount = await prisma.ticket.count({ where });
  const tickets = await prisma.ticket.findMany({
    where,
    take: pageSize,
    skip: (page - 1) * pageSize,
    orderBy: [{ [orderBy]: "desc" }],
    include: {
      assignedToUser: true,
    },
  });

  return (
    <div className="p-4">
      <TicketCardContainer canEdit={Boolean(session?.user)} tickets={tickets} />

      <Pagination
        itemCount={ticketsCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  );
};

export default Tickets;
