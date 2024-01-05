import { Banner } from "@/components/Banner";
import { ClientCard } from "@/components/ClientCard";
import { ClientDetails } from "@/components/ClientDetails";

export default async function Page() {
  return (
    <>
      <Banner title={"Client Details"} />
      <div className="md:p-6 p-4 h-full w-full">
        <ClientDetails />
      </div>
    </>
  );
}
