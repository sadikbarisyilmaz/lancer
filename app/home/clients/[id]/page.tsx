import { Banner } from "@/components/Banner";
import { ClientCard } from "@/components/ClientCard";
import { ClientDetails } from "@/components/ClientDetails";

export default async function Page() {
  return (
    <>
      <Banner title={"Client Details"} />
      <div className="p-6 flex justify-center w-full">
        <ClientDetails />
      </div>
    </>
  );
}
