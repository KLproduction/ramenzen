import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

const Logo = ({ className }: Props) => {
  return (
    <div className="flex h-20 items-center justify-center">
      <img
        src="logo_noBGFix.png"
        alt="Logo"
        className={cn("object-fit h-full", className)}
        style={{ backgroundColor: "transparent" }}
      />
    </div>
  );
};

export default Logo;
