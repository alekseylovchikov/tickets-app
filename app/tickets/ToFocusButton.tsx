"use client";

import { Button } from "@/components/ui/button";
import { Ticket } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ToFocusButton = ({ ticket }: { ticket: Ticket }) => {
  const [isFetching, setIsFetching] = useState(false);
  const router = useRouter();
  const handleFocus = async () => {
    try {
      setIsFetching(true);
      await axios.patch(`/api/tickets/${ticket.id}`, { focus: !ticket.focus });
      router.refresh();
    } catch {
      // noop
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <Button
      className="bg-emerald-600 text-white"
      onClick={handleFocus}
      disabled={isFetching}
    >
      {ticket.focus ? "UNFOCUS FROM" : "FOCUS TO"}
    </Button>
  );
};

export default ToFocusButton;
