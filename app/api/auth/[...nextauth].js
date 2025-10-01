// import { postAPI } from "@/services/fetchAPI";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
const secret = process.env.NEXTAUTH_SECRET;

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials) => {
                const email = credentials.email;
                const password = credentials.password;
                // Database'e user için email ile query yapar
                // const user = await postAPI("/users", email)

                if (!user) {
                    throw new Error("No user found with this email");
                }

                const isMatch = await bcrypt.compare(password, user.hashedPassword);
                if (!isMatch) {
                    throw new Error("Password does not match");
                }

                if (user) {
                    return user;
                } else {
                    return null;
                }
            },
        }),
    ],

    session: {
        strategy: "jwt",
        secret: secret,
        maxAge: 60 * 60, // 1 hour
        updateAge: 60 * 60, // 1 hour

    },
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.email = user.email;
                token.name = user.fullname;
            }
            return token;
        },
        async session({ session, token }) {
            session.user.id = token.id;
            session.user.email = token.email;
            session.user.name = token.name;
            return session;
        },
    },
}
export default NextAuth(authOptions)