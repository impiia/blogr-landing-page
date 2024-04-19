import { useEffect } from "react";

// Хук useOnClickOutside
export const useOnClickOutside = (ref, handler, isMobile) => {
    useEffect(() => {
      const listener = (event) => {

        if (isMobile) return;
        if (!ref.current || ref.current.contains(event.target)) {
          return;
        }
        handler(event);
      };
  
      document.addEventListener('mousedown', listener);
  
      return () => {
        document.removeEventListener('mousedown', listener);
      };
    }, [ref, handler, isMobile]); 
  };
  