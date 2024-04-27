"use client";

import { Prisma } from "@prisma/client";
import TicketCard from "./TicketCard";

type TicketWithUser = Prisma.TicketGetPayload<{
  include: {
    assignedToUser: true;
  };
}>;

const TicketCardContainer = ({
  tickets,
  canEdit,
}: {
  canEdit: boolean;
  tickets: TicketWithUser[];
}) => {
  return (
    <div className="grid gap-2 my-2 md:grid-cols-2 lg:grid-cols-3">
      {tickets?.map((ticket) => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          canEdit={canEdit}
          isCollapsed={false}
        />
      ))}
    </div>
  );
};

export default TicketCardContainer;
