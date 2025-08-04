
import { Nav } from "./nav";

const Header = () => {
	

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-sm">
			<div className="container mx-auto px-4 h-16 flex items-center justify-between">
				<Nav/>
			</div>
		</header>
	);
};

export default Header;
