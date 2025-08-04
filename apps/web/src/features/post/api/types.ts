export interface Post {
	id: string;
	content: string;
	authorId: string;
	createdAt: string;
	author?: {
		id: string;
		name: string;
		email: string;
	};
}

export interface PostWithAuthor extends Post {
	author: {
		id: string;
		name: string;
		email: string;
	};
}

export interface CreatePostRequest {
	content: string;
}

export interface CreatePostResponse {
	success: boolean;
	post: Post;
	data?: {
		post: Post;
	};
}

export interface GetPostsResponse {
	success: boolean;
	posts: Post[];
	data?: {
		posts: Post[];
	};
}

export interface GetUserPostsResponse {
	success: boolean;
	posts: PostWithAuthor[];
	count: number;
	userId: string;
	data?: {
		posts: PostWithAuthor[];
		count: number;
		userId: string;
	};
}

export interface GetPostResponse {
	success: boolean;
	post: Post;
	data?: {
		post: Post;
	};
}

export interface UpdatePostRequest {
	content: string;
}

export interface UpdatePostResponse {
	success: boolean;
	post: Post;
	data?: {
		post: Post;
	};
}

export interface DeletePostResponse {
	success: boolean;
	message: string;
}

export interface ApiError {
	success: false;
	message: string;
}

// User types
export interface User {
	id: string;
	name: string;
	email: string;
	image?: string | null;
	bio?: string | null;
	createdAt: string;
	updatedAt: string;
}

export interface GetUserResponse {
	success: boolean;
	user: User;
	data?: {
		user: User;
	};
} 