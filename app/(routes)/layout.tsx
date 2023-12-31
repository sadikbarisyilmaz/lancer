import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import readUserSession from "../actions";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    data: { session },
  } = await readUserSession();

  if (!session) {
    return (
      <main className="flex justify-center items-center w-full h-screen p-4">
        <p>
          You are not logged in. Please{" "}
          <Link className="font-bold" href="/login">
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
      {children}
    </>
  );
}
