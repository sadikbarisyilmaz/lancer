import { readUserSession } from "@/app/actions";
import { Account } from "@/components/Account";
import { Banner } from "@/components/Banner";

export default async function Page() {
  const {
    data: { session },
  } = await readUserSession();

  if (!session) {
    return <div>Loading</div>;
  }

  return (
    <div className="w-full h-full">
      <Banner title="My Account" />
      <div className="p-6 lg:w-full flex flex-col h-full gap-1 animate-fadeIn">
        <Account user={session.user} />
      </div>
    </div>
  );
}
