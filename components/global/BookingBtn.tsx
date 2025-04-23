import React from "react";
import { InteractiveHoverButton } from "../ui/interactive-hover-button";
import { useBookingModal } from "@/hooks/modal";

type Props = {
  className?: string;
};
const BookingBtn = ({ className }: Props) => {
  const { open } = useBookingModal();
  return (
    <div className={className}>
      <InteractiveHoverButton
        onClick={open}
        text="Book Now"
        className="bg-zinc-800 text-yellow-400"
      />
    </div>
  );
};

export default BookingBtn;
