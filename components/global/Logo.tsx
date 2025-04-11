import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

const Logo = ({ className }: Props) => {
  return (
    <div className="flex h-20 items-center justify-center bg-transparent">
      <img
        src="logo_noBG.png"
        alt="Logo"
        className={cn("object-fit h-full", className)}
      />
    </div>
  );
};

export default Logo;
