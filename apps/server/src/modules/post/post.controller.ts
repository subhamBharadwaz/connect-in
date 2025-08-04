import asyncHandler from "@/middlewares/async-handler.middleware";
import type { NextFunction, Request, Response } from "express";
import {
	createPostService,
	deletePostByIdService,
	getAllPostsService,
	getPostByIdService,
	getUserPostsService,
	updatePostByIdService,
} from "./post.service";

export interface IGetUserAuthInfoRequest extends Request {
	user?: any;
}

/** 
@desc    Get User Posts
@route   GET /api/v1/posts/user/:id
@access  Public
*/

export const getUserPostsHandler = asyncHandler(
	async (req: Request, res: Response) => {
		const { id } = req.params;
		const page = Number.parseInt(req.query.page as string) || 1;
		const limit = Number.parseInt(req.query.limit as string) || 10;

		if (!id) {
			res.status(400).json({
				success: false,
				message: "User ID is required",
			});
			return;
		}

		const userPosts = await getUserPostsService(id, page, limit);

		if (!userPosts || userPosts.length === 0) {
			res.status(404).json({
				success: false,
				message: "No posts found for this user",
			});
			return;
		}
		res.status(200).json({
			success: true,
			posts: userPosts,
			count: userPosts.length,
			userId: id,
		});
	},
);

/** 
@desc    Create Post
@route   POST /api/v1/posts
@access  Private 
*/
export const createPostHandler = asyncHandler(
	async (req: IGetUserAuthInfoRequest, res: Response) => {
		const { content } = req.body;
		const userId = req.user.id;

		const newPost = await createPostService(userId, content);
		res.status(201).json({ success: true, post: newPost });
	},
);

/** 
@desc    Get All Posts
@route   GET /api/v1/posts
@access  Public
*/
export const getAllPostsHandler = asyncHandler(async (req: Request, res: Response) => {
	const page = Number.parseInt(req.query.page as string) || 1;
	const limit = Number.parseInt(req.query.limit as string) || 10;
	
	const posts = await getAllPostsService(page, limit);
	res.status(200).json({ success: true, posts });
});

/** 
@desc    Get Single Post By Id
@route   GET /api/v1/posts/:id
@access  Public
*/
export const getPostByIdHandler = asyncHandler(
	async (req: Request, res: Response) => {
		const { id } = req.params;
		const post = await getPostByIdService(id);
		if (!post) {
			res.status(404).json({ success: false, message: "Post not found" });
			return;
		}
		res.status(200).json({ success: true, post });
	},
);

/** 
@desc    Delete Post By Id
@route   DELETE /api/v1/posts/:id
@access  Private
*/
export const deletePostByIdHandler = asyncHandler(
	async (req: any, res: Response) => {
		const { id } = req.params;
		const userId = req.user.id;

		const deleted = await deletePostByIdService(id, userId);
		if (!deleted) {
			res
				.status(403)
				.json({ success: false, message: "Unauthorized or post not found" });
			return;
		}

		res.status(200).json({ success: true, message: "Post deleted" });
	},
);

/** 
@desc    Update Post By Id
@route   UPDATE /api/v1/posts/:id
@access  Private
*/
export const updatePostByIdHandler = asyncHandler(
	async (req: IGetUserAuthInfoRequest, res: Response) => {
		const { id } = req.params;
		const { content } = req.body;
		const userId = req.user.id;

		if (!content || typeof content !== "string") {
			res.status(400).json({ success: false, message: "Invalid content" });
			return;
		}

		const updated = await updatePostByIdService(id, userId, content);
		if (!updated) {
			res
				.status(403)
				.json({ success: false, message: "Unauthorized or post not found" });
			return;
		}

		res.status(200).json({ success: true, post: updated });
	},
);
