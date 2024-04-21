"use client";

import AssingTicket from "@/components/AssingTicket";
import CommentForm from "@/components/CommentForm";
import TicketPriorityBadge from "@/components/TicketPriorityBadge";
import TicketStatusBadge from "@/components/TicketStatusBadge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/utils/formatDate";
import { Comment, Ticket, User } from "@prisma/client";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import DeleteButton from "./DeleteButton";
import DeleteCommentButton from "./DeleteComment";

interface Props {
  ticket: Ticket;
  users: User[];
  comments: Comment[];
  canAddComment: boolean;
}

const TicketDetail = ({ ticket, users, comments, canAddComment }: Props) => {
  return (
    <>
      <Link href="/tickets" className={buttonVariants({ variant: "link" })}>
        Back to All Tickets
      </Link>
      <div className="lg:grid lg:grid-cols-4">
        <Card className="mx-4 mb-4 lg:col-span-3 lg:mr-4">
          <CardHeader>
            <div className="flex justify-between mb-3">
              <TicketStatusBadge status={ticket.status} />
              <TicketPriorityBadge priority={ticket.priority} />
            </div>

            <CardTitle>{ticket.title}</CardTitle>
            <CardDescription>
              Created: {formatDate(ticket.createdAt)}
            </CardDescription>
          </CardHeader>
          <CardContent className="prose dark:prose-invert">
            <ReactMarkdown>{ticket.description}</ReactMarkdown>
          </CardContent>
          <CardFooter>Updated: {formatDate(ticket.updatedAt)}</CardFooter>
        </Card>
        <div className="mx-4 flex lg:flex-col lg:mx-0 gap-2">
          <AssingTicket ticket={ticket} users={users} />
          <Link
            href={`/tickets/edit/${ticket.id}`}
            className={`${buttonVariants({ variant: "default" })}`}
          >
            Edit Ticket
          </Link>
          <DeleteButton ticketId={ticket.id} />
        </div>
      </div>

      {canAddComment && (
        <div className="m-4">
          <CommentForm ticketId={ticket.id} />
        </div>
      )}

      <div className="flex flex-col gap-2 m-4">
        {comments?.map((comment) => (
          <Card key={comment.id}>
            <CardHeader>
              <CardTitle>Comment: {comment.text}</CardTitle>
            </CardHeader>
            <CardFooter className="flex items-center justify-between">
              <div className="flex-1">
                Created at: {formatDate(comment.createdAt)}
              </div>
              {canAddComment && <DeleteCommentButton commentId={comment.id} />}
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
};

export default TicketDetail;
