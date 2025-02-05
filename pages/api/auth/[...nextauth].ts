import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/User";
import dbConnect from "../../../lib/dbConnect";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string;
      email?: string;
      profileImage?: string;
      role?: string;
      id?: string;
    };
  }
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();
        const user = await User.findOne({ email: credentials.email });
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          if (user) {
            return {
              id: user._id.toString(),
              email: user.email,
              name: user.name,
              role: user.role,
              profileImage: user?.profileImage,
            };
          }
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      await dbConnect();
      const dbUser = await User.findById(token.id).select("-password");
      session.user = { ...dbUser._doc, id: dbUser._id.toString() };
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.JWT_SECRET,
});
