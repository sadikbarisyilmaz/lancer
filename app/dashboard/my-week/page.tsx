import { Banner } from "@/components/Banner";
import { MyWeek } from "@/components/MyWeek";
import { Weekly } from "@/lib/types";

const Page = () => {
  const weeklies: Weekly[] = [];

  return (
    <div className="h-full flex flex-col overflow-y-scroll">
      <Banner title="My Week" />
      <MyWeek weeklies={weeklies} />
    </div>
  );
};

export default Page;
