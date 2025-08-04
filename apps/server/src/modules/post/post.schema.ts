import { z } from "zod";

export const createPostSchema = z.object({
	body: z.object({
		content: z
			.string()
			.min(1, "Post content is required")
			.max(500, "Post content must be 500 characters or fewer"),
	}),
});
