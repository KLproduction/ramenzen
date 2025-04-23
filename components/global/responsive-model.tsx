import { useMedia } from "react-use";
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import { Sheet, SheetContent } from "../ui/sheet";

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
};

const ResponsiveModel = ({ children, isOpen, onOpenChange }: Props) => {
  const isDesktop = useMedia("(min-width: 1024px)", true);
  // const isDesktop = true;
  if (isDesktop) {
    return (
      <Sheet open={isOpen} onOpenChange={onOpenChange}>
        <DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogTitle>
        <SheetContent className="hide-scrollbar z-[9999] h-full w-full overflow-y-auto rounded-2xl border-none p-0 sm:max-w-lg">
          <div className="flex h-full items-center justify-center">
            {children}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerTitle>
        <DialogDescription></DialogDescription>
      </DrawerTitle>
      <DrawerContent className="flex w-full justify-center border-none bg-zinc-900 p-0">
        <div className="hide-scrollbar z-[99999] flex max-h-screen w-full items-start justify-center overflow-y-auto overflow-x-hidden rounded-2xl border-none p-3 shadow-none">
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ResponsiveModel;
