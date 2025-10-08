"use client";
import { useState } from "react";
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
import { createNewUser } from "@/app/actions";

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      // Send signup request
      const response = await createNewUser(
        values.email,
        values.password,
        values.full_name
      );

      if (!response) {
        throw new Error("Failed to sign up");
      }

      // Redirect to login page on success
      router.push("/login");
    } catch (error) {
      toast({
        title: `${error}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formSchema = z
    .object({
      full_name: z.string().min(2, "Name must be at least 2 characters"),
      email: z.string().email("Invalid email address"),
      password: z.string().min(8, "Password must be at least 6 characters"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      full_name: "",
      confirmPassword: "",
    },
  });

  return (
    <div className="flex flex-col gap-4 w-full max-w-xl p-4">
      <h2 className="text-4xl font-semibold">Create an Account</h2>
      <Separator />
      <div className="flex flex-col gap-2 mt-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className="grid  gap-2">
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="full name" {...field} type="text" />
                    </FormControl>
                    <div className="h-6">
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
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
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="confirm password"
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
            {!isLoading ? (
              <Button
                className="w-full mt-4"
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
          </form>
        </Form>
      </div>
    </div>
  );
};

export default SignUpForm;
