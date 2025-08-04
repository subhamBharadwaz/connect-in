import express from "express";
import { getUserByIdHandler } from "./user.controller";

const router = express.Router();

router.get("/users/:id", getUserByIdHandler);

export default router; 