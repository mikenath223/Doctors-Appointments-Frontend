/* eslint-disable react-hooks/exhaustive-deps */
import { RefObject, useEffect } from "react";

interface Props {
  containerRef: RefObject<HTMLElement>;
  onView: () => void;
  intersectionOptions?: {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number;
  };
}

const defaultOptions = {
  rootMargin: "0px",
  threshold: 1,
  root: null,
};

export const useIntersectionObserver = (
  { containerRef, intersectionOptions = defaultOptions, onView }: Props,
  dependencies: unknown[]
) => {
  useEffect(() => {
    if (containerRef?.current) {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry?.isIntersecting) {
          onView();
        }
      }, intersectionOptions);

      observer.observe(containerRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [containerRef, ...dependencies]);
};
