import { Suspense } from "react";
import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";
import {
	serverPostApi,
	serverUserApi,
} from "@/features/post/api/server-client";
import UserProfile from "@/features/user/components/user-profile";

export default async function ProfilePage({
	params,
}: {
	params: Promise<{ authorId: string }>;
}) {
	const { authorId } = await params;
	const queryClient = new QueryClient();

	try {
		// Prefetch user data
		await queryClient.prefetchQuery({
			queryKey: ["users", "detail", authorId],
			queryFn: () => serverUserApi.getUserById(authorId),
		});

		// Prefetch user posts data
		await queryClient.prefetchInfiniteQuery({
			queryKey: ["posts", "user", authorId, "infinite"],
			queryFn: ({ pageParam = 1 }: { pageParam: number }) =>
				serverPostApi.getUserPosts(authorId, pageParam, 10),
			getNextPageParam: (lastPage: any, allPages: any[]) => {
				const posts = lastPage?.posts || lastPage?.data?.posts || [];
				return posts.length === 10 ? allPages.length + 1 : undefined;
			},
			initialPageParam: 1,
		});

		return (
			<HydrationBoundary state={dehydrate(queryClient)}>
				<div className="min-h-screen bg-background">
					<main className="container mx-auto px-4 py-4 sm:py-6 lg:py-8 max-w-4xl">
						<Suspense fallback={<div>Loading profile...</div>}>
							<UserProfile authorId={authorId} />
						</Suspense>
					</main>
				</div>
			</HydrationBoundary>
		);
	} catch (error) {
		// If user not found, return 404
		console.error("Profile page error:", error);
		notFound();
	}
}
