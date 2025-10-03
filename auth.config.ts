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
