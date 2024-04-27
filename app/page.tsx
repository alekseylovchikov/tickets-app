import GoToButton from "./GoToButton";

const Dashboard = async () => {
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
    <div className="flex items-center justify-center">
      <GoToButton navigateTo="/cv/new">CREATE CV</GoToButton>
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
