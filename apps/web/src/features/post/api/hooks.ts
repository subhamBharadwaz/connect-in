import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { postApi, userApi } from "./client";
import type { CreatePostRequest, UpdatePostRequest } from "./types";

// Query keys
export const postKeys = {
	all: ["posts"] as const,
	lists: () => [...postKeys.all, "list"] as const,
	list: (filters: string) => [...postKeys.lists(), { filters }] as const,
	details: () => [...postKeys.all, "detail"] as const,
	detail: (id: string) => [...postKeys.details(), id] as const,
	user: (userId: string) => [...postKeys.all, "user", userId] as const,
};

export const userKeys = {
	all: ["users"] as const,
	details: () => [...userKeys.all, "detail"] as const,
	detail: (id: string) => [...userKeys.details(), id] as const,
};

// Get all posts
export const useGetAllPosts = () => {
	return useQuery({
		queryKey: postKeys.lists(),
		queryFn: () => postApi.getAllPosts(),
		staleTime: 1000 * 60 * 5, // 5 minutes
	});
};

// Get all posts with infinite query
export const useGetAllPostsInfinite = () => {
	return useInfiniteQuery({
		queryKey: [...postKeys.lists(), "infinite"],
		queryFn: ({ pageParam = 1 }) => postApi.getAllPosts(pageParam, 10),
		getNextPageParam: (lastPage, allPages) => {
			// If we have less than 10 posts, we've reached the end
			const posts = lastPage?.posts || lastPage?.data?.posts || [];
			return posts.length === 10 ? allPages.length + 1 : undefined;
		},
		initialPageParam: 1,
		staleTime: 1000 * 60 * 5, // 5 minutes
	});
};

// Get post by ID
export const useGetPostById = (id: string) => {
	return useQuery({
		queryKey: postKeys.detail(id),
		queryFn: () => postApi.getPostById(id),
		enabled: !!id,
		staleTime: 1000 * 60 * 5, // 5 minutes
	});
};

// Get user posts
export const useGetUserPosts = (userId: string) => {
	return useQuery({
		queryKey: postKeys.user(userId),
		queryFn: () => postApi.getUserPosts(userId),
		enabled: !!userId,
		staleTime: 1000 * 60 * 5, // 5 minutes
	});
};

// Get user posts with infinite query
export const useGetUserPostsInfinite = (userId: string) => {
	return useInfiniteQuery({
		queryKey: [...postKeys.user(userId), "infinite"],
		queryFn: ({ pageParam = 1 }) => postApi.getUserPosts(userId, pageParam, 10),
		getNextPageParam: (lastPage, allPages) => {
			const posts = lastPage?.posts || lastPage?.data?.posts || [];
			return posts.length === 10 ? allPages.length + 1 : undefined;
		},
		initialPageParam: 1,
		enabled: !!userId,
		staleTime: 1000 * 60 * 5, // 5 minutes
	});
};

// Get user by ID
export const useGetUserById = (id: string) => {
	return useQuery({
		queryKey: userKeys.detail(id),
		queryFn: () => userApi.getUserById(id),
		enabled: !!id,
		staleTime: 1000 * 60 * 5, // 5 minutes
	});
};

// Create post mutation
export const useCreatePost = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: CreatePostRequest) => postApi.createPost(data),
		onSuccess: (data) => {
			// Invalidate and refetch posts lists
			queryClient.invalidateQueries({ queryKey: postKeys.lists() });
			
			// Add the new post to the cache if it exists
			// Handle different possible response structures
			const post = data?.post || data?.data?.post;
			if (post?.id) {
				queryClient.setQueryData(
					postKeys.detail(post.id),
					{ success: true, post }
				);
			}

			toast.success("Post created successfully!", {
				description: "Your post has been shared with your network.",
			});
		},
		onError: (error: any) => {
			console.error("Create post error:", error);
			toast.error("Failed to create post", {
				description: error.message || "Something went wrong. Please try again.",
			});
		},
	});
};

// Update post mutation
export const useUpdatePost = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, data }: { id: string; data: UpdatePostRequest }) =>
			postApi.updatePost(id, data),
		onSuccess: (data, variables) => {
			// Update the specific post in cache
			const post = data?.post || data?.data?.post;
			if (post) {
				queryClient.setQueryData(
					postKeys.detail(variables.id),
					{ success: true, post }
				);
			}

			// Invalidate lists to reflect changes
			queryClient.invalidateQueries({ queryKey: postKeys.lists() });

			toast.success("Post updated successfully!");
		},
		onError: (error: any) => {
			console.error("Update post error:", error);
			toast.error("Failed to update post", {
				description: error.message || "Something went wrong. Please try again.",
			});
		},
	});
};

// Delete post mutation
export const useDeletePost = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => postApi.deletePost(id),
		onSuccess: (data, deletedId) => {
			// Remove the post from cache
			queryClient.removeQueries({ queryKey: postKeys.detail(deletedId) });

			// Invalidate lists to reflect changes
			queryClient.invalidateQueries({ queryKey: postKeys.lists() });

			toast.success("Post deleted successfully!");
		},
		onError: (error: any) => {
			console.error("Delete post error:", error);
			toast.error("Failed to delete post", {
				description: error.message || "Something went wrong. Please try again.",
			});
		},
	});
}; 