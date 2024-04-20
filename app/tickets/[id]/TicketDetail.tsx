import { Ticket, User } from "@prisma/client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TicketStatusBadge from "@/components/TicketStatusBadge";
import TicketPriorityBadge from "@/components/TicketPriorityBadge";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import { formatDate } from "@/utils/formatDate";
import DeleteButton from "./DeleteButton";
import AssingTicket from "@/components/AssingTicket";

interface Props {
  ticket: Ticket;
  users: User[];
}

const TicketDetail = ({ ticket, users }: Props) => {
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
    </>
  );
};

export default TicketDetail;
