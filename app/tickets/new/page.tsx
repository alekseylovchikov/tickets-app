import options from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";

const TicketForm = dynamic(() => import("@/components/TicketForm"), {
  ssr: false,
});

const NewTicket = async () => {
  const session = await getServerSession(options);

  if (!session) {
    return <p className="text-destructive">Unauthorized</p>;
  }

  return <TicketForm />;
};

export default NewTicket;
