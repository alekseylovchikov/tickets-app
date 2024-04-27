"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

const GoToButton = ({
  navigateTo,
  children,
}: {
  children: ReactNode;
  navigateTo: string;
}) => {
  const router = useRouter();

  const routeTo = () => {
    router.push(navigateTo);
  };

  return (
    <Button onClick={routeTo} className="uppercase text-lg font-bold">
      {children}
    </Button>
  );
};

export default GoToButton;
