import React, { useState } from 'react';
import styles from './SectionItem.module.scss';
import LazyImage from '../LazyImage';

const SectionItem = ({
  id,
  src,
  name,
  lastUpdate,
  routePage,
  canDelete,
  deleteBoard,
  userId,
}) => {
  const [isDeleteButtonShowing, setIsDeleteButtonShowing] = useState(false);

  const handleMouseEnter = () => {
    if (!canDelete) return;
    setIsDeleteButtonShowing(true);
  };

  const handleMouseLeave = () => {
    if (!canDelete) return;
    setIsDeleteButtonShowing(false);
  };

  const handleDeleteButton = (event) => {
    event.stopPropagation();
    deleteBoard({ userId, boardId: id });
  };

  return (
    <>
      <div
        className={styles.container}
        onClick={() => routePage(`/board/${id}`)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {
          isDeleteButtonShowing &&
          <button
            className={styles.deleteButton}
            onClick={handleDeleteButton}
          >
            Delete
          </button>
        }
        <LazyImage src={src} />
        <div className={styles.projectDetails}>
          <h4>{name}</h4>
          <p>Last updated at {lastUpdate}</p>
        </div>
      </div>
    </>
  );
};

export default SectionItem;
