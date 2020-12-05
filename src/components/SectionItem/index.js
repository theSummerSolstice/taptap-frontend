import React from 'react';
import styles from './SectionItem.module.scss';

const SectionItem = ({
  imageSrc,
  name,
  createdBy,
  createdAt,
}) => {
  return (
    <div className={styles.container}>
      <img src={imageSrc} alt='project image' />
      <div className={styles.projectDetails}>
        <h4>{name}</h4>
        <p>created by {createdBy}</p>
        <p>created at {createdAt}</p>
      </div>
    </div>
  );
};

export default SectionItem;
