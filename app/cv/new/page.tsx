import options from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";

const TicketForm = dynamic(() => import("@/components/TicketForm"), {
  ssr: false,
});

const NewCV = async () => {
  const session = await getServerSession(options);

  if (!session) {
    return (
      <p className="uppercase text-center font-bold text-2xl">
        For creating a new CV please login
      </p>
    );
  }

  return <TicketForm />;
};

export default NewCV;
