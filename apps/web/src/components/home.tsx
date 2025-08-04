"use client";

import {useCallback, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import CreatePostForm from "@/features/post/components/create-post-form";
import PostCard from "@/features/post/components/post-card";
import { useGetAllPostsInfinite } from "@/features/post/api/hooks";
import type { Post } from "@/features/post/api/types";

const Home = () => {
	const { ref, inView } = useInView();
	const {
		data,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading,
		isError,
		error,
	} = useGetAllPostsInfinite();

	// Load more posts when the last post comes into view
	const loadMore = useCallback(() => {
		if (inView && hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	// Trigger loadMore when inView changes
	useEffect(() => {
		loadMore();
	}, [loadMore]);

	// Flatten all posts from all pages
	const allPosts = data?.pages.flatMap((page) => {
		const posts = page?.posts || page?.data?.posts || [];
		return posts;
	}) || [];

	if (isLoading) {
		return (
			<div className="space-y-4 sm:space-y-6">
				<CreatePostForm />
				<div className="flex items-center justify-center py-8">
					<Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="space-y-4 sm:space-y-6">
				<CreatePostForm />
				<div className="text-center py-8">
					<p className="text-destructive">
						Error loading posts: {error?.message || "Something went wrong"}
					</p>
					<Button
						variant="outline"
						onClick={() => window.location.reload()}
						className="mt-4"
					>
						Try Again
					</Button>
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-4 sm:space-y-6">
			<CreatePostForm />

			<div className="space-y-4">
				<h2 className="text-lg sm:text-xl font-semibold text-foreground">
					Recent Posts
				</h2>

				{allPosts.length === 0 ? (
					<div className="text-center py-8">
						<p className="text-muted-foreground">No posts yet. Be the first to share!</p>
					</div>
				) : (
					<div className="space-y-4">
						{allPosts.map((post: Post) => (
							<PostCard key={post.id} post={post} />
						))}

						{/* Intersection observer target for infinite loading */}
						<div ref={ref} className="flex justify-center py-4">
							{isFetchingNextPage && (
								<Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
							)}
						</div>

						{/* Load more button as fallback */}
						{hasNextPage && !isFetchingNextPage && (
							<div className="flex justify-center">
								<Button
									variant="outline"
									onClick={() => fetchNextPage()}
									className="mt-4"
								>
									Load More Posts
								</Button>
							</div>
						)}

						{!hasNextPage && allPosts.length > 0 && (
							<div className="text-center py-4">
								<p className="text-muted-foreground text-sm">
									You've reached the end of all posts.
								</p>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default Home; 