"use client";

import { ReactNode } from "react";

const AssignedInfo = ({
  focus,
  children,
}: {
  focus: boolean;
  children: ReactNode;
}) => {
  return <span className={focus ? "text-white" : ""}>{children}</span>;
};

export default AssignedInfo;
