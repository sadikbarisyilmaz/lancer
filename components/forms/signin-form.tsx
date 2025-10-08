"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "../ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SignInForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const formSchema = z.object({
    email: z.string().email("Please enter a valid email."),
    password: z.string().min(3, "Password must be at least 3 characters."),
  });

  type FormValues = z.infer<typeof formSchema>;

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);

    const { email, password } = values;
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result?.error) {
      setIsSubmitting(false);
      console.log(result.error || "Login failed!");
      toast({
        title: "Error !",
        description: `- ${result.error}`,
      });
    } else {
      toast({
        title: "Login Successful !",
        description: "- Redirecting to Dashboard",
      });
      setIsSubmitting(false);
      setTimeout(() => {
        router.push(`/dashboard/upcoming`);
      }, 500);
    }
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="flex flex-col gap-4 w-full max-w-xl min-w-max p-4">
      <h2 className="text-5xl font-semibold">Login</h2>
      <Separator />
      <div className="flex flex-col gap-2 w-60 mt-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="testuser@test.com"
                        {...field}
                        type="email"
                      />
                    </FormControl>
                    <div className="h-6">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="password"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <div className="h-6">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </div>
            {!isSubmitting ? (
              <Button
                className="w-full mt-6"
                variant={"secondary"}
                type="submit"
              >
                Submit
              </Button>
            ) : (
              <Button className="w-full mt-4 bg-slate-200" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            )}
            <div className="mt-4 flex gap-1">
              <p className="text-xs">Don&#39;t have an accoun?</p>{" "}
              <Link
                href="/"
                className=" w-fit text-xs font-bold hover:text-primary/90 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignInForm;
