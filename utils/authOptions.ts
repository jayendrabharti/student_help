import GoogleProvider from "next-auth/providers/google";
import { getUserByEmailAction } from "@/actions/users";
import prisma from "@/prisma/client";
import { getErrorMessage } from "./utils";
import type { NextAuthOptions } from "next-auth";

declare module "next-auth" {
  interface Profile {
    picture?: string;
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }) {
      if (!session.user?.email) return session;

      const { data: userData } = await getUserByEmailAction({
        email: session.user.email as string,
      });

      if (!userData) return session;

      const user = userData?.user;
      if (user) {
        session.user = user;
      }
      return session;
    },
    async signIn({ profile }) {
      try {
        if (!profile) {
          return false;
        }
        const userExists = await prisma.user.findUnique({
          where: {
            email: profile.email,
          },
        });

        if (!userExists && profile) {
          const userData = await prisma.user.create({
            data: {
              name: profile.name as string,
              email: profile.email as string,
              profileImageUrl: profile.picture as string,
              image: profile.picture as string,
            },
          });
          if (!userData) throw "User not created !!";
        }
        return true;
      } catch (error) {
        console.log("Error initializing user: " + getErrorMessage(error));
        return false;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
