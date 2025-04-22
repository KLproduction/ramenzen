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
      <Card className="grid gap-6">
        <CardContent className="p-6">
          <BookingForm />
        </CardContent>
      </Card>
    </div>
  );
  return (
    <ResponsiveModel isOpen={isOpen} onOpenChange={setIsOpen}>
      <Modal title="Accommodation Details" body={bodyContent} />
    </ResponsiveModel>
  );
};

export default BookingModal;
