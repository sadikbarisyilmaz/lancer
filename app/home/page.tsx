// import Link from "next/link";
// import readUserSession from "../actions";
import { redirect } from "next/navigation";

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

  return <div className="">Home</div>;
}
