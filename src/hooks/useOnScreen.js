import { useEffect, useState, useRef } from "react";

/*
  Reveal-on-scroll hook
  Usage:
  const [ref, visible] = useOnScreen();
*/

export default function useOnScreen(rootMargin = "-10%") {
  const ref = useRef(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin, threshold: 0.15 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [rootMargin]);

  return [ref, isVisible];
}
