import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import readUserSession from "../actions";
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
      <Navbar />
      <div className="w-full flex flex-col gap-4 h-screen">{children}</div>
    </>
  );
}
