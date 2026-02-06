import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

     authorize: async (credentials) => {
  // 1. Basic Validation
  if (!credentials?.email || !credentials?.password) {
    throw new Error("Please enter both email and password.");
  }

  const baseUrl = process.env.NEXT_PUBLIC_URL;

  try {
    const res = await fetch(`${baseUrl}/api/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
      cache: "no-store",
    });

    const data = await res.json();

    // 2. Handle API errors (401, 404, 500 etc.)
    if (!res.ok) {
      // Throw the specific message from your API (e.g., "Invalid password")
      throw new Error(data.error || "Authentication failed.");
    }

    // 3. Success
    return {
      id: data.id,
      email: data.email,
      name: data.full_name,
      image: data.avatar_url ?? null,
    };

  } catch (error: any) {
    // 4. Handle Network or Thrown Errors
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unexpected error occurred. Please try again.");
  }
},
    }),
  ],
} satisfies NextAuthConfig;
