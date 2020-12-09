import React, { useState } from 'react';
import styles from './Note.module.scss';
import Draggable from 'react-draggable';

const Note = ({ note, user }) => {
  const [isButtonShowing, setIsButtonShowing] = useState(false);

  const handleMouseEnter = () => {
    setIsButtonShowing(true);
  };

  const handleMouseLeave = () => {
    setIsButtonShowing(false);
  };

  return (
    <Draggable
      defaultPosition={{ x: note.x, y: note.y }}
      bounds='parent'
    >
      <div
        className={styles.note}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span>{note.contents}</span>
        {
          isButtonShowing &&
          <button className={styles.deleteButton} onClick={() => console.log('delete')}>Delete</button>
        }
        <span>{user.username}</span>
      </div>
    </Draggable>
  );
};

export default Note;
