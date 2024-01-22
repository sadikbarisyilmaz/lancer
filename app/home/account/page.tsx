import { readUserSession } from "@/app/actions";
import { Banner } from "@/components/Banner";
import { EditUserForm } from "@/components/forms/EditUserForm";

export default async function Page() {
  const {
    data: { session },
  } = await readUserSession();

  if (!session) {
    return <div>Loading</div>;
  }

  return (
    <div className="w-full overflow-y-scroll lg:overflow-hidden h-full flex flex-col">
      <Banner title="My Account" />
      <div className="p-6 lg:w-full flex flex-col items-center justify-center lg:h-full animate-fadeIn">
        <EditUserForm user={session.user} />
      </div>
    </div>
  );
}
