"use server";

import { authClient } from "@/lib/auth-client";
import { createPostSchema } from "../schemas/post.schema";
import type { CreatePostFormData } from "../schemas/post.schema";

const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

export async function createPostAction(data: CreatePostFormData) {
	try {
		// Validate the data
		const validatedData = createPostSchema.parse(data);

		// Get the current session
		const session = await authClient.getSession();
		if (!session?.data?.session) {
			throw new Error("Authentication required");
		}

		// Make the API request
		const response = await fetch(`${API_BASE_URL}/api/v1/posts`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(validatedData),
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			throw new Error(errorData.message || "Failed to create post");
		}

		const result = await response.json();
		return { success: true, data: result };
	} catch (error) {
		console.error("Create post action error:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error occurred",
		};
	}
}

export async function updatePostAction(id: string, data: CreatePostFormData) {
	try {
		// Validate the data
		const validatedData = createPostSchema.parse(data);

		// Get the current session
		const session = await authClient.getSession();
		if (!session?.data?.session) {
			throw new Error("Authentication required");
		}

		// Make the API request
		const response = await fetch(`${API_BASE_URL}/api/v1/posts/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(validatedData),
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			throw new Error(errorData.message || "Failed to update post");
		}

		const result = await response.json();
		return { success: true, data: result };
	} catch (error) {
		console.error("Update post action error:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error occurred",
		};
	}
}

export async function deletePostAction(id: string) {
	try {
		// Get the current session
		const session = await authClient.getSession();
		if (!session?.data?.session) {
			throw new Error("Authentication required");
		}

		// Make the API request
		const response = await fetch(`${API_BASE_URL}/api/v1/posts/${id}`, {
			method: "DELETE",
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			throw new Error(errorData.message || "Failed to delete post");
		}

		return { success: true };
	} catch (error) {
		console.error("Delete post action error:", error);
		return {
			success: false,
			error: error instanceof Error ? error.message : "Unknown error occurred",
		};
	}
} 