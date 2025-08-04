import type {

	GetPostResponse,
	GetPostsResponse,
	GetUserPostsResponse,

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

async function serverApiRequest<T>(
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
		// Use regular fetch for server-side requests
		const response = await fetch(url, config);
		
		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			throw new ApiError(
				response.status,
				errorData.message || `HTTP error! status: ${response.status}`,
				errorData
			);
		}

		return await response.json();
	} catch (error) {
		if (error instanceof ApiError) {
			throw error;
		}
		throw new ApiError(0, "Network error", { originalError: error });
	}
}

// Server-side Post API functions (for prefetching)
export const serverPostApi = {
	// Get all posts with pagination
	getAllPosts: (page = 1, limit = 10): Promise<GetPostsResponse> =>
		serverApiRequest<GetPostsResponse>(`/posts?page=${page}&limit=${limit}`),

	// Get post by ID
	getPostById: (id: string): Promise<GetPostResponse> =>
		serverApiRequest<GetPostResponse>(`/posts/${id}`),

	// Get user posts with pagination
	getUserPosts: (userId: string, page = 1, limit = 10): Promise<GetUserPostsResponse> =>
		serverApiRequest<GetUserPostsResponse>(`/posts/user/${userId}?page=${page}&limit=${limit}`),
};

// Server-side User API functions (for prefetching)
export const serverUserApi = {
	// Get user by ID
	getUserById: (id: string): Promise<GetUserResponse> =>
		serverApiRequest<GetUserResponse>(`/users/${id}`),
}; 