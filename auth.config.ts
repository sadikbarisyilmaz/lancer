import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUser } from "./app/actions";
import bcrypt from "bcrypt";

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
        const user = await getUser(email);

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
