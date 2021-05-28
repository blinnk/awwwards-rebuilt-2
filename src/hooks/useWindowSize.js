import { useState, useEffect } from 'react';
const isBrowser = typeof window !== "undefined"


export default function useWindowSize() {
  function getSize() {
    return {
      width: isBrowser && window.innerWidth,
      height: isBrowser && window.innerHeight
    };
  }
  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {

    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);

    return () => isBrowser && window.removeEventListener('resize', handleResize);

  }, []);

  return windowSize
}

