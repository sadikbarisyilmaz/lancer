import Link from "next/link";
import { Card } from "@/components/ui/card";
import SignUpForm from "@/components/forms/signup-form";

export default function Page() {
  return (
    <div className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-auto">
      {/* Darkened background overlay (pointer-events-none so it won't block touches) */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-0 pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mt-10 lg:mt-0 px-10 sm:px-14 lg:px-12 flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 animate-fadeIn py-12">
        {/* Left Section */}
        <div className="flex-1 flex flex-col justify-center space-y-6 text-center lg:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold drop-shadow-2xl">
            Welcome to <span className="text-primary">Lancer</span>
          </h1>
          <p className="leading-relaxed text-foreground/80 text-base sm:text-lg lg:text-xl max-w-md mx-auto lg:mx-0">
            The all-in-one customer management system built for professional
            freelancers. Simplify your workflow and stay organized effortlessly.
          </p>
          <Link
            href="/signIn"
            className="inline-block w-fit mx-auto lg:mx-0 px-10 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl bg-primary text-black hover:bg-primary/90 transition-colors"
          >
            Get Started
          </Link>
        </div>

        {/* Right Section - Signup Form */}
        <div className="flex-1 flex justify-center items-start sm:items-center w-full">
          <Card className="dark:bg-black bg-white dark:bg-opacity-40 bg-opacity-40 p-6 sm:p-8 lg:p-10 shadow-md dark:shadow-slate-700 w-full max-w-md backdrop-blur-md flex flex-col justify-center">
            <SignUpForm />
          </Card>
        </div>
      </div>
    </div>
  );
}
