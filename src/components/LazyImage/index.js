import React from 'react';
import { useLazyImageObserver } from '../../utils/hook';
import styles from './LazyImage.module.scss';

//FIXME: 같은 이미지여서 상태 변화가 아니라고 인식할 수 있어 추후 적용
const LazyImage = ({ src }) => {
  const { imageSrc, imageRef } = useLazyImageObserver({ src });
  return (
    <div className={styles.container}>
      <img className={styles.image} src={imageSrc} alt='boardImgae' ref={imageRef} />
    </div>
  );
};

export default LazyImage;
