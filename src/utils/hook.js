import { useEffect, useRef } from 'react';

export const useLazyImageObserver = ({ src }) => {
  const imageRef = useRef(null);

  useEffect((src) => {
    let io;

    if (imageRef) {
      io = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.src = entry.target.dataset.src;
            }, 300);

            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.25 });

      io.observe(imageRef.current);
    }

    return () => {
      io && io.disconnect(imageRef);
    };
  }, [imageRef, src]);

  return { imageRef };
};
