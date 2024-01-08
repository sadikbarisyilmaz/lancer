import React from "react";
import { Card } from "./ui/card";
import {
  Banknote,
  Bookmark,
  CalendarDays,
  Check,
  FileText,
  User,
} from "lucide-react";
import { Separator } from "./ui/separator";

export const TaskCard = () => {
  return (
    <Card className="px-3 py-4 text-foreground/90 flex flex-col justify-center dark:bg-black bg-white dark:bg-opacity-40 bg-opacity-40 gap-3 text-md">
      <h6 className="flex items-center gap-1 ">
        <Bookmark size={20} />
        Piano Lesson
      </h6>
      <Separator className=" bg-foreground/10" />
      <div>
        <div className="p-1 text-xs gap-2 flex items-center">
          <User size={18} />
          <p>Barış Yılmaz</p>
        </div>
        <div className="p-1 text-xs gap-2 flex items-center">
          <Banknote size={18} />
          <p>$400</p>
        </div>
        <div className="p-1 text-xs gap-2 flex items-center">
          <Check size={18} />
          <p>Paid</p>
        </div>
      </div>
    </Card>
  );
};
