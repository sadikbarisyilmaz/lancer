import { Card } from "@/components/ui/card";
import SignInForm from "@/components/forms/signin-form";

export default async function Page() {
  return (
    <div className="h-screen w-full flex items-center justify-center p-6 animate-fadeIn">
      <Card className="flex gap-2 dark:bg-black bg-white dark:bg-opacity-40 bg-opacity-40 p-8 shadow-md dark:shadow-slate-700 max-w-2xl min-h-3xl">
        <div className="p-4">
          <SignInForm />
        </div>
      </Card>
    </div>
  );
}
