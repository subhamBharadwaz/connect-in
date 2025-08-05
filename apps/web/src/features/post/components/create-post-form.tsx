"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Image, Video, FileText } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useCreatePost } from "../api/hooks";
import { createPostSchema, type CreatePostFormData } from "../schemas/post.schema";

interface CreatePostFormProps {
	onPostCreated?: () => void;
}

const CreatePostForm = ({ onPostCreated }: CreatePostFormProps) => {
	const [isFocused, setIsFocused] = useState(false);
	const { data: session, isPending } = authClient.useSession();
	const createPostMutation = useCreatePost();

	const form = useForm<CreatePostFormData>({
		resolver: zodResolver(createPostSchema),
		defaultValues: {
			content: "",
		},
	});

	const { register, handleSubmit, formState, reset, watch } = form;
	const { errors, isSubmitting } = formState;
	const content = watch("content");

	const onSubmit = async (data: CreatePostFormData) => {
		try {
			await createPostMutation.mutateAsync(data);
			reset();
			setIsFocused(false);
			onPostCreated?.();
		} catch (error) {
			// Error handling is done in the mutation hook
			console.error("Form submission error:", error);
		}
	};

	// Show loading state while checking authentication
	if (isPending) {
		return (
			<Card className="w-full shadow-card">
				<CardContent className="p-4 sm:p-6">
					<div className="flex items-center justify-center">
						<div className="text-muted-foreground">Loading...</div>
					</div>
				</CardContent>
			</Card>
		);
	}

	// Show message if user is not authenticated
	if (!session) {
		return (
			<Card className="w-full shadow-card">
				<CardContent className="p-4 sm:p-6">
					<div className="text-center text-muted-foreground">
						Please log in to create a post.
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="w-full shadow-card">
			<CardHeader className="pb-4 px-4 sm:px-6">
				<CardTitle className="text-base sm:text-lg">Share your thoughts</CardTitle>
			</CardHeader>
			<CardContent className="px-4 sm:px-6">
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div className="flex items-start space-x-3">
						<Avatar className="h-10 w-10">
							<AvatarImage src={session?.user?.image || undefined} alt={session?.user?.name || "User"} />
							<AvatarFallback className="bg-primary text-foreground">
								{session?.user?.name
									?.split(" ")
									.map((n) => n[0])
									.join("") || "U"}
							</AvatarFallback>
						</Avatar>

						<div className="flex-1">
							<div
								className={`
                  relative min-h-[100px] p-3 sm:p-4 rounded-lg border-2 transition-all duration-300
                  ${
										isFocused
											? "border-primary bg-accent/20 shadow-elegant"
											: "border-border bg-card hover:border-muted-foreground/30"
									}
                  ${errors.content ? "border-destructive" : ""}
                `}
							>
								<textarea
									{...register("content")}
									onFocus={() => setIsFocused(true)}
									onBlur={() => setIsFocused(false)}
									placeholder="What's on your mind? Share your professional insights..."
									className="w-full h-full min-h-[60px] bg-transparent border-none outline-none resize-none placeholder:text-muted-foreground text-foreground text-sm sm:text-base"
									rows={3}
								/>

								{content && content.length > 0 && (
									<div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
										{content.length}/500 characters
									</div>
								)}
							</div>

							{errors.content && (
								<p className="text-sm text-destructive mt-1">
									{errors.content.message}
								</p>
							)}

							<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 space-y-3 sm:space-y-0">
								<div className="flex flex-wrap items-center gap-1 sm:gap-2">
									<Button
										type="button"
										variant="ghost"
										size="sm"
										className="text-muted-foreground hover:text-primary h-8 sm:h-9"
									>
										<Image className="h-4 w-4 mr-1" />
										<span className="text-xs sm:text-sm hidden sm:inline">Photo</span>
									</Button>
									<Button
										type="button"
										variant="ghost"
										size="sm"
										className="text-muted-foreground hover:text-primary h-8 sm:h-9"
									>
										<Video className="h-4 w-4 mr-1" />
										<span className="text-xs sm:text-sm hidden sm:inline">Video</span>
									</Button>
									<Button
										type="button"
										variant="ghost"
										size="sm"
										className="text-muted-foreground hover:text-primary h-8 sm:h-9"
									>
										<FileText className="h-4 w-4 mr-1" />
										<span className="text-xs sm:text-sm hidden sm:inline">Document</span>
									</Button>
								</div>

								<Button
									type="submit"
									disabled={!content?.trim() || isSubmitting || createPostMutation.isPending}
									className="w-full sm:w-auto text-foreground h-9 sm:h-10"
								>
									<Send className="h-4 w-4 mr-2 text-foreground" />
									{createPostMutation.isPending ? "Posting..." : "Post"}
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
