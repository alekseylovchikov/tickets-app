import { Priority } from "@prisma/client";
import { Star } from "lucide-react";
import React from "react";

interface Props {
  priority: Priority;
}

const priorityMap: Record<
  Priority,
  {
    label: string;
    level: 1 | 2 | 3;
  }
> = {
  HIGH: { label: "High", level: 3 },
  MEDIUM: { label: "Medium", level: 2 },
  LOW: { label: "Low", level: 1 },
};

const priorityColorMap: Record<Priority, string> = {
  HIGH: "text-red-500",
  MEDIUM: "text-yellow-500",
  LOW: "text-blue-500",
};

const TicketPriorityBadge = ({ priority }: Props) => {
  return (
    <div className="flex justify-between">
      <Star
        className={`${
          priorityMap[priority].level >= 1
            ? priorityColorMap[priority]
            : "text-muted"
        }`}
      />
      <Star
        className={`${
          priorityMap[priority].level >= 2
            ? priorityColorMap[priority]
            : "text-muted"
        }`}
      />
      <Star
        className={`${
          priorityMap[priority].level >= 3 ? "text-red-500" : "text-muted"
        }`}
      />
    </div>
  );
};

export default TicketPriorityBadge;
