import TicketPriorityBadge from "@/components/TicketPriorityBadge";
import TicketStatusBadge from "@/components/TicketStatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Prisma } from "@prisma/client";
import Link from "next/link";
import ToFocusButton from "./ToFocusButton";
import AssignedInfo from "./AssignedInfo";
import { formatDate } from "@/utils/formatDate";

type TicketWithUser = Prisma.TicketGetPayload<{
  include: {
    assignedToUser: true;
  };
}>;

interface Props {
  ticket: TicketWithUser;
  canEdit: boolean;
  isCollapsed?: boolean;
}

const TicketCard = ({ isCollapsed, ticket, canEdit }: Props) => {
  const isClosed = ticket.status === "CLOSED";

  return (
    <Card
      key={ticket.id}
      className={`flex flex-col justify-between${
        ticket.focus ? " focused" : ""
      }`}
    >
      <CardHeader>
        <CardTitle>
          <Link
            className={`text-blue-500 break-word${
              isClosed ? " text-muted-foreground" : ""
            }`}
            href={`/tickets/${ticket.id}`}
          >
            {ticket.title}
          </Link>
        </CardTitle>
      </CardHeader>

      {!isCollapsed && (
        <CardContent className="flex flex-col gap-2 items-start justify-between">
          <TicketStatusBadge status={ticket.status} />

          <div className="flex justify-start">
            <TicketPriorityBadge priority={ticket.priority} />
          </div>

          {ticket.assignedToUser?.name && (
            <AssignedInfo focus={ticket.focus}>
              <small>Assigned to: {ticket.assignedToUser.name}</small>
            </AssignedInfo>
          )}

          <AssignedInfo focus={ticket.focus}>
            <small>Created at: {formatDate(ticket.createdAt)}</small>
          </AssignedInfo>

          {!isClosed && canEdit && <ToFocusButton ticket={ticket} />}
        </CardContent>
      )}
    </Card>
  );
};

export default TicketCard;
