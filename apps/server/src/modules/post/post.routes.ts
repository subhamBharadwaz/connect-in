import { Router } from "express";
import {
	createPostHandler,
	deletePostByIdHandler,
	getAllPostsHandler,
	getPostByIdHandler,
	getUserPostsHandler,
	updatePostByIdHandler,
} from "./post.controller";
import { requireAuth } from "@/middlewares/auth.middleware";

const router = Router() as Router;

router.route("/posts").get(getAllPostsHandler);
router.route("/posts/user/:id").get(getUserPostsHandler);
router.route("/posts/:id").get(getPostByIdHandler);
router.route("/posts").post(requireAuth, createPostHandler);
router.route("/posts/:id").delete(requireAuth, deletePostByIdHandler);
router.route("/posts/:id").put(requireAuth, updatePostByIdHandler);

export default router;
