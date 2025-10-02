import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import type { NextAuthConfig } from "next-auth";

// Notice this is only an object, not a full Auth.js instance
export default {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (
          !credentials ||
          typeof credentials.email !== "string" ||
          typeof credentials.password !== "string"
        ) {
          throw new Error("Invalid credentials");
        }

        const { email, password } = credentials;

        const baseUrl =
          process.env.NEXTAUTH_URL ||
          process.env.NEXT_PUBLIC_APP_URL ||
          "http://localhost:3000";

        const res = await fetch(`${baseUrl}/api/user`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
          cache: "no-store",
        });

        if (!res.ok) {
          throw new Error("User not found.");
        }

        const user = await res.json();

        const isPasswordValid = await bcrypt.compare(
          password,
          user?.hashedPassword as string
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.full_name,
          image: user.avatar_url ?? null,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;
