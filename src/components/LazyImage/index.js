import React from 'react';
import { useLazyImageObserver } from '../../utils/hook';

//FIXME: 같은 이미지여서 상태 변화가 아니라고 인식할 수 있어 추후 적용
const LazyImage = ({ src }) => {
  const { imageSrc, imageRef } = useLazyImageObserver({ src });
  return (
    <img src={imageSrc} alt='boardImgae' ref={imageRef} />
  );
};

export default LazyImage;
