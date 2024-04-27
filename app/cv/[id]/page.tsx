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
  const canEditOrDelete = Boolean(session?.user);

  if (!ticket) {
    return <p className="text-destructive">CV not found</p>;
  }

  return <TicketDetail ticket={ticket} canEditOrDelete={canEditOrDelete} />;
};

export default ViewTicket;
