import React, { useState, useEffect } from "react";

//===============================================
// Define the useWindowSize hook
//===============================================

interface IWindowSize {
  width?: number;
  height?: number;
}

export function useWindowSize() {
  // Initialize the state with undefined width/height so server and client renders match
  const [windowSize, setWindowSize] = useState<IWindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // handle to call on window resize
    function handleResize() {
      // set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // add event listerer
    window.addEventListener("resize", handleResize);
    // call handler right away so state gets updated with initial window size
    handleResize();

    // remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

//===============================================
// Define the useContainerSize hook
//===============================================

interface IContainerSize {
  width?: number;
  height?: number;
}

export function useContainerSize(reference: React.RefObject<any>, ms = 200) {
  // set the states
  const [containerSize, setContainerSize] = useState<IContainerSize>({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setContainerSize({
        width: reference?.current?.offsetWidth,
        height: reference?.current?.offsetHeight,
      });
    }, ms);
    // Remove event listener on cleanup
    return () => clearInterval(interval);
  }, [reference, ms]);

  return containerSize;
}
