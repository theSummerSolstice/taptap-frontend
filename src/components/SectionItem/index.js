import React, { useState } from 'react';
import styles from './SectionItem.module.scss';

const SectionItem = ({
  id,
  imageSrc,
  name,
  lastUpdate,
  routePage,
  canDelete,
  deleteBoard,
  userId,
}) => {
  const [isDeleteButtonShowing, setIsDeleteButtonShowing] = useState(false);

  const handleMouseAction = () => {
    if (!canDelete) return;
    setIsDeleteButtonShowing(!isDeleteButtonShowing);
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
        onMouseEnter={handleMouseAction}
        onMouseLeave={handleMouseAction}
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
        <img src={imageSrc} alt='project image' />
        <div className={styles.projectDetails}>
          <h4>{name}</h4>
          <p>Last updated at {lastUpdate}</p>
        </div>
      </div>
    </>
  );
};

export default SectionItem;
