import "dotenv/config";
import cors from "cors";
import express, {
	type Express,
	type Request,
	type NextFunction,
	type Response,
} from "express";
import { toNodeHandler } from "better-auth/node";
import cookieParser from "cookie-parser";
import type BaseError from "./utils/classes/base-error";
import ErrorHandler from "./utils/classes/error-handler";
import logger from "./middlewares/logger.middleware";
import { HttpStatusCode } from "./types/http.model.type";
import { auth } from "./lib/auth";
import post from "@/modules/post/post.routes";

const app: Express = express();
const errorHandler = new ErrorHandler(logger);

app.use(
	cors({
		origin: process.env.CORS_ORIGIN || "",
		methods: ["GET", "POST", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
		credentials: true,
	}),
);

app.all("/api/auth{/*path}", toNodeHandler(auth));

app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => {
	res.status(200).send("OK");
});

app.use("/api/v1", post);

app.use(errorMiddleware);

process.on("uncaughtException", async (error: Error) => {
	await errorHandler.handleError(error);
	if (!errorHandler.isTrustedError(error)) process.exit(1);
});

process.on("unhandledRejection", (reason: Error) => {
	throw reason;
});

// Error middleware - same pattern as your working app
async function errorMiddleware(
	err: BaseError,
	req: Request,
	res: Response,
	next: NextFunction,
) {
	if (!errorHandler.isTrustedError(err)) {
		res.status(HttpStatusCode.INTERNAL_SERVER).json({
			error: "Something went wrong, please try again later.",
			code: HttpStatusCode.INTERNAL_SERVER,
		});
		next(err);
		return;
	}
	await errorHandler.handleError(err);
	res.status(err.httpCode).json({
		error: err.message,
		code: err.httpCode,
	});
}

export default app;
