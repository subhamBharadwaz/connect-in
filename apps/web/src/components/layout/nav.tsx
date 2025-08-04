import Link from "next/link";
import { Button } from "../ui/button";
import { Home, PlusSquare } from "lucide-react";
import { ModeToggle } from "../mode-toggle";
import UserMenu from "../user-menu";



export const Nav = () => {
	return (
		<>
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
					<Link href="/post/create" className="flex items-center space-x-2">
						<PlusSquare className="h-4 w-4" />
						<span className="hidden sm:inline">Create</span>
					</Link>
				</Button>

				<div className="flex items-center gap-2">
          <ModeToggle />
          <UserMenu />
        </div>
			</nav>
		</>
	);
};
