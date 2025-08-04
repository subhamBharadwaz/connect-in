import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getUserByIdService = async (userId: string) => {
	const [foundUser] = await db
		.select({
			id: user.id,
			name: user.name,
			email: user.email,
			image: user.image,
			bio: user.bio,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt,
		})
		.from(user)
		.where(eq(user.id, userId))
		.limit(1);
	
	return foundUser;
}; 