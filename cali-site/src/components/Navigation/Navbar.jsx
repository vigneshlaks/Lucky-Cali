import AnimatedTabs from './Navigation';
import ShinyButton from '../auth/SignIn';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-4 py-4">  {/* Background is black */}
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center justify-center flex-grow"> {/* Center tabs horizontally */}
          <AnimatedTabs></AnimatedTabs>
        </div>
        <div className="flex items-center space-x-6"> {/* Increased spacing */}
          <ShinyButton />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
