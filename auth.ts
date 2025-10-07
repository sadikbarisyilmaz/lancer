import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  // pages: {
  //   signIn: "/",
  // },
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        token.email = session.email;
        token.name = session.name;
      }
      if (user) {
        // User is available during sign-in
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = (token as any).id as string;
      return session;
    },
  },
  ...authConfig,
});
