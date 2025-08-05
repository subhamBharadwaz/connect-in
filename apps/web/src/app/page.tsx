import { Suspense } from "react";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { serverPostApi } from "@/features/post/api/server-client";
import Home from "@/components/home";

export default async function HomePage() {
	const queryClient = new QueryClient();

	// Prefetch initial posts data
	await queryClient.prefetchInfiniteQuery({
		queryKey: ["posts", "list", "infinite"],
		queryFn: ({ pageParam = 1 }: { pageParam: number }) => serverPostApi.getAllPosts(pageParam, 10),
		getNextPageParam: (lastPage: any, allPages: any[]) => {
			const posts = lastPage?.posts || lastPage?.data?.posts || [];
			return posts.length === 10 ? allPages.length + 1 : undefined;
		},
		initialPageParam: 1,
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<div className="min-h-screen bg-background">
				<main className="container mx-auto px-4 py-4 sm:py-6 lg:py-8 max-w-2xl">
					<Suspense fallback={<div>Loading...</div>}>
						<Home />
					</Suspense>
				</main>
			</div>
		</HydrationBoundary>
	);
}
