"use client";

import { useLoginModal } from "@/hooks/modal";
import ResponsiveModel from "../global/responsive-model";
import { LoginForm } from "./LoginForm";

export const LoginModal = () => {
  const { isOpen, setIsOpen } = useLoginModal();
  return (
    <ResponsiveModel isOpen={isOpen} onOpenChange={setIsOpen}>
      <div className="flex h-full w-full items-center justify-center p-10">
        <LoginForm />
      </div>
    </ResponsiveModel>
  );
};
