import { readUserSession } from "./actions";
import { redirect } from "next/navigation";

export default async function Page() {
  const {
    data: { session },
  } = await readUserSession();

  if (session === null) {
    // redirect("/login");
  } else {
    redirect("/home/upcoming");
  }
}
