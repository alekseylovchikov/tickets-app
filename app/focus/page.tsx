import prisma from "@/prisma/db";
import TicketCard from "../tickets/TicketCard";

const FocusPage = async () => {
  const tickets = await prisma.ticket.findMany({
    where: { focus: true },
    orderBy: [{ createdAt: "desc" }],
    include: {
      assignedToUser: true,
    },
  });

  return (
    <div>
      {!tickets || (tickets?.length === 0 && <h2>No focused tickets</h2>)}
      <div className="grid gap-2 my-2 md:grid-cols-3 lg:grid-cols-4">
        {tickets?.map((ticket) => {
          return <TicketCard key={ticket.id} ticket={ticket} />;
        })}
      </div>
    </div>
  );
};

export default FocusPage;
