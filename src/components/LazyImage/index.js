import React from 'react';
import { useLazyImageObserver } from '../../utils/hook';
import styles from './LazyImage.module.scss';

const LazyImage = ({ src }) => {
  const { imageSrc, imageRef } = useLazyImageObserver({ src });
  return (
    <div className={styles.container}>
      <img className={styles.image} src={imageSrc} alt='boardImgae' ref={imageRef} />
    </div>
  );
};

export default LazyImage;
