import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/utils/formatDate";
import type { Ticket } from "@prisma/client";
import Link from "next/link";
import AssignedInfo from "./AssignedInfo";

// type TicketWithUser = Prisma.TicketGetPayload<{
//   include: {
//     assignedToUser: true;
//   };
// }>;

interface Props {
  ticket: Ticket;
  isCollapsed?: boolean;
}

const TicketCard = ({ isCollapsed, ticket }: Props) => {
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
            className="text-blue-500 break-word text-center"
            href={`/cv/${ticket.id}`}
          >
            {ticket.title}
          </Link>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};

export default TicketCard;
