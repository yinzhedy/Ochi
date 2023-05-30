import { useEffect } from 'react';

export default function useKeyPress(fn) {
  useEffect(() => {
    // Add event listener for keydown event
    window.addEventListener('keydown', fn);
    
    // Cleanup function to remove the event listener when the component unmounts or when the dependency array changes
    return () => {
      window.removeEventListener('keydown', fn);
    };
  }, [fn]);
}
