"use client";

import React from "react";

const AssignedInfo = ({ focus, name }: { name: string; focus: boolean }) => {
  return <span className={focus ? "text-white" : ""}>Assigned to: {name}</span>;
};

export default AssignedInfo;
