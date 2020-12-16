import React from 'react';
import styles from './BoardAside.module.scss';
import Button from '../Button';
import { RiArrowDropLeftLine } from 'react-icons/ri';
import AUTH from '../../constants/auth';
import { ICON_SIZE } from '../../constants/style';

const BoardAside = ({
  board,
  auth,
  handleLeaveBoard,
  handleBackToBoard,
  children
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        {
          auth === AUTH.EDIT &&
          <Button
            className='backButton'
            onClick={
              board.isCategorized
                ? handleBackToBoard
                : handleLeaveBoard
              }
            text='Back'
          >
            <RiArrowDropLeftLine size={ICON_SIZE.MEDIUM} />
          </Button>
        }
      </div>
      <div className={styles.projectName}>
        <h3>Project name</h3>
        <h2>{board.name}</h2>
      </div>
      <div className={styles.participants}>
        <h3>Participants</h3>
        {
          board.users?.map((user) => (
            <div key={user.id} className={styles.userContainer}>
              <span>{user.email}</span>
              <span>
                {user.id === board.owner ? 'Admin' : 'Guest'}
              </span>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default BoardAside;
