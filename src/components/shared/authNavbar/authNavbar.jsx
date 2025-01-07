
import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Button from "@/components/shared/button";
import { Bars, Cross } from "@/icons";
import AuthNavDropdown from "@/components/shared/authNavbar/authNavDropdown";

function AuthNavbar({ userInfo, showMobileNav, setShowMobileNav }) {
  const { data, status } = useSession();
  return (
    <div className="flex justify-end items-center gap-3 md:gap-4 ">
      <Button TagName={Link} href="/myaccount/company/add" icon className="h-9 lg:h-11">
        Add
      </Button>
      {status === "authenticated" ? (
        <AuthNavDropdown userInfo={data?.user} />
      ) : (
        <Button
          TagName={Link}
          href="/login"
          secondary
          className="!text-gray-900"
        >
          Login
        </Button>
      )}
      <button
        onClick={() => setShowMobileNav(!showMobileNav)}
        className="lg:hidden size-9 lg:size-10 bg-transparent p-2 flex items-center justify-center"
      >
        {showMobileNav ? <Cross /> : <Bars />}
      </button>
    </div>
  );
}

export default AuthNavbar;
