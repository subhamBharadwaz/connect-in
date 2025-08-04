import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { Post } from "@/data/dummyData";
import Link from "next/link";

interface PostCardProps {
	post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
	const formatTimeAgo = (timestamp: string) => {
		const now = new Date();
		const postTime = new Date(timestamp);
		const diffInMs = now.getTime() - postTime.getTime();
		const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
		const diffInDays = Math.floor(diffInHours / 24);

		if (diffInDays > 0) {
			return `${diffInDays}d ago`;
		} else if (diffInHours > 0) {
			return `${diffInHours}h ago`;
		} else {
			return "Just now";
		}
	};

	return (
		<Card className="w-full shadow-card hover:shadow-elegant transition-all duration-300">
			<CardContent className="p-6">
				<div className="flex items-start space-x-3">
					<Link href={`/profile/${post.author.id}`}>
						<Avatar className="h-10 w-10 ring-2 ring-accent/50 hover:ring-primary/50 transition-all">
							<AvatarImage src={post.author.avatar} alt={post.author.name} />
							<AvatarFallback className="bg-primary text-primary-foreground">
								{post.author.name
									.split(" ")
									.map((n) => n[0])
									.join("")}
							</AvatarFallback>
						</Avatar>
					</Link>

					<div className="flex-1 min-w-0">
						<div className="flex items-center space-x-2 mb-1">
							<Link
								href={`/profile/${post.author.id}`}
								className="font-semibold text-foreground hover:text-primary transition-colors"
							>
								{post.author.name}
							</Link>
							<span className="text-muted-foreground text-sm">•</span>
							<span className="text-muted-foreground text-sm">
								{formatTimeAgo(post.timestamp)}
							</span>
						</div>

						<p className="text-sm text-muted-foreground mb-3">
							{post.author.title}
						</p>

						<p className="text-foreground leading-relaxed mb-4">
							{post.content}
						</p>

						<div className="flex flex-wrap items-center gap-2 sm:gap-4 pt-2 border-t">
							<Button
								variant="ghost"
								size="sm"
								className="hover:text-red-500 transition-colors flex-1 sm:flex-none"
							>
								<Heart className="h-4 w-4 mr-1" />
								<span className="text-sm">{post.likes}</span>
							</Button>

							<Button
								variant="ghost"
								size="sm"
								className="hover:text-blue-500 transition-colors flex-1 sm:flex-none"
							>
								<MessageCircle className="h-4 w-4 mr-1" />
								<span className="text-sm hidden xs:inline">Comment</span>
							</Button>

							<Button
								variant="ghost"
								size="sm"
								className="hover:text-green-500 transition-colors flex-1 sm:flex-none"
							>
								<Share2 className="h-4 w-4 mr-1" />
								<span className="text-sm hidden xs:inline">Share</span>
							</Button>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default PostCard;
