import React from 'react';
import styles from './BoardAside.module.scss';
import Button from '../Button';
import { RiArrowDropLeftLine } from 'react-icons/ri';

const BoardAside = ({
  userId,
  board,
  auth,
  handleLeaveBoard,
  children
}) => {
  const isOwner = userId === board.owner;

  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        {
          auth === 'EDIT' &&
          <Button
            className='backButton'
            onClick={handleLeaveBoard}
            text='Back'
          >
            <RiArrowDropLeftLine size='1.5em' />
          </Button>
        }
        {isOwner && <button>Toggle</button>}
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
