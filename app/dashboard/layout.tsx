import { Navbar } from "@/components/Navbar";
import { MobileNavbar } from "@/components/MobileNavbar";
import { auth } from "@/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <>
      <MobileNavbar />
      <Navbar user={session?.user} />
      <div className="pt-[70px] lg:pt-0 w-full flex flex-col h-screen">
        {children}
      </div>
    </>
  );
}
