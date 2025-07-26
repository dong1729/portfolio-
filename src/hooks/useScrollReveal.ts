import { useEffect, useRef, useState } from 'react';
export function useScrollReveal<T extends HTMLElement>(options = {
  threshold: 0.1,
  rootMargin: '0px',
  triggerOnce: true
}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<T>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (options.triggerOnce && elementRef.current) {
          observer.unobserve(elementRef.current);
        }
      } else if (!options.triggerOnce) {
        setIsVisible(false);
      }
    }, {
      threshold: options.threshold,
      rootMargin: options.rootMargin
    });
    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options.threshold, options.rootMargin, options.triggerOnce]);
  return {
    ref: elementRef,
    isVisible
  };
}