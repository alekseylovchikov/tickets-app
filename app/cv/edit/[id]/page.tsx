import dynamic from "next/dynamic";
import React from "react";
import prisma from "@/prisma/db";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";

interface Props {
  params: { id: string };
}

const TicketForm = dynamic(() => import("@/components/TicketForm"), {
  ssr: false,
});

const EditTicket = async ({ params }: Props) => {
  const session = await getServerSession(options);

  if (!session) {
    return <p className="text-destructive">Unauthorized</p>;
  }

  const ticket = await prisma.ticket.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  if (!ticket) {
    return <p className="text-destructive">Ticket not found</p>;
  }

  return <TicketForm ticket={ticket} />;
};

export default EditTicket;
