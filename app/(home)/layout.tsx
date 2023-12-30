import { Navbar } from "@/components/Navbar";
import readUserSession from "../actions";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    data: { session },
  } = await readUserSession();

  if (!session) {
    return redirect("/login");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
