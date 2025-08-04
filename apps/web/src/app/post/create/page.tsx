import Header from "@/components/layout/Header";
import CreatePostForm from "@/components/posts/CreatePostForm";

const CreatePost = () => {
	const handlePostCreated = () => {
		// Navigate back to home after creating post
		setTimeout(() => {
			// navigate("/");
		}, 1500);
	};

	return (
		<div className="min-h-screen bg-background">
			<Header />

			<main className="container mx-auto px-4 py-4 sm:py-8 max-w-2xl">
				<div className="space-y-4 sm:space-y-6">
					<div>
						<h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
							Create a Post
						</h1>
						<p className="text-sm sm:text-base text-muted-foreground">
							Share your thoughts with your professional network
						</p>
					</div>

					<CreatePostForm onPostCreated={handlePostCreated} />
				</div>
			</main>
		</div>
	);
};

export default CreatePost;
