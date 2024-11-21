import { Banner } from "@/components/Banner";
import { Loader } from "@/components/Loader";

export default function Loading() {
  return (
    <div className="h-full w-full flex lg:max-w-7xl flex-col">
      <Banner title="Clients" />
      <div>
        <Loader />
      </div>
    </div>
  );
}
