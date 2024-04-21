import { commentSchema } from "@/ValidationSchemas/comment";
import prisma from "@/prisma/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import options from "../auth/[...nextauth]/options";

export async function POST(request: NextRequest) {
  const session = await getServerSession(options);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const validation = commentSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  const newComment = await prisma.comment.create({
    data: { ...body, userId: session.user.id, ticketId: body.ticketId },
  });

  return NextResponse.json(newComment, { status: 201 });
}
