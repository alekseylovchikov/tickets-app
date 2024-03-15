import dynamic from "next/dynamic";
import React from "react";
import prisma from "@/prisma/db";

interface Props {
  params: { id: string };
}

const TicketForm = dynamic(() => import("@/components/TicketForm"), {
  ssr: false,
});

const EditTicket = async ({ params }: Props) => {
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
