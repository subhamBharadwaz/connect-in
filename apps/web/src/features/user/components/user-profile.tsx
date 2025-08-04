import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, MapPin, Calendar, Edit } from "lucide-react";
import { User } from "@/data/dummyData";

interface UserProfileProps {
	user: User;
	isCurrentUser?: boolean;
}

const UserProfile = ({ user, isCurrentUser = false }: UserProfileProps) => {
	return (
		<Card className="w-full shadow-elegant">
			<CardHeader className="relative pb-0">
				{/* Cover background */}
				<div className="absolute inset-0 h-24 bg-gradient-to-r from-primary to-primary/80 rounded-t-lg" />

				<div className="relative flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-4 pt-12">
					<Avatar className="h-24 w-24 border-4 border-background shadow-lg">
						<AvatarImage src={user.avatar} alt={user.name} />
						<AvatarFallback className="bg-primary text-primary-foreground text-2xl">
							{user.name
								.split(" ")
								.map((n) => n[0])
								.join("")}
						</AvatarFallback>
					</Avatar>

					<div className="flex-1 min-w-0">
						<div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
							<div>
								<h1 className="text-2xl font-bold text-foreground">
									{user.name}
								</h1>
								<p className="text-lg text-muted-foreground">{user.title}</p>
							</div>

							{isCurrentUser && (
								<Button variant="outline" size="sm" className="mt-2 sm:mt-0">
									<Edit className="h-4 w-4 mr-2" />
									Edit Profile
								</Button>
							)}
						</div>
					</div>
				</div>
			</CardHeader>

			<CardContent className="pt-6">
				<div className="space-y-6">
					{/* Bio */}
					<div>
						<h3 className="font-semibold text-foreground mb-2">About</h3>
						<p className="text-muted-foreground leading-relaxed">{user.bio}</p>
					</div>

					{/* Contact Info */}
					<div className="space-y-3">
						<h3 className="font-semibold text-foreground">
							Contact Information
						</h3>
						<div className="flex items-center space-x-2 text-muted-foreground">
							<Mail className="h-4 w-4" />
							<span>{user.email}</span>
						</div>
						<div className="flex items-center space-x-2 text-muted-foreground">
							<MapPin className="h-4 w-4" />
							<span>San Francisco, CA</span>
						</div>
						<div className="flex items-center space-x-2 text-muted-foreground">
							<Calendar className="h-4 w-4" />
							<span>Joined January 2023</span>
						</div>
					</div>

					{/* Skills */}
					<div>
						<h3 className="font-semibold text-foreground mb-3">Skills</h3>
						<div className="flex flex-wrap gap-2">
							{[
								"React",
								"TypeScript",
								"Node.js",
								"Product Management",
								"UX Design",
								"Data Analysis",
							].map((skill) => (
								<Badge
									key={skill}
									variant="secondary"
									className="hover:bg-accent transition-colors"
								>
									{skill}
								</Badge>
							))}
						</div>
					</div>

					{/* Stats */}
					<div className="grid grid-cols-3 gap-4 pt-4 border-t">
						<div className="text-center">
							<div className="text-2xl font-bold text-primary">127</div>
							<div className="text-sm text-muted-foreground">Connections</div>
						</div>
						<div className="text-center">
							<div className="text-2xl font-bold text-primary">45</div>
							<div className="text-sm text-muted-foreground">Posts</div>
						</div>
						<div className="text-center">
							<div className="text-2xl font-bold text-primary">892</div>
							<div className="text-sm text-muted-foreground">Views</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default UserProfile;
