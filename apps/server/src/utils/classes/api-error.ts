import { HttpStatusCode } from "@/types/http.model.type";
import BaseError from "./base-error";

class APIError extends BaseError {
	constructor(
		message: string,
		methodName = "",
		httpCode = HttpStatusCode.INTERNAL_SERVER,
		isOperational = true,
	) {
		super("", message, methodName, httpCode, isOperational);
	}
}

export default APIError;
