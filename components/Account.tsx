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
    <div className="flex flex-col w-full h-full">
      <div className="grid gap-2 w-fit">
        <Avatar className="lg:w-24 w-16 lg:h-24 h-16 flex flex-col items-center">
          <AvatarImage
            src={user.user_metadata.picture}
            alt={user.user_metadata.full_name}
            className=" self-center"
          />
          <AvatarFallback>P</AvatarFallback>
        </Avatar>
        <h2 className="text-3xl">{user.user_metadata.full_name}</h2>
        <EditUserForm user={user} />
      </div>
    </div>
  );
};
