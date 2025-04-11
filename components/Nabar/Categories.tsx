"use client";

import { courseTypes, features } from "@/data/data";
import MyContainer from "../Container";

import CategoryBox from "./CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const Categories = () => {
  const params = useSearchParams();
  const category = params.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/explore";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const isModal =
      params.get("create-course") || params.get("create-organizer");
    if (isModal) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  }, [isModalOpen, params]);

  if (!isMainPage) return null;

  return (
    <div
      className={cn(
        "h-full w-full bg-transparent backdrop-blur-md transition-all duration-500",
        isScrolled ? "hidden" : "",
        isModalOpen ? "hidden" : "",
      )}
    >
      <MyContainer>
        <div className="flex items-center justify-between overflow-x-auto pt-4">
          {courseTypes.map((item) => (
            <CategoryBox
              key={item.title}
              label={item.title || null}
              icon={item.icon}
              selected={category === item.title}
            />
          ))}
        </div>
      </MyContainer>
    </div>
  );
};

export default Categories;
