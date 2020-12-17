import React from 'react';
import { useLazyImageObserver } from '../../utils/hook';
import styles from './LazyImage.module.scss';

const LazyImage = ({ src }) => {
  const { imageRef } = useLazyImageObserver({ src });

  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src='https://drive.google.com/uc?id=1fa_RHGu_TIdsFjCrMiP26HahA_zXTT_j'
        data-src={src}
        alt='boardImgae'
        ref={imageRef}
      />
    </div>
  );
};

export default LazyImage;
