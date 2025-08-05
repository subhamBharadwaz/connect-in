import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import type { Post } from "@/features/post/api/types";
import Link from "next/link";
import { formatDistanceToNowStrict } from "date-fns";

interface PostCardProps {
	post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
	const formatTimeAgo = (timestamp: string) => {
		const postTime = new Date(timestamp);
		const diff = formatDistanceToNowStrict(postTime, { addSuffix: true });
	
		return diff;
	};

	return (
		<Card className="w-full shadow-card hover:shadow-elegant transition-all duration-300">
			<CardContent className="p-4 sm:p-6">
				<div className="flex items-start space-x-3">
					<Link href={`/profile/${post.authorId}`}>
						<Avatar className="h-10 w-10 ring-2 ring-accent/50 hover:ring-primary/50 transition-all">
							<AvatarImage src={undefined} alt={post.author?.name || "User"} />
							<AvatarFallback className="bg-primary text-foreground">
								{post.author?.name
									?.split(" ")
									.map((n) => n[0])
									.join("") || post.authorId.slice(0, 2).toUpperCase()}
							</AvatarFallback>
						</Avatar>
					</Link>

					<div className="flex-1 min-w-0">
						<div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-1">
							<Link
								href={`/profile/${post.authorId}`}
								className="font-semibold text-foreground hover:text-primary transition-colors"
							>
								{post.author?.name || `User ${post.authorId.slice(0, 8)}`}
							</Link>
							<div className="flex items-center space-x-2 text-muted-foreground text-sm">
								<span className="hidden sm:inline">•</span>
								<span>{formatTimeAgo(post.createdAt)}</span>
							</div>
						</div>

						<p className="text-foreground leading-relaxed mb-4 text-sm sm:text-base">
							{post.content}
						</p>

						<div className="flex items-center gap-1 sm:gap-4 pt-2 border-t">
							<Button
								variant="ghost"
								size="sm"
								className="hover:text-red-500 transition-colors flex-1 sm:flex-none h-8 sm:h-9"
							>
								<Heart className="h-4 w-4 mr-1" />
								<span className="text-xs sm:text-sm">0</span>
							</Button>

							<Button
								variant="ghost"
								size="sm"
								className="hover:text-blue-500 transition-colors flex-1 sm:flex-none h-8 sm:h-9"
							>
								<MessageCircle className="h-4 w-4 mr-1" />
								<span className="text-xs sm:text-sm hidden sm:inline">Comment</span>
							</Button>

							<Button
								variant="ghost"
								size="sm"
								className="hover:text-green-500 transition-colors flex-1 sm:flex-none h-8 sm:h-9"
							>
								<Share2 className="h-4 w-4 mr-1" />
								<span className="text-xs sm:text-sm hidden sm:inline">Share</span>
							</Button>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default PostCard;
