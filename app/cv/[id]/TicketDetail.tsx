"use client";

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
import { Ticket } from "@prisma/client";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import DeleteButton from "./DeleteButton";

interface Props {
  ticket: Ticket;
  canEditOrDelete: boolean;
}

const TicketDetail = ({ ticket, canEditOrDelete }: Props) => {
  return (
    <>
      <div>
        <h2 className="text-3xl font-bold text-center text-primary">
          {ticket.title}
        </h2>
        <h3 className="text-center text-sm text-gray-500">
          Created: {formatDate(ticket.createdAt)}, last update:{" "}
          {formatDate(ticket.updatedAt)}
        </h3>
        <Card
          className={`my-4 mb-4 lg:col-span-${canEditOrDelete ? 3 : 4} lg:mr-4`}
        >
          <CardHeader>
            {/* <CardTitle>{ticket.title}</CardTitle>
            <CardDescription>
              Created: {formatDate(ticket.createdAt)}, last update:{" "}
              {formatDate(ticket.updatedAt)}
            </CardDescription> */}
          </CardHeader>
          <CardContent className="prose dark:prose-invert">
            <ReactMarkdown>{ticket.description}</ReactMarkdown>
          </CardContent>
        </Card>

        {canEditOrDelete && (
          <div className="mx-4 flex lg:flex-col lg:mx-0 gap-2">
            <Link
              href={`/cv/edit/${ticket.id}`}
              className={`${buttonVariants({ variant: "default" })}`}
            >
              EDIT
            </Link>
            <DeleteButton ticketId={ticket.id} />
          </div>
        )}
      </div>
    </>
  );
};

export default TicketDetail;
