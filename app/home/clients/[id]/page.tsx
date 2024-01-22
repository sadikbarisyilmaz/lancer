import { getClient } from "@/app/actions";
import { Banner } from "@/components/Banner";
import { ClientDetails } from "@/components/ClientDetails";

export default async function Page({ params }: { params: { id: string } }) {
  const { ...client } = await getClient(params.id);

  return (
    <div className="overflow-y-scroll lg:overflow-hidden h-full">
      <Banner title={"Client Details"} />
      <div className="lg:p-6 p-4 md:px-40 md:py-20 h-full w-full animate-fadeIn">
        <ClientDetails client={client} />
      </div>
    </div>
  );
}
