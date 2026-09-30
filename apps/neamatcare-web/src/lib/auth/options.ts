import type { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "@/config/env";
import { loginSchema } from "@/lib/validations/auth";
import { demoUsers } from "./demo-users";
import { isRole } from "./roles";

type ApiLoginResponse = {
  access_token: string;
  user: { id: string; name: string; email: string; role: string };
};

/** Authenticates against the FastAPI `auth` module (JWT issued by the backend). */
async function loginWithApi(email: string, password: string): Promise<User | null> {
  const response = await fetch(`${env.apiUrl}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    cache: "no-store",
  });
  if (!response.ok) return null;

  const data = (await response.json()) as ApiLoginResponse;
  if (!isRole(data.user.role)) return null;

  return { ...data.user, role: data.user.role, accessToken: data.access_token };
}

/** Local demo login (AUTH_DEMO_MODE=true) so the UI is usable before the backend exists. */
function loginWithDemo(email: string, password: string): User | null {
  if (!env.demoPassword || password !== env.demoPassword) return null;
  const user = demoUsers.find((candidate) => candidate.email === email.toLowerCase());
  return user ? { ...user, accessToken: `demo.${user.id}` } : null;
}

export const authOptions: NextAuthOptions = {
  secret: env.authSecret,
  session: { strategy: "jwt", maxAge: 60 * 60 * 12 },
  pages: { signIn: "/login", error: "/login" },
  providers: [
    CredentialsProvider({
      name: "Email and password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) return null;
        const { email, password } = parsed.data;
        return env.demoMode ? loginWithDemo(email, password) : loginWithApi(email, password);
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.accessToken = token.accessToken;
      return session;
    },
  },
};
