import React from 'react';
import styles from './SectionItem.module.scss';

const SectionItem = ({
  id,
  imageSrc,
  name,
  lastUpdate,
  routePage,
}) => {
  return (
    <div className={styles.container} onClick={() => routePage(`/board/${id}`)}>
      <img src={imageSrc} alt='project image' />
      <div className={styles.projectDetails}>
        <h4>{name}</h4>
        <p>Last updated at {lastUpdate}</p>
      </div>
    </div>
  );
};

export default SectionItem;
