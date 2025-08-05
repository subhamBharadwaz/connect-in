"use client";
import Link from "next/link";
import { Button } from "../ui/button";
import { Home, PlusSquare, User, Menu, X } from "lucide-react";
import { ModeToggle } from "../mode-toggle";
import UserMenu from "../user-menu";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const Nav = () => {
	const { data } = authClient.useSession();
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const closeMobileMenu = () => {
		setIsMobileMenuOpen(false);
	};

	return (
		<>
			{/* Logo - Left side */}
			<Link
				href="/"
				className="flex items-center space-x-2"
				onClick={closeMobileMenu}
			>
				<div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
					<span className="text-primary-foreground font-bold text-lg">C</span>
				</div>
				<span className="text-xl font-bold text-primary">connectIn</span>
			</Link>

			{/* Desktop Navigation - Right side */}
			<nav className="hidden md:flex items-center space-x-2">
				<Button variant="ghost" size="sm" asChild>
					<Link href="/" className="flex items-center space-x-2">
						<Home className="h-4 w-4" />
						<span>Home</span>
					</Link>
				</Button>
				<Button variant="ghost" size="sm" asChild>
					<Link href="/post/create" className="flex items-center space-x-2">
						<PlusSquare className="h-4 w-4" />
						<span>Create</span>
					</Link>
				</Button>
				{data?.session && (
					<Button variant="ghost" size="sm" asChild>
						<Link
							href={`/profile/${data.user.id ?? data.user.email ?? ""}`}
							className="flex items-center space-x-2"
						>
							<User className="h-4 w-4" />
							<span>Profile</span>
						</Link>
					</Button>
				)}
				<div className="flex items-center gap-2">
					<ModeToggle />
					<UserMenu />
				</div>
			</nav>

			{/* Mobile Menu Button - Right side */}
			<div className="md:hidden">
				<Button
					variant="ghost"
					size="sm"
					onClick={toggleMobileMenu}
					className="p-2 cursor-pointer"
					aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
				>
					{isMobileMenuOpen ? (
						<X className="h-5 w-5" />
					) : (
						<Menu className="h-5 w-5" />
					)}
				</Button>
			</div>

			{/* Mobile Menu Overlay */}
			{isMobileMenuOpen && (
				<button
					type="button"
					className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden cursor-pointer"
					onClick={closeMobileMenu}
					onKeyDown={(e) => {
						if (e.key === 'Escape') {
							closeMobileMenu();
						}
					}}
					aria-label="Close menu"
				/>
			)}

			{/* Mobile Menu */}
			<nav
				className={cn(
					"fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-md border-b shadow-lg z-50",
					"transform transition-all duration-300 ease-in-out md:hidden",
					isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
	)}
			>
				<div className="flex flex-col p-6 space-y-1">
					{/* Header with close button */}
					<div className="flex items-center justify-between mb-6">
						<div className="flex items-center space-x-2">
							<div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
								<span className="text-primary-foreground font-bold text-sm">
									C
								</span>
							</div>
							<span className="text-lg font-bold text-primary">connectIn</span>
						</div>
						<Button
							variant="ghost"
							size="sm"
							onClick={closeMobileMenu}
							className="h-8 w-8 p-0"
							aria-label="Close menu"
						>
							<X className="h-4 w-4" />
						</Button>
					</div>

					{/* Menu Items */}
					<div className="space-y-2">
						<Button
							variant="ghost"
							size="lg"
							asChild
							className="w-full justify-start h-12 text-base font-medium"
						>
							<Link
								href="/"
								className="flex items-center space-x-4"
								onClick={closeMobileMenu}
							>
								<Home className="h-5 w-5" />
								<span>Home</span>
							</Link>
						</Button>

						<Button
							variant="ghost"
							size="lg"
							asChild
							className="w-full justify-start h-12 text-base font-medium"
						>
							<Link
								href="/post/create"
								className="flex items-center space-x-4"
								onClick={closeMobileMenu}
							>
								<PlusSquare className="h-5 w-5" />
								<span>Create Post</span>
							</Link>
						</Button>

						{data?.session && (
							<Button
								variant="ghost"
								size="lg"
								asChild
								className="w-full justify-start h-12 text-base font-medium"
							>
								<Link
									href={`/profile/${data.user.id ?? data.user.email ?? ""}`}
									className="flex items-center space-x-4"
									onClick={closeMobileMenu}
								>
									<User className="h-5 w-5" />
									<span>My Profile</span>
								</Link>
							</Button>
						)}
					</div>

					{/* User Controls */}
					<div className="mt-6 pt-6 border-t border-border/50">
						<div className="flex items-center justify-between mb-4">
							<span className="text-sm font-medium text-muted-foreground">Settings</span>
							<ModeToggle />
						</div>
						<UserMenu />
					</div>

					{/* User info section if logged in */}
					{data?.session && (
						<div className="mt-4 pt-4 border-t border-border/50">
							<div className="flex items-center space-x-3 text-sm text-muted-foreground">
								<div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
									<User className="h-4 w-4" />
								</div>
								<div className="flex-1 min-w-0">
									<p className="font-medium text-foreground truncate">
										{data.user.name || data.user.email}
									</p>
									<p className="text-xs truncate">{data.user.email}</p>
								</div>
							</div>
						</div>
					)}
				</div>
			</nav>
		</>
	);
};
