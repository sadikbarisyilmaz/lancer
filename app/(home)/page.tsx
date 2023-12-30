import readUserSession from "../actions";
import { redirect } from "next/navigation";
export default async function Index() {
  const {
    data: { session },
  } = await readUserSession();

  if (!session) {
    return redirect("/login");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">Home</div>
  );
}
