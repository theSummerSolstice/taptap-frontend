import { useState, useEffect, useRef } from 'react';

export const useLazyImageObserver = ({ src }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const imageRef = useRef(null);

  useEffect(() => {
    let observer;

    if (imageRef && !imageSrc) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach(({ isIntersecting }) => {
          if (isIntersecting) {
            setImageSrc(src);
            observer.unobserve(imageRef.current);
          }
        });
      }, { threshold: [0.25] });
      observer.observe(imageRef.current);
    }

    return () => {
      observer && observer.disconnect(imageRef);
    };
  }, [imageRef, imageSrc, src]);

  return { imageSrc, imageRef };
};
