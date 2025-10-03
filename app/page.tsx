import { Card } from "@/components/ui/card";
import { LoginForm } from "@/components/forms/LoginForm";
import SignUpForm from "@/components/forms/signup-form";
import SignInForm from "@/components/forms/signin-form";
import { auth } from "@/auth";

export default async function Page() {
  return (
    <div className="h-screen w-full flex items-center justify-center p-6 animate-fadeIn">
      <Card className="grid grid-cols-1 lg:grid-cols-3 gap-2 dark:bg-black bg-white dark:bg-opacity-40 bg-opacity-40 p-8 shadow-md dark:shadow-slate-700 max-w-[842px] min-h-[377px]">
        <div className="col-span-2 text-center flex flex-col items-center justify-center">
          <h1 className="scroll-m-20 drop-shadow-2xl px-4 py-8 text-4xl font-extrabold  lg:text-5xl">
            Welcome to Lancer !
          </h1>
          <p className="leading-2 text-foreground/80 text-md max-w-md lg:text-xl">
            "Professional freelancer's customer management system"
          </p>
          <p className="leading-7 text-foreground/80  [&:not(:first-child)]:mt-6">
            Please Login
          </p>
        </div>
        <div className="p-4">
          <SignUpForm />
          <SignInForm />
        </div>
      </Card>
    </div>
  );
}
