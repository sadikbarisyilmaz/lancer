import { User } from "@supabase/supabase-js";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface Props {
  user: User;
}

export const Account = ({ user }: Props) => {
  console.log(user);
  return (
    <div className="flex flex-col w-full h-full items-center">
      <div className="flex-col flex items-center justify-center gap-3">
        <Avatar className="lg:w-24 w-16 lg:h-24 h-16 flex flex-col items-center">
          <AvatarImage
            src={user.user_metadata.picture}
            alt={user.user_metadata.full_name}
            className=" self-center"
          />
          <AvatarFallback>P</AvatarFallback>
        </Avatar>
        <p className="text-3xl">{user.user_metadata.full_name}</p>
        <p className="">{user.user_metadata.email}</p>
      </div>
    </div>
  );
};
