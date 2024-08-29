import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useArrowKeyNavigation = (nextPagePath, previousPagePath) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        navigate(nextPagePath); // Navigate to the next page
      } else if (event.key === 'ArrowLeft') {
        if (previousPagePath !== -1) {
          navigate(previousPagePath); // Navigate to the previous page
        }
      }
    };

    // Attach event listener
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate, nextPagePath, previousPagePath]);
};

export default useArrowKeyNavigation;
