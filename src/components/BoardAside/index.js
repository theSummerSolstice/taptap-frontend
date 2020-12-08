import React from 'react';
import styles from './BoardAside.module.scss';

const BoardAside = ({ board, children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.buttonContainer}>
        <button>Back</button>
        <button>Toggle</button>
      </div>
      <h3>{board.name}</h3>
      <div className={styles.participants}>
        <h4>Participants</h4>
        {
          board.users?.map((user, index) => {
            return <div key={index}>{user}</div>;
          })
        }
      </div>
    </div>
  );
};

export default BoardAside;
