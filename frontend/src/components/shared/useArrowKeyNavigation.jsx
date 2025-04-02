import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useArrowKeyNavigation = (nextPagePath, previousPagePath) => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight') {
        navigate(nextPagePath); 
      } else if (event.key === 'ArrowLeft') {
        if (previousPagePath !== -1) {
          navigate(previousPagePath); 
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate, nextPagePath, previousPagePath]);
};

export default useArrowKeyNavigation;
