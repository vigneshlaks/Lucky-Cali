import AnimatedTabs from './MiddleNavigation';
import ShinyButton from './ShinyButton';
import EndNavigation from './EndNavigation';

const Navbar = () => {
  return (
    <div className="bg-black text-white px-4 py-2"> 
      <div className="container mx-auto grid grid-cols-3 items-center">
      <div className="flex justify-start">
        <img src="/src/assets//logo.svg" alt="Logo" width='125' />
        </div>
        <div className="flex justify-center"> 
          <AnimatedTabs />
        </div>
        <div className="flex justify-end">
          <EndNavigation />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
