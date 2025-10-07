import React from "react";
import { Card } from "./ui/card";
import { Banknote, Bookmark, Check, Clock3, User, X } from "lucide-react";
import { Separator } from "./ui/separator";
import { Weekly } from "@/lib/types";
import Link from "next/link";

interface Props {
  weekly: Weekly;
}

export const WeeklyCard = ({ weekly }: Props) => {
  return (
    <Link
      className="w-full flex justify-center"
      href={`/dashboard/weeklies/${[weekly.id]}`}
    >
      <Card className="px-3 py-4 w-full text-foreground/90 flex flex-col justify-center dark:bg-black bg-white dark:bg-opacity-50 bg-opacity-50 gap-3 text-md hover:-translate-y-1 transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl max-w-sm">
        <h6 className="flex text-sm font-semibold items-center gap-1 ">
          <div className="p-1 text-xs gap-2 flex items-center">
            <span className=" text-opacity-60 text-sky-600">
              <Clock3 size={24} />
            </span>
            <p>{weekly.set_time}</p>
          </div>
        </h6>
        <Separator color="#fbbf5d" className=" bg-foreground/10" />
        <div>
          <div>
            <span className=" text-opacity-100 text-orange-300">
              <Bookmark size={18} />
            </span>
            {weekly.title}
          </div>
          <div className="p-1 text-xs gap-2 flex items-center">
            <span className=" text-opacity-60 text-indigo-500">
              <User size={18} />
            </span>
            {/* @ts-ignore */}
            <p>{weekly.clients.name}</p>
          </div>
          <div className="p-1 text-xs gap-2 flex items-center">
            <span className=" text-opacity-60 text-green-700">
              <Banknote size={18} />
            </span>
            <p>${weekly.fee}</p>
          </div>

          <div className="p-1 text-xs gap-2 flex items-center">
            <span className=" text-opacity-60 text-sky-600">
              <Clock3 size={18} />
            </span>
            <p>{weekly.set_time}</p>
          </div>
          <div className="p-1 text-xs gap-2 flex items-center">
            <span
              className={`${
                weekly.payment_status === "Payment Done"
                  ? "text-green-400"
                  : "text-red-700"
              }`}
            >
              {weekly.payment_status === "Payment Done" ? (
                <Check size={18} />
              ) : (
                <X size={18} />
              )}
            </span>
            <p>{weekly.payment_status}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
};
