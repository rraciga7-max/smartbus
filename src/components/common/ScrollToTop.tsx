import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Automatically resets the window scroll position to the top
 * whenever the route path changes, ensuring smooth and natural navigation.
 */
export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior
    });
  }, [pathname]);

  return null;
};
