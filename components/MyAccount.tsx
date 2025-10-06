"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { EditUserForm } from "@/components/forms/EditUserForm";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { Loader } from "./Loader";
import { EditUserPasswordForm } from "./forms/EditUserPasswordForm";
// import { EditUserPasswordForm } from "./forms/EditUserPasswordForm";

function MyAccount() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex w-full justify-center mt-10">
        <Loader />
      </div>
    );
  }

  return (
    <div className="h-screen w-full flex flex-col gap-4 justify-start items-center md:items-start pb-28 p-6 animate-fadeIn overflow-y-scroll no-scrollbar">
      <div className="flex flex-col gap-4 w-full max-w-5xl">
        <div className="flex flex-col sm:flex-row gap-6 w-full">
          <div className="flex sm:flex-row justify-center md:justify-start min-w-fit">
            {session?.user.image === "" || session?.user.image === null ? (
              <div className=" w-40 aspect-square bg-gray-800 text-white flex justify-center items-center rounded">
                Avatar
              </div>
            ) : (
              <img
                src={session?.user.image}
                alt="User Picture"
                className="md:w-[180px] w-[220px] sm:w-[250px] md:h-[180px] h-[220px] sm:h-[250px]"
              />
            )}
          </div>
          <div className="flex flex-col w-full">
            <div className="flex gap-1 w-full flex-col md:flex-row">
              <Label className="text-md font-bold dark:text-primary ">
                Name:{" "}
              </Label>
              <p className="break-all">{session?.user.name}</p>
            </div>
            <div className="flex gap-1 w-full flex-col md:flex-row">
              <Label className="text-md font-bold dark:text-primary ">
                Email:{" "}
              </Label>
              <p className="break-all">{session?.user.email}</p>
            </div>
          </div>
        </div>
        <div className="flex w-full gap-6 flex-wrap">
          <EditUserForm user={session?.user} />
          <EditUserPasswordForm user={session?.user} />
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
