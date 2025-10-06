import { Banner } from "@/components/Banner";
import MyAccount from "@/components/MyAccount";

export default async function Page() {
  return (
    <div className="w-full overflow-y-scroll lg:overflow-hidden h-full flex flex-col">
      <Banner title="My Account" />
      <div className="lg:w-full flex flex-col md:items-center xl:justify-center lg:h-full animate-fadeIn">
        <MyAccount />
      </div>
    </div>
  );
}
