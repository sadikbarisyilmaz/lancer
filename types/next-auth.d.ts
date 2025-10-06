import NextAuth, { DefaultSession } from "next-auth";

export interface ServerSession {
  user:
    | ({
        id: string;
      } & DefaultSession["user"])
    | undefined;
}

declare module "next-auth" {
  export interface Session {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}
