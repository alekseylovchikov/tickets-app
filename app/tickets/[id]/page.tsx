import React from "react";
import prisma from "@/prisma/db";
import TicketDetail from "./TicketDetail";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";

interface Props {
  params: { id: string };
}

const ViewTicket = async ({ params }: Props) => {
  const session = await getServerSession(options);
  const ticket = await prisma.ticket.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  const users = await prisma.user.findMany();
  const comments = await prisma.comment.findMany({
    where: {
      ticketId: Number(params.id),
    },
    orderBy: [{ createdAt: "desc" }],
  });

  if (!ticket) {
    return <p className="text-destructive">Ticket not found</p>;
  }

  return (
    <TicketDetail
      ticket={ticket}
      users={users}
      comments={comments}
      canAddComment={Boolean(session?.user)}
    />
  );
};

export default ViewTicket;
