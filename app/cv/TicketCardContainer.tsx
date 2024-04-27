"use client";

import { Ticket } from "@prisma/client";
import TicketCard from "./TicketCard";

const TicketCardContainer = ({ tickets }: { tickets: Ticket[] }) => {
  return (
    <div className="flex m-2">
      {tickets?.map((ticket) => (
        <TicketCard key={ticket.id} ticket={ticket} isCollapsed={false} />
      ))}
    </div>
  );
};

export default TicketCardContainer;
