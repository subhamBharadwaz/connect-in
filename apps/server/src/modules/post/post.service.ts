import { db } from "@/db";
import { post, user } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export const createPostService = async (authorId: string, content: string) => {
	const [createdPost] = await db
		.insert(post)
		.values({
			content,
			authorId,
		})
		.returning();
	return createdPost;
};

export const getAllPostsService = async () => {
	return db.select().from(post).orderBy(post.createdAt);
};

export const getPostByIdService = async (postId: string) => {
	const [foundPost] = await db
		.select()
		.from(post)
		.where(eq(post.id, postId))
		.limit(1);
	return foundPost;
};

export const getUserPostsService = async (userId: string) => {
	return db
		.select({
			id: post.id,
			content: post.content,
			createdAt: post.createdAt,

			author: {
				id: user.id,
				name: user.name,
				email: user.email,
			},
		})
		.from(post)
		.leftJoin(user, eq(post.authorId, user.id))
		.where(eq(post.authorId, userId))
		.orderBy(post.createdAt);
};

export const updatePostByIdService = async (
	postId: string,
	userId: string,
	content: string,
) => {
	const [updatedPost] = await db
		.update(post)
		.set({ content })
		.where(and(eq(post.id, postId), eq(post.authorId, userId)))
		.returning();

	return updatedPost;
};

export const deletePostByIdService = async (postId: string, userId: string) => {
	const [deletedPost] = await db
		.delete(post)
		.where(and(eq(post.id, postId), eq(post.authorId, userId)))
		.returning();
	return deletedPost;
};
