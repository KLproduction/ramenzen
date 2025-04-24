"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { LoginButtonProps } from "../auth/loginBtn";
import UserAvatar from "../global/UserAvatar";
import { cn } from "@/lib/utils";
import MyContainer from "../Container";
import Categories from "./Categories";
import { UserRole } from "@prisma/client";
import Logo from "../global/Logo";
import { useEffect, useRef, useState } from "react";
import { ExtenderUser } from "@/next-auth";
import { MenuIcon, XIcon } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const navList = [
  { label: "HOME", path: "/" },
  { label: "POPULAR", path: "/popular" },
  { label: "MENU", path: "/menu" },
  { label: "ABOUT", path: "/about" },
  { label: "BOOKING", path: "/booking" },
  { label: "CONTACT", path: "/contact" },
];

type Props = { user: ExtenderUser | null };

const MobileNavbar = ({ user }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
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

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
  //       setIsMenuOpen(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.3 },
    }),
  };
  return (
    <nav
      className={cn(
        "duration-900 fixed inset-x-0 z-[100] h-20 bg-black/75 backdrop-blur-md transition-all md:hidden",
        isNavOpen ? "top-0" : "-top-[80px]",
      )}
    >
      <MyContainer>
        <div className="flex h-20 items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={menuRef}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="overflow-hidden py-4"
            >
              <ul className="space-y-4 text-center">
                {navList.map(({ label, path }, i) => (
                  <motion.li key={label} custom={i} variants={itemVariants}>
                    <Link
                      href={path}
                      className="text-gray-300 hover:text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {label}
                    </Link>
                  </motion.li>
                ))}

                {!user?.id ? (
                  <motion.div
                    custom={navList.length}
                    variants={itemVariants}
                    className="flex flex-col items-center gap-3"
                  >
                    <LoginButtonProps mode="modal" asChild>
                      <Button variant="default" size="lg">
                        Sign In
                      </Button>
                    </LoginButtonProps>
                    <Link
                      href="/auth/register"
                      className="text-gray-500 hover:text-white"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign up
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div
                    custom={navList.length}
                    variants={itemVariants}
                    className="flex justify-center"
                  >
                    <UserAvatar
                      name={user.name!}
                      userId={user.id}
                      image={user.image || ""}
                      isAdmin={user.role === UserRole.ADMIN}
                      isOrganizer={user.role === UserRole.ORGANIZER}
                    />
                  </motion.div>
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </MyContainer>
    </nav>
  );
};

export default MobileNavbar;
