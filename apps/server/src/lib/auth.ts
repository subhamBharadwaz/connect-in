import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db";
import * as schema from "../db/schema/auth";
import { eq } from "drizzle-orm";
import env from "@/env";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: schema,
	}),
	advanced: {
		crossSubDomainCookies: {
			enabled: true,
			domain: env.BETTER_AUTH_URL, // your domain
		},
	},
	trustedOrigins: [
		env.CORS_ORIGIN,
		env.CORS_ORIGIN,
		"http://localhost:3000",
		"http://localhost:3001",
	],
	emailAndPassword: {
		enabled: true,
		async onSignUp(
			user: any,
			{
				email,
				password,
				name,
				bio,
			}: { email: string; password: string; name: string; bio?: string },
		) {
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
});
