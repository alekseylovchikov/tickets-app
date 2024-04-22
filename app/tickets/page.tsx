import Pagination from "@/components/Pagination";
import StatusFilter from "@/components/StatusFilter";
import { buttonVariants } from "@/components/ui/button";
import prisma from "@/prisma/db";
import { Status, Ticket } from "@prisma/client";
import Link from "next/link";
import TicketCard from "./TicketCard";
import { getServerSession } from "next-auth";
import options from "../api/auth/[...nextauth]/options";

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
      <div className="flex justify-between gap-2">
        <Link
          href="/tickets/new"
          className={buttonVariants({ variant: "default" })}
        >
          NEW TICKET
        </Link>
        <StatusFilter />
      </div>

      <div className="grid gap-2 my-2 md:grid-cols-3 lg:grid-cols-4">
        {tickets?.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            canEdit={Boolean(session?.user)}
          />
        ))}
      </div>

      <Pagination
        itemCount={ticketsCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  );
};

export default Tickets;
