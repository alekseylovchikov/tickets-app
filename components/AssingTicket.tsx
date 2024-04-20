"use client";

import { Ticket, User } from "@prisma/client";
import React, { useState } from "react";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

function AssingTicket({ ticket, users }: { ticket: Ticket; users: User[] }) {
  const [isAssigned, setIsAssigned] = useState(false);
  const [error, setError] = useState("");

  const defaultValue = ticket.assignedToUserId?.toString() || "0";

  const assingTicket = async (userId: string) => {
    setError("");
    setIsAssigned(true);

    await axios
      .patch(`/api/tickets/${ticket.id}`, {
        assignedToUserId: userId === "0" ? null : userId,
      })
      .catch(() => setError("Unable to assing ticket"));

    setIsAssigned(false);
  };

  return (
    <>
      <Select
        defaultValue={defaultValue}
        onValueChange={assingTicket}
        disabled={isAssigned}
      >
        <SelectTrigger>
          <SelectValue
            placeholder="Select User..."
            defaultValue={defaultValue}
          ></SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0">Unassigned</SelectItem>
          {users?.map((user) => (
            <SelectItem key={user.id} value={user.id.toString()}>
              {user.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <p className="text-destructive">{error}</p>
    </>
  );
}

export default AssingTicket;
