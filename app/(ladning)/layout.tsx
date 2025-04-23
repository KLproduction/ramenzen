import MobileNavbar from "@/components/Nabar/MobileNavbar";
import Navbar from "@/components/Nabar/Navbar";
import { currentUser } from "@/lib/auth";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const LandingLayout = async ({ children }: Props) => {
  const user = await currentUser();
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      {children}
    </div>
  );
};

export default LandingLayout;
