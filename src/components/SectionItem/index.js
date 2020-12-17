import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import Button from '../Button';
import LazyImage from '../LazyImage';
import { changeDateFormat } from '../../utils';
import styles from './SectionItem.module.scss';
import ROUTE from '../../constants/route';
import { ICON_SIZE } from '../../constants/style';

const SectionItem = ({
  boardId,
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

  const handleDeleteButtonClick = (event) => {
    event.stopPropagation();
    deleteBoard({ userId, boardId });
  };

  return (
    <>
      <div
        className={styles.container}
        onClick={() => routePage(`${ROUTE.BOARD}/${boardId}`)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {
          isDeleteButtonShowing &&
          <Button className='circleButton' onClick={handleDeleteButtonClick}>
            <FaTrashAlt size={ICON_SIZE.LARGE} />
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
