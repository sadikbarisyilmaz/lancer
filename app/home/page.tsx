import { Banner } from "@/components/Banner";
// import Link from "next/link";
// import readUserSession from "../actions";

export default async function Page() {
  // const {
  //   data: { session },
  // } = await readUserSession();

  // if (!session) {
  //   return (
  //     <main className="flex justify-center items-center">
  //       <p>
  //         You are not logged in. Please <Link href="/login">Log In</Link> to
  //         continue.
  //       </p>
  //     </main>
  //   );
  // }

  return (
    <>
      <Banner title="Upcoming" />
      <div className=" p-10 flex justify-center items-center">tasks</div>
    </>
  );
}