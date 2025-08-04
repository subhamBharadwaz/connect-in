import { betterAuth } from "better-auth";

export const auth = betterAuth({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000",
  secret: process.env.BETTER_AUTH_SECRET || "your-secret-key",
}); 