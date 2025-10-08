"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
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

const formSchema = z
  .object({
    currentPassword: z.string().min(3),
    newPassword: z.string().min(3),
    passwordConfirmation: z.string().min(3),
  })
  .refine((data) => data.newPassword === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // path of error
  });

import { useToast } from "../ui/use-toast";
import { ServerSession } from "@/types/next-auth";
import { updateUserPassword } from "@/app/actions";

export const EditUserPasswordForm = ({ user }: ServerSession) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      passwordConfirmation: "",
    },
  });
  // @ts-ignore
  const onSubmit = async (values) => {
    setIsSubmitting(true);

    try {
      const result = await updateUserPassword(values);
      toast({
        title: "Update Password Successful !",
      });
      setIsSubmitting(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error !",
        description: `- ${error}`,
      });

      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <h2 className="text-3xl font-semibold md:text-start text-center">
        Change Password
      </h2>
      <Separator />
      <div className="flex flex-col gap-2 max-w-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="">
            <div className="grid  gap-2">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">
                      Current Password
                    </FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">New Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {!isSubmitting ? (
              <Button
                className="w-full mt-2"
                variant={"secondary"}
                type="submit"
              >
                Submit
              </Button>
            ) : (
              <Button className="w-full mt-2" disabled>
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
