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

	// Fetch the created post with author information
	const [postWithAuthor] = await db
		.select({
			id: post.id,
			content: post.content,
			createdAt: post.createdAt,
			authorId: post.authorId,
			author: {
				id: user.id,
				name: user.name,
				email: user.email,
			},
		})
		.from(post)
		.leftJoin(user, eq(post.authorId, user.id))
		.where(eq(post.id, createdPost.id))
		.limit(1);

	return postWithAuthor;
};

export const getAllPostsService = async (page = 1, limit = 10) => {
	const offset = (page - 1) * limit;
	
	const posts = await db
		.select({
			id: post.id,
			content: post.content,
			createdAt: post.createdAt,
			authorId: post.authorId,
			author: {
				id: user.id,
				name: user.name,
				email: user.email,
			},
		})
		.from(post)
		.leftJoin(user, eq(post.authorId, user.id))
		.orderBy(post.createdAt)
		.limit(limit)
		.offset(offset);
	
	return posts;
};

export const getPostByIdService = async (postId: string) => {
	const [foundPost] = await db
		.select({
			id: post.id,
			content: post.content,
			createdAt: post.createdAt,
			authorId: post.authorId,
			author: {
				id: user.id,
				name: user.name,
				email: user.email,
			},
		})
		.from(post)
		.leftJoin(user, eq(post.authorId, user.id))
		.where(eq(post.id, postId))
		.limit(1);
	return foundPost;
};

export const getUserPostsService = async (userId: string, page = 1, limit = 10) => {
	const offset = (page - 1) * limit;
	
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
		.orderBy(post.createdAt)
		.limit(limit)
		.offset(offset);
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

	// Fetch the updated post with author information
	const [postWithAuthor] = await db
		.select({
			id: post.id,
			content: post.content,
			createdAt: post.createdAt,
			authorId: post.authorId,
			author: {
				id: user.id,
				name: user.name,
				email: user.email,
			},
		})
		.from(post)
		.leftJoin(user, eq(post.authorId, user.id))
		.where(eq(post.id, updatedPost.id))
		.limit(1);

	return postWithAuthor;
};

export const deletePostByIdService = async (postId: string, userId: string) => {
	const [deletedPost] = await db
		.delete(post)
		.where(and(eq(post.id, postId), eq(post.authorId, userId)))
		.returning();
	return deletedPost;
};
