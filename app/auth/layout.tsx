import { currentUser } from "@/lib/auth";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();
  return (
    <div className="flex h-full items-center justify-center bg-zinc-800">
      <div className="mt-24 h-full w-full">{children}</div>
    </div>
  );
};

export default AuthLayout;
