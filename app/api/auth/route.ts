import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs"; 

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const { email, password } = body || {}; 

  if (!email || !password) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.hashedPassword) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Compare the plain-text password with the hash
    const passwordsMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!passwordsMatch) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

   
    const { hashedPassword: _, ...userWithoutPassword } = user;
    return NextResponse.json(userWithoutPassword);
    
  } catch (error) {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}