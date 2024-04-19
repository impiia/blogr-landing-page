import { useState, useEffect } from 'react';

export const useMediaQuery = (query) => {
  const getMatches = (query) => window.matchMedia(query).matches;
  const [matches, setMatches] = useState(getMatches(query));

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = (event) => setMatches(event.matches);
    media.addEventListener('change', listener);
    return () => {
      media.removeEventListener('change', listener);
    };
  }, [query]);

  return matches;
};

