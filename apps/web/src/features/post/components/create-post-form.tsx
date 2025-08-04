"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Image, Video, FileText } from "lucide-react";
import { dummyUsers } from "@/data/dummyData";
import { useToast } from "@/hooks/use-toast";

interface CreatePostFormProps {
	onPostCreated?: () => void;
}

const CreatePostForm = ({ onPostCreated }: CreatePostFormProps) => {
	const [content, setContent] = useState("");
	const [isFocused, setIsFocused] = useState(false);
	const currentUser = dummyUsers[0];
	const { toast } = useToast();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!content.trim()) return;

		// Simulate post creation
		toast({
			title: "Post created!",
			description: "Your post has been shared with your network.",
		});

		setContent("");
		setIsFocused(false);
		onPostCreated?.();
	};

	return (
		<Card className="w-full shadow-card">
			<CardHeader className="pb-4">
				<CardTitle className="text-lg">Share your thoughts</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="flex items-start space-x-3">
						<Avatar className="h-10 w-10">
							<AvatarImage src={currentUser.avatar} alt={currentUser.name} />
							<AvatarFallback className="bg-primary text-primary-foreground">
								{currentUser.name
									.split(" ")
									.map((n) => n[0])
									.join("")}
							</AvatarFallback>
						</Avatar>

						<div className="flex-1">
							<div
								className={`
                  relative min-h-[100px] p-4 rounded-lg border-2 transition-all duration-300
                  ${
										isFocused
											? "border-primary bg-accent/20 shadow-elegant"
											: "border-border bg-card hover:border-muted-foreground/30"
									}
                `}
							>
								<textarea
									value={content}
									onChange={(e) => setContent(e.target.value)}
									onFocus={() => setIsFocused(true)}
									onBlur={() => setIsFocused(false)}
									placeholder="What's on your mind? Share your professional insights..."
									className="w-full h-full min-h-[60px] bg-transparent border-none outline-none resize-none placeholder:text-muted-foreground text-foreground"
									rows={3}
								/>

								{content.length > 0 && (
									<div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
										{content.length} characters
									</div>
								)}
							</div>

							<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 space-y-3 sm:space-y-0">
								<div className="flex flex-wrap items-center gap-2">
									<Button
										type="button"
										variant="ghost"
										size="sm"
										className="text-muted-foreground hover:text-primary"
									>
										<Image className="h-4 w-4 mr-1" />
										<span className="hidden xs:inline">Photo</span>
									</Button>
									<Button
										type="button"
										variant="ghost"
										size="sm"
										className="text-muted-foreground hover:text-primary"
									>
										<Video className="h-4 w-4 mr-1" />
										<span className="hidden xs:inline">Video</span>
									</Button>
									<Button
										type="button"
										variant="ghost"
										size="sm"
										className="text-muted-foreground hover:text-primary"
									>
										<FileText className="h-4 w-4 mr-1" />
										<span className="hidden xs:inline">Document</span>
									</Button>
								</div>

								<Button
									type="submit"
									disabled={!content.trim()}
									className="w-full sm:w-auto"
								>
									<Send className="h-4 w-4 mr-2" />
									Post
								</Button>
							</div>
						</div>
					</div>
				</form>
			</CardContent>
		</Card>
	);
};

export default CreatePostForm;
