import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const getUser = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  return user ?? null;
};

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = body?.email as string | undefined;

  if (!email) {
    return NextResponse.json({ error: "Missing email" }, { status: 400 });
  }

  try {
    const user = await getUser(email);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
