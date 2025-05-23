"use client";

import { Button } from "../ui/button";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { LoginButtonProps } from "../auth/loginBtn";
import SignOutBtn from "../auth/SignOutBtn";
import { currentUser } from "@/lib/auth";
import UserAvatar from "../global/UserAvatar";
import { cn } from "@/lib/utils";
import MyContainer from "../Container";
import Categories from "./Categories";
import NavLogo from "./NavLogo";

import LoginModalBtn from "./LoginModalBtn";
import { getUserById } from "@/data/user";
import { UserRole } from "@prisma/client";
import Logo from "../global/Logo";
import { ExtenderUser } from "@/next-auth";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import BookingBtn from "../global/BookingBtn";

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
const Navbar = ({ user }: Props) => {
  const isAdmin = user?.role === UserRole.ADMIN ? true : false;
  const isOrganizer = user?.role === UserRole.ORGANIZER ? true : false;

  const isDashboard = isAdmin || isOrganizer;
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

  const route = useRouter();

  return (
    <nav
      className={cn(
        "duration-900 fixed inset-x-0 top-0 z-[100] hidden h-20 w-full bg-black/75 backdrop-blur-md transition-all md:block",
        isNavOpen ? "top-0" : "-top-[80px]",
      )}
    >
      <MyContainer>
        <ul className="flex items-center justify-between">
          <Link href="/">
            <Logo className="max-w-[500px]" />
          </Link>
          {/* {navList.map(({ label, path }) => (
            <li key={label}>
              <Link
                href={path}
                className="flex h-20 items-center px-4 text-sm font-medium text-zinc-700 transition hover:text-zinc-900"
              >
                {label}
              </Link>
            </li>
          ))} */}

          {!user?.id ? (
            <div className="flex items-center gap-3 p-3">
              <LoginButtonProps mode="modal" asChild>
                <Button variant={"secondary"} size={"lg"}>
                  <h4>Sign In</h4>
                </Button>
              </LoginButtonProps>

              <div className="border-r border-zinc-800" />
              <Link href={"/auth/register"} className="text-gray-500">
                <h4>Sign up</h4>
              </Link>
              <BookingBtn />
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
              <BookingBtn />
            </div>
          )}
        </ul>
        <Categories />
      </MyContainer>
    </nav>
  );
};

export default Navbar;
