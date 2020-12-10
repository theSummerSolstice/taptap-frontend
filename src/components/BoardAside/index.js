import React from 'react';
import styles from './BoardAside.module.scss';

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
        {auth === 'EDIT' && <button onClick={handleLeaveBoard}>Back</button>}
        {isOwner && <button>Toggle</button>}
      </div>
      <h3>{board.name}</h3>
      <div className={styles.participants}>
        <h4>Participants</h4>
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
