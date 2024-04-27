import prisma from "@/prisma/db";

import TicketDetail from "./cv/[id]/TicketDetail";

const Dashboard = async () => {
  const resumes = await prisma.ticket.findMany({
    // where,
    // take: pageSize,
    // skip: (page - 1) * pageSize,
    orderBy: [{ createdAt: "desc" }],
  });

  if (resumes.length === 0) {
    return (
      <div>
        <p className="text-center">No CV found</p>
      </div>
    );
  }

  // const session = await getServerSession(options);
  // const tickets = await prisma.ticket.findMany({
  //   where: {
  //     NOT: [{ status: "CLOSED" }],
  //   },
  //   orderBy: {
  //     updatedAt: "desc",
  //   },
  //   skip: 0,
  //   take: 5,
  //   include: {
  //     assignedToUser: true,
  //   },
  // });
  // const closedTickets = await prisma.ticket.findMany({
  //   where: {
  //     status: "CLOSED",
  //     // NOT: [{ status: "CLOSED" }],
  //   },
  //   orderBy: {
  //     updatedAt: "desc",
  //   },
  //   skip: 0,
  //   take: 5,
  //   include: {
  //     assignedToUser: true,
  //   },
  // });

  // const focusedTickets = await prisma.ticket.findMany({
  //   where: {
  //     focus: true,
  //   },
  //   orderBy: {
  //     updatedAt: "desc",
  //   },
  //   skip: 0,
  //   take: 5,
  //   include: {
  //     assignedToUser: true,
  //   },
  // });

  // const groupTickets = await prisma.ticket.groupBy({
  //   by: ["status"],
  //   _count: {
  //     id: true,
  //   },
  // });

  // const data = groupTickets.map((ticket) => {
  //   return {
  //     name: ticket.status,
  //     total: ticket._count.id,
  //   };
  // });

  return (
    <div>
      {/* <GoToButton navigateTo="/cv/new">CREATE CV</GoToButton> */}
      {/* TicketDetail */}
      <TicketDetail ticket={resumes[0]} canEditOrDelete={false} />
      {/* <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 px-2">
        <div>
          <DashRicentTickets title="Focused" tickets={focusedTickets} />
        </div>
        <div>
          <DashRicentTickets title="Recently Updated" tickets={tickets} />
        </div>
        <div>
          <DashRicentTickets title="Recently Closed" tickets={closedTickets} />
        </div>
        <div>
          <DashChart data={data} />
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
