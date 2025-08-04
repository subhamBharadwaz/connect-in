import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import * as schema from "../db/schema/auth";
import { eq } from "drizzle-orm";

// Debug logging
console.log('Auth Config Debug:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('CORS_ORIGIN:', process.env.CORS_ORIGIN);
console.log('BETTER_AUTH_URL:', process.env.BETTER_AUTH_URL);
console.log('Is Production:', process.env.NODE_ENV === 'production');

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  trustedOrigins: [
    process.env.CORS_ORIGIN!,
    process.env.BETTER_AUTH_URL!,
    "http://localhost:3000",
    "http://localhost:3001",
  ],
  emailAndPassword: {
    enabled: true,
    async onSignUp(user: any, { email, password, name, bio }: { email: string; password: string; name: string; bio?: string }) {
      // Update the user with the bio field if provided
      if (bio && bio.trim() !== "") {
        await db
          .update(schema.user)
          .set({ bio: bio.trim() })
          .where(eq(schema.user.id, user.id));
      }
      
      return user;
    },
  },
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
  // Force production cookie settings for Railway deployment
  cookies: {
    sessionToken: {
      name: "__Secure-better-auth.session_token",
      httpOnly: true,
      secure: true, // Always secure for Railway
      sameSite: "none", // Always none for cross-origin
      maxAge: 60 * 60 * 24 * 7, // 7 days
    },
    callbackUrl: {
      name: "__Secure-better-auth.callback_url",
      httpOnly: true,
      secure: true, // Always secure for Railway
      sameSite: "none", // Always none for cross-origin
      maxAge: 60 * 5, // 5 minutes
    },
    csrfToken: {
      name: "__Host-better-auth.csrf_token",
      httpOnly: true,
      secure: true, // Always secure for Railway
      sameSite: "none", // Always none for cross-origin
      maxAge: 60 * 60 * 24, // 24 hours
    },
  },
});