import { auth } from "@/lib/auth";
import type { Request, Response, NextFunction } from "express";

export const requireAuth = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		// Debug: Log all cookies to see what's available
		console.log("All cookies:", req.cookies);
		
		// Try both cookie names since the configuration might be inconsistent
		const sessionToken = req.cookies?.["__Secure-better-auth.session_token"] || 
							req.cookies?.["better-auth.session_token"];

		if (!sessionToken) {
			console.log("No session token found in cookies");
			return res.status(401).json({
				success: false,
				message: "No session token found. Please log in.",
			});
		}

		console.log("Found session token:", sessionToken.substring(0, 10) + "...");

		const headers = new Headers();
		// Use the same cookie name that we found
		const cookieName = req.cookies?.["__Secure-better-auth.session_token"] 
			? "__Secure-better-auth.session_token" 
			: "better-auth.session_token";
		headers.set("cookie", `${cookieName}=${sessionToken}`);

		const session = await auth.api.getSession({
			headers: headers,
		});

		if (!session || !session.user) {
			console.log("Invalid session or no user");
			return res.status(401).json({
				success: false,
				message: "Invalid or expired session. Please log in again.",
			});
		}

		console.log("Session validated for user:", session.user.email);
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