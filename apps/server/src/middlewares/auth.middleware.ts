import { auth } from "@/lib/auth";
import type { Request, Response, NextFunction } from "express";

export const requireAuth = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const sessionToken = req.cookies?.["__Secure-better-auth.session_token"];

		if (!sessionToken) {
			return res.status(401).json({
				success: false,
				message: "No session token found. Please log in.",
			});
		}

		const headers = new Headers();
		headers.set("cookie", `better-auth.session_token=${sessionToken}`);

		const session = await auth.api.getSession({
			headers: headers,
		});

		if (!session || !session.user) {
			return res.status(401).json({
				success: false,
				message: "Invalid or expired session. Please log in again.",
			});
		}

		(req as any).user = session.user;
		(req as any).session = session;
		next();
	} catch (error) {
		console.error("Auth middleware error:", error);
		return res.status(401).json({
			success: false,
			message: "Authentication failed",
		});
	}
};

