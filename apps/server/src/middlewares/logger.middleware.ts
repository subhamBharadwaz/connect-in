import env from "@/env";
import pino from "pino";

const logger = pino({
	transport: {
		target: "pino-pretty",
		options: {
			colorize: true,
			translateTime: "SYS:standard",
			ignore: "pid,hostname",
			singleLine: false,
		},
	},
	level: env.LOG_LEVEL || "info",
});

export default logger;
