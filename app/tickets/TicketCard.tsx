import TicketPriorityBadge from "@/components/TicketPriorityBadge";
import TicketStatusBadge from "@/components/TicketStatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import ToFocusButton from "./ToFocusButton";
import AssignedInfo from "./AssignedInfo";

type TicketWithUser = Prisma.TicketGetPayload<{
  include: {
    assignedToUser: true;
  };
}>;

interface Props {
  ticket: TicketWithUser;
}

const TicketCard = ({ ticket }: Props) => {
  return (
    <Card
      key={ticket.id}
      className={`flex flex-col justify-between${
        ticket.focus ? " bg-indigo-900" : ""
      }`}
    >
      <CardHeader>
        <CardTitle>
          <Link
            className="text-blue-500 break-word"
            href={`/tickets/${ticket.id}`}
          >
            {ticket.title}
          </Link>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-2 items-start justify-between">
        <TicketStatusBadge status={ticket.status} />
        <div className="flex justify-start ">
          <TicketPriorityBadge priority={ticket.priority} />
        </div>
        {ticket.assignedToUser?.name && (
          <AssignedInfo
            focus={ticket.focus}
            name={ticket.assignedToUser.name}
          />
        )}
        <ToFocusButton ticket={ticket} />
      </CardContent>
    </Card>
  );
};

export default TicketCard;
