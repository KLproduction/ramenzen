"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { LoginButtonProps } from "../auth/loginBtn";
import { currentUser } from "@/lib/auth";
import UserAvatar from "../global/UserAvatar";
import { cn } from "@/lib/utils";
import MyContainer from "../Container";
import Categories from "./Categories";
import { UserRole } from "@prisma/client";
import Logo from "../global/Logo";
import { useEffect, useState } from "react";
import { ExtenderUser } from "@/next-auth";

const navList = [
  {
    label: "HOME",
    path: "/",
  },
  {
    label: "ABOUT",
    path: "/about",
  },
  {
    label: "COURSES",
    path: "/courses",
  },
  {
    label: "LOCATIONS",
    path: "/locations",
  },
  {
    label: "PARTNERS",
    path: "/partners",
  },
];
type Props = {
  user: ExtenderUser | null;
};
const MobileNavbar = ({ user }: Props) => {
  const isAdmin = user?.role === UserRole.ADMIN ? true : false;
  const isOrganizer = user?.role === UserRole.ORGANIZER ? true : false;

  const [isNavOpen, setIsNavOpen] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY < lastScrollY) {
      setIsNavOpen(true);
    } else {
      setIsNavOpen(false);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-[100] h-20 w-full bg-black/75 backdrop-blur-md transition-all md:hidden",

        isNavOpen ? "top-0" : "-top-[10%]",
      )}
    >
      <MyContainer>
        <ul className="flex h-full items-center justify-between">
          {/* {navList.map(({ label, path }) => (
          <li key={label}>
            <Link href={path}>{label}</Link>
          </li>
        ))} */}
          <div>
            <Link href="/">
              <Logo />
            </Link>
          </div>

          {!user?.id ? (
            <div className="flex items-center gap-3 p-3">
              <LoginButtonProps mode="modal" asChild>
                <Button variant={"default"} size={"lg"}>
                  Sign In
                </Button>
              </LoginButtonProps>

              <div className="border-r border-zinc-800" />
              <Link href={"/auth/register"} className="text-gray-500">
                Sign up
              </Link>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3 p-3">
              <UserAvatar
                name={user?.name!}
                userId={user?.id}
                image={user?.image || ""}
                isAdmin
                isOrganizer
              />
            </div>
          )}
        </ul>
        <Categories />
      </MyContainer>
    </nav>
  );
};

export default MobileNavbar;
