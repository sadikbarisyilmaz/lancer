"use server";
import createSupabaseServerClient from "@/lib/supabase/server";
import { unstable_noStore as noStore } from "next/cache";
export default async function readUserSession() {
  const supabase = await createSupabaseServerClient();
  noStore();
  return supabase.auth.getSession();
}
