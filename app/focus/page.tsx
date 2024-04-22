import prisma from "@/prisma/db";
import TicketCard from "../tickets/TicketCard";
import { getServerSession } from "next-auth";
import options from "../api/auth/[...nextauth]/options";

const FocusPage = async () => {
  const session = await getServerSession(options);

  if (!session) {
    return <p className="text-destructive">Unauthorized</p>;
  }

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
          return <TicketCard key={ticket.id} canEdit ticket={ticket} />;
        })}
      </div>
    </div>
  );
};

export default FocusPage;
