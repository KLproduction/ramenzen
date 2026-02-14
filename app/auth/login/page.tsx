import { LoginForm } from "@/components/auth/LoginForm";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const user = await currentUser();

  if (user) {
    redirect("/");
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-zinc-800">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
