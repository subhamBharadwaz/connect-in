import { z } from "zod";


export const createPostSchema = z.object({
	content: z
		.string()
		.min(1, "Post content is required")
		.max(500, "Post content must be 500 characters or fewer")
		.trim(),
});


export const updatePostSchema = z.object({
	content: z
		.string()
		.min(1, "Post content is required")
		.max(500, "Post content must be 500 characters or fewer")
		.trim(),
});


export type CreatePostFormData = z.infer<typeof createPostSchema>;
export type UpdatePostFormData = z.infer<typeof updatePostSchema>; 