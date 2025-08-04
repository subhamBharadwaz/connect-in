import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Home, PlusSquare, User } from "lucide-react";
import { dummyUsers } from "@/data/dummyData";
import Link from "next/link";

const Header = () => {
	const currentUser = dummyUsers[0]; // Using first user as current user

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-sm">
			<div className="container mx-auto px-4 h-16 flex items-center justify-between">
				<Link href="/" className="flex items-center space-x-2">
					<div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
						<span className="text-primary-foreground font-bold text-lg">C</span>
					</div>
					<span className="text-xl font-bold text-primary">connectIn</span>
				</Link>

				<nav className="flex items-center space-x-2">
					<Button variant="ghost" size="sm" asChild>
						<Link href="/" className="flex items-center space-x-2">
							<Home className="h-4 w-4" />
							<span className="hidden sm:inline">Home</span>
						</Link>
					</Button>

					<Button variant="ghost" size="sm" asChild>
						<Link href="/create" className="flex items-center space-x-2">
							<PlusSquare className="h-4 w-4" />
							<span className="hidden sm:inline">Create</span>
						</Link>
					</Button>

					<Button variant="ghost" size="sm" asChild>
						<Link
							href={`/profile/${currentUser.id}`}
							className="flex items-center space-x-2"
						>
							<User className="h-4 w-4" />
							<span className="hidden sm:inline">Profile</span>
						</Link>
					</Button>

					<Link href={`/profile/${currentUser.id}`}>
						<Avatar className="h-8 w-8">
							<AvatarImage src={currentUser.avatar} alt={currentUser.name} />
							<AvatarFallback>
								{currentUser.name
									.split(" ")
									.map((n) => n[0])
									.join("")}
							</AvatarFallback>
						</Avatar>
					</Link>
				</nav>
			</div>
		</header>
	);
};

export default Header;
