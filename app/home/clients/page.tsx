import { getClients } from "@/app/actions";
import { Banner } from "@/components/Banner";
import { Clients } from "@/components/Clients";

export default async function Page() {
  const { clients } = await getClients();

  return (
    <div className="h-full flex flex-col overflow-y-scroll">
      <Banner title="Clients" />
      <div className="p-6 xl:p-2 lg:w-full flex flex-col gap-1 animate-fadeIn">
        <div className="xl:px-48 xl:pt-24  flex flex-col md:self-center md:w-full xl:scale-125">
          <Clients clients={clients} />
        </div>
      </div>
    </div>
  );
}
