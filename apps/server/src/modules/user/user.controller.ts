import asyncHandler from "@/middlewares/async-handler.middleware";
import type { Request, Response } from "express";
import { getUserByIdService } from "./user.service";

/** 
@desc    Get User By ID
@route   GET /api/v1/users/:id
@access  Public
*/
export const getUserByIdHandler = asyncHandler(
	async (req: Request, res: Response) => {
		const { id } = req.params;

		if (!id) {
			res.status(400).json({
				success: false,
				message: "User ID is required",
			});
			return;
		}

		const user = await getUserByIdService(id);

		if (!user) {
			res.status(404).json({
				success: false,
				message: "User not found",
			});
			return;
		}

		res.status(200).json({
			success: true,
			user,
		});
	},
); 