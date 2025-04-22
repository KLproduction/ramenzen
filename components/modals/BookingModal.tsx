"use client";

import ResponsiveModel from "../global/responsive-model";
import Modal from "./Modal";
import { Card, CardContent } from "@/components/ui/card";
import BookingForm from "@/app/(ladning)/_components/booking/BookingForm";
import { useBookingModal } from "@/hooks/modal";

const BookingModal = () => {
  const { isOpen, setIsOpen } = useBookingModal();

  const bodyContent = (
    <div className="my-8">
      <BookingForm />
    </div>
  );
  return (
    <ResponsiveModel isOpen={isOpen} onOpenChange={setIsOpen}>
      <Modal body={bodyContent} />
    </ResponsiveModel>
  );
};

export default BookingModal;
