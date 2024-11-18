import NextAuth, { User } from "next-auth";
import { encode as defaultEncode } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import { v4 as uuid } from "uuid";
import { LoginSchema } from "./utils/schemas";

const authConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { username, password } = validatedFields.data;
          if (username === "user" && password === "user123") {
            const user: User = {
              id: process.env.DEFAULT_USER_ID,
              name: process.env.DEFAULT_USERNAME,
              email: process.env.DEFAULT_EMAIL,
            };
            return user;
          }
          if (!username || !password) return null;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token }: any) {
      return token;
    },
    async session({ session, token }: any) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async signIn({ account }: any) {
      if (account.provider === "credentials") {
        return true;
      }
      return false;
    },
  },
  jwt: {
    encode: async (params: any) => {
      if (params.token?.credentials) {
        const sessionToken = uuid();

        if (!params.token.sub) {
          throw new Error("No user ID found in token");
        }
        return sessionToken;
      }
      return defaultEncode(params);
    },
  },
  session: { strategy: "jwt" as const },
  secret: process.env.AUTH_SECRET,
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
export { authConfig };
