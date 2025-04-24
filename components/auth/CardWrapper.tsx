"use client";

import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Social } from "./Social";
import { Header } from "./header";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backBtnLabel: string;
  backBtnHref: string;
  showSocial?: boolean;
}

export const CardWapper = ({
  children,
  headerLabel,
  backBtnLabel,
  backBtnHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[280px] shadow-md sm:w-[400] md:w-[450px]">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <div className="flex items-center justify-center">
        <Link className="p-5 pb-16 text-sm" href={backBtnHref}>
          {backBtnLabel}
        </Link>
      </div>
    </Card>
  );
};
