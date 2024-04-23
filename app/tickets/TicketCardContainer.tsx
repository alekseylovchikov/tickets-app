"use client";

import { Prisma } from "@prisma/client";
import React, { useLayoutEffect, useState } from "react";
import TicketCard from "./TicketCard";
import { Button } from "@/components/ui/button";

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
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleChangeIsCollapsed = () => {
    setIsCollapsed(!isCollapsed);
    localStorage.setItem("isCollapsed", JSON.stringify(!isCollapsed));
  };

  useLayoutEffect(() => {
    const isCollapsedStorage = localStorage.getItem("isCollapsed");
    if (isCollapsedStorage) {
      setIsCollapsed(JSON.parse(isCollapsedStorage));
    }
  }, []);

  return (
    <>
      <Button onClick={handleChangeIsCollapsed}>
        {isCollapsed ? "Show Details" : "Hide Info"}
      </Button>
      <div className="grid gap-2 my-2 md:grid-cols-3 lg:grid-cols-4">
        {tickets?.map((ticket) => (
          <TicketCard
            key={ticket.id}
            ticket={ticket}
            canEdit={canEdit}
            isCollapsed={isCollapsed}
          />
        ))}
      </div>
    </>
  );
};

export default TicketCardContainer;
