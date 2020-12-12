import React, { useState } from 'react';
import styles from './SectionItem.module.scss';
import LazyImage from '../LazyImage';
import Button from '../Button';
import { changeDateFormat } from '../../utils/date';
import { FaTrashAlt } from 'react-icons/fa';

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
          <Button className='circleButton' onClick={handleDeleteButton}>
            <FaTrashAlt size='1.3em' />
          </Button>
        }
        <LazyImage className={styles.boardImage} src={src} />
        <div className={styles.projectDetails}>
          <h4>{name}</h4>
          <p>Last updated at {changeDateFormat(lastUpdate)}</p>
        </div>
      </div>
    </>
  );
};

export default SectionItem;
