import Link from "next/link";
import React from "react";
import MainNavLinks from "./MainNavLink";
import ToggleMode from "./ToggleMode";
import { getServerSession } from "next-auth";
import options from "@/app/api/auth/[...nextauth]/options";

const MainNav = async () => {
  const session = await getServerSession(options);
  const hasSession = Boolean(session?.user);

  return (
    <div className="flex justify-between">
      <MainNavLinks hasAccess={hasSession} />

      <div className="flex items-center gap-2">
        {hasSession ? (
          <Link
            className="uppercase font-bold"
            href="/api/auth/signout?callbackUrl=/"
          >
            Logout
          </Link>
        ) : (
          <Link className="uppercase font-bold" href="/api/auth/signin">
            Login
          </Link>
        )}
        <ToggleMode />
      </div>
    </div>
  );
};

export default MainNav;
