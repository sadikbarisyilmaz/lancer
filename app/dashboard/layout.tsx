import { Navbar } from "@/components/Navbar";
import { readUserSession } from "../actions";
import { MobileNavbar } from "@/components/MobileNavbar";
import Link from "next/link";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data } = await readUserSession();

  if (!data.session) {
    return (
      <main className="flex flex-col justify-center items-center w-full h-screen p-4">
        <p>
          You are not logged in. Please{" "}
          <Link className="font-bold" href="/">
            Log In
          </Link>{" "}
          to continue.
        </p>
      </main>
    );
  }
  return (
    <>
      <MobileNavbar />
      <Navbar />
      <div className="pt-[70px] lg:pt-0 w-full flex flex-col h-screen">
        {children}
      </div>
    </>
  );
}
