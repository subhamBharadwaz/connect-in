import type { Request, Response, NextFunction } from "express";

import { ZodError, ZodObject, type ZodRawShape } from "zod";

const validateResource =
	(schema: ZodObject<ZodRawShape, any>) =>
	(req: Request, res: Response, next: NextFunction) => {
		try {
			schema.parse({
				body: req.body,
				query: req.query,
				params: req.params,
			});
			next();
		} catch (error: any) {
			if (error instanceof ZodError) {
				const formattedErrors = error.issues.map((issue) => ({
					field: issue.path.join("."),
					message: issue.message,
				}));

				return res.status(400).json({
					status: "fail",
					message: "Validation failed",
					errors: formattedErrors,
				});
			}
			// fallback for non-Zod errors
			return res.status(500).json({
				status: "error",
				message: "Internal server error",
			});
		}
	};

export default validateResource;
