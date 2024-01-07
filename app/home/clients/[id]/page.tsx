import { Banner } from "@/components/Banner";
import { ClientDetails } from "@/components/ClientDetails";

export default async function Page() {
  return (
    <div className="overflow-y-scroll md:overflow-hidden h-full">
      <Banner title={"Client Details"} />
      <div className="md:p-6  p-4 h-full w-full">
        <ClientDetails />
      </div>
    </div>
  );
}
