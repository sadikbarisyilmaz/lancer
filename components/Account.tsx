"use client";
import { User } from "@supabase/supabase-js";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { EditUserForm } from "./forms/EditUserForm";

interface Props {
  user: User;
}

export const Account = ({ user }: Props) => {
  return (
    <div className="flex flex-col items-center w-full">
      <EditUserForm user={user} />
    </div>
  );
};
