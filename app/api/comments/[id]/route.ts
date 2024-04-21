// import { ticketPatchSchema } from "@/ValidationSchemas/ticket";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/db";

interface Props {
  params: { id: string };
}

// export async function PATCH(request: NextRequest, { params }: Props) {
//   const body = await request.json();
//   const validation = ticketPatchSchema.safeParse(body);

//   if (!validation.success) {
//     return NextResponse.json(validation.error.format(), { status: 400 });
//   }

//   const ticket = await prisma.ticket.findUnique({
//     where: {
//       id: Number(params.id),
//     },
//   });

//   if (!ticket) {
//     return NextResponse.json({ message: "Ticket not found" }, { status: 404 });
//   }

//   if (body?.assignedToUserId) {
//     body.assignedToUserId = Number(body.assignedToUserId);
//   }

//   const updateTicket = await prisma.ticket.update({
//     where: {
//       id: ticket.id,
//     },
//     data: {
//       ...body,
//     },
//   });

//   return NextResponse.json(updateTicket, { status: 200 });
// }

export async function DELETE(request: NextRequest, { params }: Props) {
  const comment = await prisma.ticket.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  if (!comment) {
    return NextResponse.json({ message: "Comment not found" }, { status: 404 });
  }

  await prisma.comment.delete({
    where: {
      id: comment.id,
    },
  });

  return NextResponse.json({ message: "Comment deleted" });
}
