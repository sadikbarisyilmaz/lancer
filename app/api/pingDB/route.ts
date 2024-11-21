import createSupabaseServerClient from "@/lib/supabase/server";

export const dynamic = "force-dynamic"; // static by default, unless reading the request
export async function GET(request: Request) {
  const supabase = await createSupabaseServerClient();
  let { data, error } = await supabase
    .from("ping")
    .select()
    .order("id", { ascending: false });

  if (error) {
    console.log(error);
  } else {
    console.log(`pong`);
    return new Response(`pong`);
  }
}
