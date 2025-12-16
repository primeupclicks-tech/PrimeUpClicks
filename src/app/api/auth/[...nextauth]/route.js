import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import pool from "@/lib/db";

async function getUserByEmail(email) {
  const client = await pool.connect();
  const res = await client.query(
    "SELECT id, nome_completo, email, senha, email_verificado FROM usuario WHERE email = $1",
    [email]
  );
  client.release();
  return res.rows[0] || null;
}

const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: "Credenciais",
      credentials: {
        email: { label: "Email", type: "text" },
        senha: { label: "Senha", type: "password" }
      },
      async authorize(credentials) {
        const { email, senha } = credentials;
        
        // Buscar usuário
        const user = await getUserByEmail(email);
        if (!user) return null;
        
        // Verificar se email está verificado
        if (!user.email_verificado) {
          throw new Error("EMAIL_NAO_VERIFICADO");
        }
        
        // Verificar senha
        if (!user.senha) return null;
        const ok = await compare(senha, user.senha);
        if (!ok) return null;
        
        // Retornar usuário
        return { 
          id: String(user.id), 
          email: user.email,
          name: user.nome_completo,
          email_verificado: user.email_verificado
        };
      }
    })
  ],

  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account?.provider === "google" && profile) {
        const existing = await getUserByEmail(profile.email);
        if (existing) {
          token.id = String(existing.id);
          token.name = existing.nome_completo;
        } else {
          const client = await pool.connect();
          const res = await client.query(
            "INSERT INTO usuario (nome_completo, email, email_verificado) VALUES ($1, $2, $3) RETURNING id, nome_completo",
            [profile.name ?? "Usuário", profile.email, true]
          );
          token.id = String(res.rows[0].id);
          token.name = res.rows[0].nome_completo;
          client.release();
        }
      }

    if (user) {
      token.id = user.id;
      token.name = user.name;
      token.email_verificado = user.email_verificado;
    }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.email_verificado = token.email_verificado;
      }
      return session;
    }
  },

 pages: {
    signIn: "/login"
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
export { authOptions };