"use client";

import { useCallback, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Mail, Calendar, Edit } from "lucide-react";
import PostCard from "@/features/post/components/post-card";
import { useGetUserPostsInfinite, useGetUserById } from "@/features/post/api/hooks";
import type { PostWithAuthor } from "@/features/post/api/types";

interface UserProfileProps {
	authorId: string;
}

const UserProfile = ({ authorId }: UserProfileProps) => {
	const { ref, inView } = useInView();
	
	// Get user information
	const {
		data: userData,
		isLoading: isUserLoading,
		isError: isUserError,
		error: userError,
	} = useGetUserById(authorId);

	// Get user posts
	const {
		data: postsData,
		fetchNextPage,
		hasNextPage,
		isFetchingNextPage,
		isLoading: isPostsLoading,
		isError: isPostsError,
		error: postsError,
	} = useGetUserPostsInfinite(authorId);

	
	const loadMore = useCallback(() => {
		if (inView && hasNextPage && !isFetchingNextPage) {
			fetchNextPage();
		}
	}, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

	
	useEffect(() => {
		loadMore();
	}, [loadMore]);

	
	const allPosts = postsData?.pages.flatMap((page) => {
		const posts = page?.posts || page?.data?.posts || [];
		return posts;
	}) || [];


	const userInfo = userData?.user || userData?.data?.user;

	if (isUserLoading || isPostsLoading) {
		return (
			<div className="space-y-6">
				<div className="flex items-center justify-center py-8">
					<Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
				</div>
			</div>
		);
	}

	if (isUserError) {
		return (
			<div className="space-y-6">
				<div className="text-center py-8">
					<p className="text-destructive">
						Error loading user: {userError?.message || "User not found"}
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
			{/* User Profile Card */}
			<Card className="w-full shadow-elegant">
				<CardHeader className="relative pb-0 px-4 sm:px-6">
					{/* Cover background */}
					<div className="absolute inset-0 h-20 sm:h-24 bg-gradient-to-r from-blue-400 to-cyan-400/80 rounded-t-lg" />

					<div className="relative flex flex-col sm:flex-row items-start sm:items-end space-y-3 sm:space-y-0 sm:space-x-4 pt-10 sm:pt-12">
						<Avatar className="h-20 w-20 sm:h-24 sm:w-24 border-4 border-background shadow-lg">
							<AvatarImage src={userInfo?.image || undefined} alt={userInfo?.name || "User"} />
							<AvatarFallback className="bg-primary text-foreground text-xl sm:text-2xl">
								{userInfo?.name
									?.split(" ")
									.map((n) => n[0])
									.join("") || authorId.slice(0, 2).toUpperCase()}
							</AvatarFallback>
						</Avatar>

						<div className="flex-1 min-w-0">
							<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
								<div>
									<h1 className="text-xl sm:text-2xl font-bold text-foreground">
										{userInfo?.name || `User ${authorId.slice(0, 8)}`}
									</h1>
									<p className="text-base sm:text-lg text-muted-foreground">
										{userInfo?.email || "No email available"}
									</p>
								</div>
							</div>
						</div>
					</div>
				</CardHeader>

				<CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
					<div className="space-y-4 sm:space-y-6">
						{/* Contact Info */}
						<div className="space-y-3">
							<h3 className="font-semibold text-foreground text-base sm:text-lg">
								Contact Information
							</h3>
							<div className="flex items-center space-x-2 text-muted-foreground text-sm sm:text-base">
								<Mail className="h-4 w-4" />
								<span>{userInfo?.email || "No email available"}</span>
							</div>
							{userInfo?.bio && userInfo.bio.trim() !== "" ? (
								<div className="flex items-start space-x-2 text-muted-foreground">
									<Edit className="h-4 w-4 mt-0.5" />
									<span className="text-sm leading-relaxed">{userInfo.bio}</span>
								</div>
							) : (
								<div className="flex items-center space-x-2 text-muted-foreground">
									<Edit className="h-4 w-4" />
									<span className="text-sm sm:text-base">No bio available</span>
								</div>
							)}
							<div className="flex items-center space-x-2 text-muted-foreground text-sm sm:text-base">
								<Calendar className="h-4 w-4" />
								<span>
									Member since {userInfo?.createdAt 
										? new Date(userInfo.createdAt).getFullYear()
										: "2024"
									}
								</span>
							</div>
						</div>

						{/* Stats */}
						<div className="grid grid-cols-3 gap-2 sm:gap-4 pt-4 border-t">
							<div className="text-center">
								<div className="text-xl sm:text-2xl font-bold text-primary">0</div>
								<div className="text-xs sm:text-sm text-muted-foreground">Connections</div>
							</div>
							<div className="text-center">
								<div className="text-xl sm:text-2xl font-bold text-primary">{allPosts.length}</div>
								<div className="text-xs sm:text-sm text-muted-foreground">Posts</div>
							</div>
							<div className="text-center">
								<div className="text-xl sm:text-2xl font-bold text-primary">0</div>
								<div className="text-xs sm:text-sm text-muted-foreground">Views</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* User Posts */}
			<div className="space-y-4">
				<h2 className="text-lg sm:text-xl font-semibold text-foreground">
					Posts by {userInfo?.name || `User ${authorId.slice(0, 8)}`}
				</h2>

				{allPosts.length === 0 ? (
					<div className="text-center py-8">
						<p className="text-muted-foreground">No posts yet.</p>
					</div>
				) : (
					<div className="space-y-4">
						{allPosts.map((post: PostWithAuthor) => (
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

export default UserProfile; 