import NextAuth, { User } from "next-auth";
import { encode as defaultEncode } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import { v4 as uuid } from "uuid";
import { LoginSchema } from "./utils/schemas";
import { env } from "./libs/env";

const authConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { username, password } = validatedFields.data;
          if (
            username === env.USER_DEFAULT_USERNAME &&
            password === env.USER_DEFAULT_PASSWORD
          ) {
            const user: User = {
              id: env.USER_DEFAULT_ID,
              name: env.USER_DEFAULT_USERNAME,
              email: env.USER_DEFAULT_USERNAME,
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
  secret: env.AUTH_SECRET,
};

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
export { authConfig };
