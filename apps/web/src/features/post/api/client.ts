import { authClient } from "@/lib/auth-client";
import type {
	CreatePostRequest,
	CreatePostResponse,
	DeletePostResponse,
	GetPostResponse,
	GetPostsResponse,
	GetUserPostsResponse,
	UpdatePostRequest,
	UpdatePostResponse,
	GetUserResponse,
} from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

class ApiError extends Error {
	constructor(
		public status: number,
		public message: string,
		public data?: any
	) {
		super(message);
		this.name = "ApiError";
	}
}

async function apiRequest<T>(
	endpoint: string,
	options: RequestInit = {}
): Promise<T> {
	const url = `${API_BASE_URL}/api/v1${endpoint}`;
	
	const config: RequestInit = {
		headers: {
			"Content-Type": "application/json",
			...options.headers,
		},
		...options,
	};

	try {
		// Use better-auth's $fetch which handles authentication automatically
		const response = await authClient.$fetch(url, config);
		
		// Return the response as is - the API returns { success: true, posts: [...] }
		return response as T;
	} catch (error: any) {
		// Handle better-auth specific errors
		if (error?.error?.message) {
			throw new ApiError(
				error.error.status || 401,
				error.error.message,
				error.error
			);
		}
		
		if (error instanceof ApiError) {
			throw error;
		}
		
		throw new ApiError(0, "Network error", { originalError: error });
	}
}

// Post API functions
export const postApi = {
	// Get all posts with pagination
	getAllPosts: (page = 1, limit = 10): Promise<GetPostsResponse> =>
		apiRequest<GetPostsResponse>(`/posts?page=${page}&limit=${limit}`),

	// Get post by ID
	getPostById: (id: string): Promise<GetPostResponse> =>
		apiRequest<GetPostResponse>(`/posts/${id}`),

	// Get user posts with pagination
	getUserPosts: (userId: string, page = 1, limit = 10): Promise<GetUserPostsResponse> =>
		apiRequest<GetUserPostsResponse>(`/posts/user/${userId}?page=${page}&limit=${limit}`),

	// Create post
	createPost: (data: CreatePostRequest): Promise<CreatePostResponse> =>
		apiRequest<CreatePostResponse>("/posts", {
			method: "POST",
			body: JSON.stringify(data),
		}),

	// Update post
	updatePost: (
		id: string,
		data: UpdatePostRequest
	): Promise<UpdatePostResponse> =>
		apiRequest<UpdatePostResponse>(`/posts/${id}`, {
			method: "PUT",
			body: JSON.stringify(data),
		}),

	// Delete post
	deletePost: (id: string): Promise<DeletePostResponse> =>
		apiRequest<DeletePostResponse>(`/posts/${id}`, {
			method: "DELETE",
		}),
};

// User API functions
export const userApi = {
	// Get user by ID
	getUserById: (id: string): Promise<GetUserResponse> =>
		apiRequest<GetUserResponse>(`/users/${id}`),
}; 